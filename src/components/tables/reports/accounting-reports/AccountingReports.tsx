"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";

interface AccountingReport {
  reportName: string;
}

const accountingReportsData: AccountingReport[] = [
  { reportName: "Journal Entry Reports" },
  { reportName: "Issued Check Reports" },
  { reportName: "General Journal Ledger Reports" },
  { reportName: "Subledger Reports" },
  { reportName: "Financial Statements Reports" },
];

export default function AccountingReportsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return accountingReportsData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleReportClick = (reportName: string) => {
    const routeMap: { [key: string]: string } = {
      "Journal Entry Reports": "/reports/accounting-reports/journal-entry-reports",
      "Issued Check Reports": "/reports/accounting-reports/issued-check-reports",
      "General Journal Ledger Reports": "/reports/accounting-reports/general-journal-ledger-reports",
      "Subledger Reports": "/reports/accounting-reports/subledger-reports",
      "Financial Statements Reports": "/reports/accounting-reports/financial-statements-reports",
    };

    const route = routeMap[reportName] || "/reports/accounting-reports";
    router.push(route);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px] p-5">
            {paginatedData.length > 0 ? (
              <ul className="space-y-3">
                {paginatedData.map((report, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-100 dark:border-white/[0.05] text-sm"
                  >
                    <button
                      onClick={() => handleReportClick(report.reportName)}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                    >
                      {report.reportName}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-sm text-gray-700 dark:text-white">
                No reports found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={accountingReportsData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}