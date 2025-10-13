"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";

interface AccountingModule {
  id: number;
  code: string;
  module: string;
  category: string;
}

const accountingData: AccountingModule[] = [
  // Chart of Accounts
  { id: 1, code: "M0102", module: "Main Accounts", category: "Chart of Accounts" },
  { id: 2, code: "M0103", module: "Sub Accounts", category: "Chart of Accounts" },
  { id: 3, code: "M0104", module: "Account Group", category: "Chart of Accounts" },
  { id: 4, code: "M0105", module: "Account Title", category: "Chart of Accounts" },
  { id: 5, code: "M01051", module: "Link to Previous Account Code", category: "Chart of Accounts" },
  
  // Debtors and Creditors Subledgers
  { id: 6, code: "M0108", module: "Customers", category: "Debtors and Creditors Subledgers" },
  { id: 7, code: "M0109", module: "Suppliers", category: "Debtors and Creditors Subledgers" },
  
  // Others
  { id: 8, code: "M0107", module: "Journal", category: "Others" },
  { id: 9, code: "M0110", module: "Cost Centers", category: "Others" },
  { id: 10, code: "M0111", module: "Sub Cost Centers", category: "Others" },
  { id: 11, code: "M0112", module: "Accounting Periods", category: "Others" },
  { id: 12, code: "M0113", module: "Banks", category: "Others" },
  { id: 13, code: "M0114", module: "Bank Account Numbers", category: "Others" },
];

const categories = ["Chart of Accounts", "Debtors and Creditors Subledgers", "Others"];

export default function AccountingMasterFiles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();
  const itemsPerPage = 15;

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") {
      return accountingData;
    }
    return accountingData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  const handleModuleClick = (module: string) => {
    const formattedModuleName = module.toLowerCase().replace(/\s+/g, "-");
    router.push(`/master-files/accounting/${formattedModuleName}`);
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "All"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px] p-5">
            {paginatedData.length > 0 ? (
              <ul className="space-y-3">
                {paginatedData.map((module) => (
                  <li
                    key={module.id}
                    className="flex items-center gap-2 py-2 border-b border-gray-100 dark:border-white/[0.05] text-sm"
                  >
                    <span className="text-gray-700 dark:text-white font-mono">
                      {module.code}
                    </span>
                    <button
                      onClick={() => handleModuleClick(module.module)}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                    >
                      {module.module}
                    </button>
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                      {module.category}
                    </span>
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
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
