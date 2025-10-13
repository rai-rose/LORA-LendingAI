"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/tables/Pagination";
import BarcodePrints from "./BarcodePrints";

interface InventoryModule {
    id: number;
    code: string;
    module: string;
    }

    const inventoryData: InventoryModule[] = [
        { id: 1, code: "M0501", module: "Brand Name" },
        { id: 2, code: "M0502", module: "Item Category" },
        { id: 3, code: "M0503", module: "Item Unit" },
        { id: 4, code: "M0504", module: "Items" },
        { id: 5, code: "M0505", module: "Assembled Items" },
        { id: 6, code: "M0506", module: "Stock Locations" },
        { id: 7, code: "M0507", module: "Mode of Payment" },
        { id: 8, code: "M0508", module: "Supplier" },
        { id: 9, code: "M0509", module: "Cost Centers" },
        { id: 10, code: "M0510", module: "Sub Cost Centers" },
        { id: 11, code: "M0511", module: "VAT Codes" },
        { id: 12, code: "M0513", module: "Princt Barcode" },
        { id: 13, code: "M0514", module: "Princt Barcode 2" },
        { id: 14, code: "M0515", module: "Print Barcode Per Branch" },
    ];

    export default function InventoryManagementList() {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const itemsPerPage = 15;

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return inventoryData.slice(startIndex, endIndex);
    }, [currentPage]);

    const handleModuleClick = (module: string) => {
        const formattedModuleName = module.toLowerCase().replace(/\s+/g, "-");
        router.push(`/master-files/inventory-management/${formattedModuleName}`);
    };

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[600px] p-5">
                        {paginatedData.length > 0 ? (
                        <ul className="space-y-3">
                            {paginatedData.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-2 py-2 border-b border-gray-100 dark:border-white/[0.05] text-sm"
                            >
                                <span className="text-gray-700 dark:text-white">
                                    {item.code}
                                </span>
                                <button
                                    onClick={() => handleModuleClick(item.module)}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                                    > 
                                    {item.module}
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
            <BarcodePrints barcodes={[
                { img: "/images/barcode.png", title: "Print Item Barcode" },
                { img: "/images/barcode.png", title: "Print Item Barcode 2" },
                { img: "/images/barcode.png", title: "Print Barcode Per Branch" },
            ]} />
            <Pagination
                currentPage={currentPage}
                totalItems={inventoryData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}