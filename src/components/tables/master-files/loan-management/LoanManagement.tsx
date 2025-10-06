"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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

export default function LoanManagementList() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 11;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return loanData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleModuleClick = (module: string) => {
    const formattedModuleName = module.toLowerCase().replace(/\s+/g, "-");
    router.push(`/master-files/loan-management/${formattedModuleName}`);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px] p-5">
            {paginatedData.length > 0 ? (
              <ul className="space-y-3">
                {paginatedData.map((loan) => (
                  <li
                    key={loan.id}
                    className="flex items-center gap-2 py-2 border-b border-gray-100 dark:border-white/[0.05] text-sm"
                  >
                    <span className="text-gray-700 dark:text-white">
                      {loan.code}
                    </span>
                    <button
                      onClick={() => handleModuleClick(loan.module)}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                    > 
                      {loan.module}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-sm text-gray-700 dark:text-white">
                No results found.
              </div>
            )}
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