"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";
import BarcodePrints from "./BarcodePrints";

interface InventoryModule {
  id: number;
  code: string;
  module: string;
  category: string;
}

const inventoryData: InventoryModule[] = [
  // Basic Inventory
  { id: 1, code: "M0501", module: "Brand Name", category: "Basic Inventory" },
  { id: 2, code: "M0502", module: "Item Category", category: "Basic Inventory" },
  { id: 3, code: "M0503", module: "Item Unit", category: "Basic Inventory" },
  { id: 4, code: "M0504", module: "Items", category: "Basic Inventory" },
  { id: 5, code: "M0505", module: "Assembled Items", category: "Basic Inventory" },
  { id: 6, code: "M0506", module: "Stock Locations", category: "Basic Inventory" },
  
  // Payment & Suppliers
  { id: 7, code: "M0507", module: "Mode of Payment", category: "Payment & Suppliers" },
  { id: 8, code: "M0508", module: "Supplier", category: "Payment & Suppliers" },
  
  // Cost Centers
  { id: 9, code: "M0509", module: "Cost Centers", category: "Cost Centers" },
  { id: 10, code: "M0510", module: "Sub Cost Centers", category: "Cost Centers" },
  
  // Tax & Barcode
  { id: 11, code: "M0511", module: "VAT Codes", category: "Tax & Barcode" },
  { id: 12, code: "M0513", module: "Print Barcode", category: "Tax & Barcode" },
  { id: 13, code: "M0514", module: "Print Barcode 2", category: "Tax & Barcode" },
  { id: 14, code: "M0515", module: "Print Barcode Per Branch", category: "Tax & Barcode" },
];

const categories = ["Basic Inventory", "Payment & Suppliers", "Cost Centers", "Tax & Barcode"];

export default function InventoryMasterFiles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();
  const itemsPerPage = 15;

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") {
      return inventoryData;
    }
    return inventoryData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  const handleModuleClick = (module: string) => {
    const formattedModuleName = module.toLowerCase().replace(/\s+/g, "-");
    router.push(`/master-files/inventory/${formattedModuleName}`);
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

      <BarcodePrints barcodes={[
        { img: "/images/barcode.png", title: "Print Item Barcode" },
        { img: "/images/barcode.png", title: "Print Item Barcode 2" },
        { img: "/images/barcode.png", title: "Print Barcode Per Branch" },
      ]} />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
