"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as XLSX from "xlsx";
import { Ellipsis, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import { loanData, LoanType } from "../../utils";
import Image from "next/image";
import NewLoanTypeModal from "@/components/ui/modal/LoanTypeModal";

export default function LoanTypeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loans, setLoans] = useState<LoanType[]>(loanData);
  const [editLoan, setEditLoan] = useState<LoanType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const itemsPerPage = 15;

  const filteredData = useMemo(() => {
      return loans.filter((loanType) => {
          const search = searchQuery.toLowerCase();
          return (
            loanType.code.toLowerCase().includes(search) ||
            loanType.description.toLowerCase().includes(search) ||
            loanType.format.toLowerCase().includes(search) ||
            loanType.series.toLowerCase().includes(search)
          );
      });
  }, [searchQuery, loans]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const exportToExcel = () => {
    type ExportRow = {
        Code: string;
        "Loan Description": string;
        Format: string;
        Series: string;
    };

    const exportData: ExportRow[] = filteredData.map((loanType) => ({
        Code: loanType.code,
        "Loan Description": loanType.description,
        Format: loanType.format,
        Series: loanType.series,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Loan Types");
      const colWidths = Object.keys(exportData[0]).map((key) =>
          Math.max(
              key.length,
              ...exportData.map((row) => String(row[key as keyof ExportRow] || "").length)
          ) + 2
          );
          worksheet["!cols"] = colWidths.map((w) => ({ wch: w }));
          XLSX.writeFile(workbook, "loan_types_list.xlsx"); // Use writeFile to match PaymentsTable
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNewLoanType = () => {
    setShowModal(true);
    console.log("Adding new loan type");
  };

  const handleAddLoanType = (loan: LoanType) => {
    if (editLoan) {
      setLoans((prev) =>
        prev.map((l) => (l.id === loan.id ? { ...l, ...loan } : l))
      );
      setEditLoan(null);
    } else {
      setLoans((prev) => [...prev, loan]);
    }
  };

  const handleEdit = (id: number) => {
    const loanType = loans.find((l) => l.id === id);
    if (loanType) setEditLoan(loanType);
    setShowModal(true);
    setOpenDropdownId(null);
  };

  const handleDelete = (id: number) => {
    console.log("Deleting loan type:", id);
    setLoans(loans.filter((loan) => loan.id !== id));
    setOpenDropdownId(null);
  };

  const handleBack = () => {
    router.push("/master-files/loan-management");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            aria-label="Search by loan type code"
          />
          <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-md text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
              title="Export to Excel"
              aria-label="Export loan contracts to Excel"
          >
              <Image
                src="/images/icons/excel.svg"
                alt="Export to Excel icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Export List
          </button>
          <button
            onClick={handleAddNewLoanType}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New
          </button>
          <NewLoanTypeModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditLoan(null);
            }}
            onAdd={handleAddLoanType}
            initialLoanType={editLoan}
          />
        </div>
      </div>
      <div className="text-sm overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {[
                    "Code",
                    "Loan Description",
                    "Format",
                    "Series",
                    "Actions",
                  ].map((title) => (
                    <TableCell
                      key={title}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              
              <TableBody className="text-sm divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.length > 0 ? (
                  paginatedData.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {loan.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {loan.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {loan.format}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {loan.series}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(loan.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === loan.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(loan.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(loan.id)}
                            >
                              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Trash2 className="h-4 w-4 text-white" />
                              </div>
                              Delete
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-700 dark:text-white">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={loans.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
