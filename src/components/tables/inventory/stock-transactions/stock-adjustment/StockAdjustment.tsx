"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../../ui/table";
import Badge from "../../../../ui/badge/Badge";
import Image from "next/image";
import * as XLSX from "xlsx";
import { stockAdjustmentData } from "../../../utils";
import { Ellipsis, Edit, ArrowLeft } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import CreatePurchaseRequestModal from "@/components/ui/modal/CreatePurchaseRequestModal";

export default function StockAdjustment() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const itemsPerPage = 15;

    const validStatuses = ["Approved"];

    const filteredData = useMemo(() => {
        return stockAdjustmentData
        .filter((data) => {
            const matchesSearch = data.user.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
            const matchesStatus =
            statusFilter === "All" || data.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .filter((data) => {
            if (minDate && data.adjDate) {
                return new Date(data.adjDate) >= new Date(minDate);
            }
            return true;
        })
        .filter((data) => {
            if (maxDate && data.adjDate) {
                return new Date(data.adjDate) <= new Date(maxDate);
            }
            return true;
        });
    }, [searchQuery, statusFilter, validStatuses, minDate, maxDate]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    const handleAddNewAdjustment = () => {
        window.alert("Add New Stock Adjustment action triggered");
    };

    const handleEdit = () => {
        window.alert("Edit action triggered");
    };

    const handleBack = () => {
        router.push("/inventory/stock-transactions");
    };

    const exportToExcel = () => {
        type ExportRow = {
            "ADJ#": string;
            Description: string;
            "ADJ Date": string;
            Location: string;
            User: string;
            "Updated Date": string;
            "Updated Time": string;
            Jrnlz: string;
            Status: string;
            "Approved By": string;
            "Approved Date": string;
        };

        const exportData: ExportRow[] = filteredData.map((data) => ({
            "ADJ#": data.adjNumber,
            Description: data.description,
            "ADJ Date": data.adjDate,
            Location: data.location,
            User: data.user.name,
            "Updated Date": data.updatedDate,
            "Updated Time": data.updatedTime,
            Jrnlz: data.jrnlz,
            Status: data.status,
            "Approved By": data.approvedBy,
            "Approved Date": data.approvedDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Adjustments");
        const colWidths = Object.keys(exportData[0]).map((key) =>
            Math.max(
                key.length,
                ...exportData.map((row) => String(row[key as keyof ExportRow] || "").length)
            ) + 2
            );
            worksheet["!cols"] = colWidths.map((w) => ({ wch: w }));
            XLSX.writeFile(workbook, "stock_adjustment_list.xlsx"); // Use writeFile to match PaymentsTable
    };

    const toggleDropdown = (id: number) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row md:justify-end md:items-center gap-2 dark:text-white">
                    <input
                        type="text"
                        placeholder="Search by ADJ#..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        aria-label="Search by name"
                    />
                    <label htmlFor="minDate">Adjustment Date:</label>
                    <input 
                        id="minDate"
                        type="date"
                        title="Select the minimum request date"
                        value={minDate} 
                        onChange={e => setMinDate(e.target.value)} 
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                    <label htmlFor="maxDate">To:</label>
                    <input 
                        id="maxDate"
                        type="date"
                        title="Select the maximum request date"
                        value={maxDate} 
                        onChange={e => setMaxDate(e.target.value)} 
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                            onClick={handleAddNewAdjustment}
                            className="px-4 py-2 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Stock Adjustment
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-md text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
                            title="Export to Excel"
                            aria-label="Export loan contracts to Excel"
                        >
                            <Image
                                src="/images/icons/excel.svg"
                                alt="Export to Excel icon"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                {[
                                    "ADJ#",
                                    "Description",
                                    "ADJ Date",
                                    "Location",
                                    "User",
                                    "Updated Date",
                                    "Updated Time",
                                    "Jrnlz",
                                    "Status",
                                    "Approved By",
                                    "Approved Date",
                                ].map((title) => (
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

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {paginatedData.length > 0 ? (
                                paginatedData.map((data) => (
                                    <TableRow key={data.id}>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.adjNumber || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.description || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.adjDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.location || "—"}
                                        </TableCell>

                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <Image
                                                width={40}
                                                height={40}
                                                src={data.user.image}
                                                alt={`Profile image of ${data.user.name}`}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {data.user.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                {data.user.role}
                                                </span>
                                            </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.updatedDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.updatedTime || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.jrnlz || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <Badge
                                            size="sm"
                                            color={
                                                data.status === "Approved"
                                                ? "success"
                                                : "primary"
                                            }
                                            >
                                            {data.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">                                      
                                            {data.approvedBy || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">                                      
                                            {data.approvedDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-sm text-gray-600 dark:text-gray-300">
                                            <div className="relative">
                                            <button
                                                className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                                onClick={() => toggleDropdown(data.id)}
                                            >
                                                <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150" />
                                            </button>
                                                <Dropdown
                                                    isOpen={openDropdownId === data.id}
                                                    onClose={() => setOpenDropdownId(null)}
                                                    className="w-48 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 transition-colors duration-200"
                                                >
                                                    <DropdownItem
                                                        className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                                                        onItemClick={() => handleEdit()}
                                                        >
                                                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:bg-blue-400 rounded-full h-6 w-6 flex items-center justify-center">
                                                            <Edit className="h-4 w-4 text-white" />
                                                        </div>
                                                        Edit
                                                    </DropdownItem>
                                                </Dropdown>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={14} className="text-center py-6 text-gray-500 dark:text-gray-400">
                                            No results found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <CreatePurchaseRequestModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSave={handleAddNewAdjustment}
            />

            <Pagination
                currentPage={currentPage}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}