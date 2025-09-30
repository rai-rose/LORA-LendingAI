"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";

interface InventoryReport {
  reportName: string;
}

const inventoryReportsData: InventoryReport[] = [
  { reportName: "Purchase Request Reports" },
  { reportName: "Purchase Orders Reports" },
  { reportName: "Receiving P.O. Reports" },
  { reportName: "Direct Purchase Reports" },
  { reportName: "Stock Issuance Reports" },
  { reportName: "Stock Transfer Reports" },
  { reportName: "Stock Adjustment Reports" },
  { reportName: "Other Inventory Reports" },
];

export default function InventoryReportsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return inventoryReportsData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleReportClick = (reportName: string) => {
    const routeMap: { [key: string]: string } = {
      "Purchase Request Reports": "/reports/inventory-reports/purchase-request-reports",
      "Purchase Orders Reports": "/reports/inventory-reports/purchase-orders-reports",
      "Receiving P.O. Reports": "/reports/inventory-reports/receiving-po-reports",
      "Direct Purchase Reports": "/reports/inventory-reports/direct-purchase-reports",
      "Stock Issuance Reports": "/reports/inventory-reports/stock-issuance-reports",
      "Stock Transfer Reports": "/reports/inventory-reports/stock-transfer-reports",
      "Stock Adjustment Reports": "/reports/inventory-reports/stock-adjustment-reports",
      "Other Inventory Reports": "/reports/inventory-reports/other-inventory-reports",
    };

    const route = routeMap[reportName] || "/reports/inventory";
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
        totalItems={inventoryReportsData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}