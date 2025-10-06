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
import Pagination from "@/components/tables/Pagination";
import { ArrowLeft } from "lucide-react";

interface Report {
  id: number;
  code: string;
  module: string;
  category: string;
}

const journalEntryReportsData: Report[] = [
  { id: 1, code: "R1A01", module: "Account Activity By ID", category: "Journal Entry Reports" },
  { id: 2, code: "R1A02", module: "List of Unposted Entries", category: "Journal Entry Reports" },
  { id: 3, code: "R1A03", module: "Cash Position Report", category: "Journal Entry Reports" },
  { id: 4, code: "R1A04", module: "Unposted Entries", category: "Journal Entry Reports" },
  { id: 5, code: "R1A05", module: "Account Movement Summary", category: "Journal Entry Reports" },
  { id: 6, code: "R1A06", module: "Summary of Input Tax", category: "Summary of Tax Reports" },
  { id: 7, code: "R1A061", module: "Summary of Output Tax (Loan Collection)", category: "Summary of Tax Reports" },
  { id: 8, code: "R1A07", module: "Summary of Statement of Accounts", category: "Others" },
  { id: 9, code: "R1A081", module: "Unbalance Journal List", category: "Others" },
  { id: 10, code: "R1A082", module: "Subsidiary Accounts without Subsidiary Report", category: "Others" },
  { id: 11, code: "R1A083", module: "Mismatch Accounting Periods to Journal Dates Report", category: "Others" },
  { id: 12, code: "R1A084", module: "Without Account Link Report", category: "Others" },
  { id: 13, code: "R1A085", module: "Subsidiary Transactions with Different Account Link Report", category: "Others" },
];

export default function JournalEntryReportsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return journalEntryReportsData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleReportClick = (module: string) => {
    const formattedModuleName = module.toLowerCase().replace(/\s+/g, "-").replace(/\(.*\)/g, '');
    router.push(`/reports/accounting/journal-entries/${formattedModuleName}`);
  };

  const handleBack = () => {
    router.push("/reports/accounting-reports");
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
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["Code", "Report Name"].map((title) => (
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
                  <>
                    {["Journal Entry Reports", "Summary of Tax Reports", "Others"].map((category) => {
                      const categoryData = paginatedData.filter((report) => report.category === category);
                      if (categoryData.length > 0) {
                        return (
                          <React.Fragment key={`category-${category}`}>
                            <TableRow className="bg-gray-100 dark:bg-gray-700">
                              <TableCell colSpan={2} className="px-5 py-2 font-semibold text-gray-700 dark:text-gray-100">
                                {category}
                              </TableCell>
                            </TableRow>
                            {categoryData.map((report) => (
                              <TableRow key={report.id}>
                                <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                                  {report.code}
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                  <button
                                    onClick={() => handleReportClick(report.module)}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                                  >
                                    {report.module}
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-6">
                      No reports found.
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
        totalItems={journalEntryReportsData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}