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
import { Ellipsis, Eye } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface LoanModule {
  id: number;
  code: string;
  module: string;
}

const loanData: LoanModule[] = [
  { id: 1, code: "M0801", module: "Loan Type" },
  { id: 2, code: "M0802", module: "Transaction Type" },
  { id: 3, code: "M0803", module: "Pension Type Per Transaction" },
  { id: 4, code: "M0804", module: "Requirements" },
  { id: 5, code: "M0805", module: "Loan Collateral" },
  { id: 6, code: "M0806", module: "Loan Deduction" },
  { id: 7, code: "M0807", module: "Default Deduction Per Loan Types" },
  { id: 8, code: "M0808", module: "Schedule of Payments" },
  { id: 9, code: "M08011", module: "Borrowers" },
  { id: 10, code: "M08012", module: "Area Group" },
  { id: 11, code: "M08013", module: "Collectors" },
];

export default function LoanManagementTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return loanData.slice(startIndex, endIndex);
  }, [currentPage]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleViewDetails = (loanId: number) => {
    const loan = loanData.find((l) => l.id === loanId);
    if (loan?.module === "Loan Type") {
      router.push("/master-files/loan-management/loan-type");
    }
    if (loan?.module === "Transaction Type") {
      router.push("/master-files/loan-management/transaction-type");
    }
    if (loan?.module === "Pension Type Per Transaction") {
      router.push("/master-files/loan-management/pension-type");
    }
    if (loan?.module === "Requirements") {
      router.push("/master-files/loan-management/requirements");
    }
    if (loan?.module === "Loan Collateral") {
      router.push("/master-files/loan-management/loan-collateral");
    }
    if (loan?.module === "Loan Deduction") {
      router.push("/master-files/loan-management/loan-deduction");
    }
    if (loan?.module === "Default Deduction Per Loan Types") {
      router.push("/master-files/loan-management/default-deduction");
    }
    if (loan?.module === "Schedule of Payments") {
      router.push("/master-files/loan-management/schedule-payments");
    }
    if (loan?.module === "Borrowers") {
      router.push("/master-files/loan-management/borrowers");
    }
    if (loan?.module === "Area Group") {
      router.push("/master-files/loan-management/area-group");
    }
    if (loan?.module === "Collectors") {
      router.push("/master-files/loan-management/collectors");
    }
    else {
      console.log("Viewing loan details:", loan);
    }
    setOpenDropdownId(null);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Code
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Module
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
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
                        {loan.module}
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
                              onItemClick={() => handleViewDetails(loan.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                              View
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
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
        totalItems={loanData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}