"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";

interface StockTransaction {
    name: string;
}

const loanReportsData: StockTransaction[] = [
    { name: "Stock Issuance" },
    { name: "Stock Adjustment" },
];

export default function StockTransactions() {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const itemsPerPage = 10;

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return loanReportsData.slice(startIndex, endIndex);
    }, [currentPage]);

    const handleReportClick = (reportName: string) => {
        const formattedReportName = reportName.toLowerCase().replace(/\s+/g, "-");
        router.push(`/inventory/stock-transactions/${formattedReportName}`);
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
                        onClick={() => handleReportClick(report.name)}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                        >
                        {report.name}
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
            totalItems={loanReportsData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
        />
        </div>
    );
}