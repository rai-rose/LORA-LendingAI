"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface DefaultDeduction {
  id: number;
  lineNo: number;
  code: string;
  description: string;
  srp: number;
}

const defaultDeductionData: DefaultDeduction[] = [
  { id: 1, lineNo: 1, code: "DD001", description: "Processing Fee for AFP Loan", srp: 500.00 },
  { id: 2, lineNo: 2, code: "DD002", description: "Service Fee for AFSLAI Loan", srp: 300.00 },
  { id: 3, lineNo: 3, code: "DD003", description: "Documentation Fee for Allottee Loan", srp: 200.00 },
  { id: 4, lineNo: 4, code: "DD004", description: "Appraisal Fee for BFP Loan", srp: 1000.00 },
  { id: 5, lineNo: 5, code: "DD005", description: "Insurance Premium for BJMP Loan", srp: 1500.00 },
  { id: 6, lineNo: 6, code: "DD006", description: "Notary Fee for Business Loan", srp: 400.00 },
  { id: 7, lineNo: 7, code: "DD007", description: "Registration Fee for Foreign Loan", srp: 600.00 },
  { id: 8, lineNo: 8, code: "DD008", description: "Legal Fee for GSIS Loan", srp: 800.00 },
  { id: 9, lineNo: 9, code: "DD009", description: "Credit Check Fee for SSS Loan", srp: 250.00 },
  { id: 10, lineNo: 10, code: "DD010", description: "Administrative Fee for Salary Loan", srp: 350.00 },
  { id: 11, lineNo: 11, code: "DD011", description: "Collateral Valuation for PNP Loan", srp: 1200.00 },
  { id: 12, lineNo: 12, code: "DD012", description: "Transaction Fee for PCG Loan", srp: 450.00 },
];

export default function DefaultDeductionTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deductions, setDeductions] = useState<DefaultDeduction[]>(defaultDeductionData);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return deductions.slice(startIndex, endIndex);
  }, [currentPage, deductions]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new default deduction");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const deduction = deductions.find((d) => d.id === id);
    console.log("Editing default deduction:", deduction);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting default deduction:", id);
    setDeductions(deductions.filter((deduction) => deduction.id !== id));
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
          className="w-10 h-10 bg-gray-400 text-white rounded-full text-sm hover:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </button>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>
      <div className="text-sm overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[500px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                              <TableRow>
                                {[
                                  "Line No.",
                                  "Code",
                                  "Description",
                                  "SRP",
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
                  paginatedData.map((deduction) => (
                    <TableRow key={deduction.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {deduction.lineNo}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {deduction.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {deduction.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        ₱{deduction.srp.toFixed(2)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(deduction.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === deduction.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(deduction.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(deduction.id)}
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
                    <TableCell colSpan={5} className="text-center py-6">
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
        totalItems={deductions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}