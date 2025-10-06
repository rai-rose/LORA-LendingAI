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
}

const purchaseOrdersReportsData: Report[] = [
  { id: 1, code: "R1I01", module: "Purchase Orders By Date Report" },
  { id: 2, code: "R1I02", module: "Purchase Orders By Supplier Report" },
  { id: 3, code: "R1I03", module: "Pending Purchase Orders Report" },
  { id: 4, code: "R1I04", module: "Approved Purchase Orders Report" },
  { id: 5, code: "R1I05", module: "Purchase Order Status Report" },
];

export default function PurchaseOrdersReportsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return purchaseOrdersReportsData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleReportClick = (module: string) => {
    const formattedModuleName = module.toLowerCase().replace(/\s+/g, "-");
    router.push(`/reports/inventory-reports/purchase-orders-reports/${formattedModuleName}`);
  };

  const handleBack = () => {
    router.push("/reports/inventory-reports");
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
                  paginatedData.map((report) => (
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
                  ))
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
        totalItems={purchaseOrdersReportsData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}