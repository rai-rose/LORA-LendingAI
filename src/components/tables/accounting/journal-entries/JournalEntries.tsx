"use client";

import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import Badge from "../../../ui/badge/Badge";
import Image from "next/image";
import * as XLSX from "xlsx";
import { journalEntriesData } from "../../utils";
import { Ellipsis, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import CreatePurchaseRequestModal from "@/components/ui/modal/CreatePurchaseRequestModal";

export default function JournalEntries() {
    const [searchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [minRequestDate, setMinRequestDate] = useState("");
    const [maxRequestDate, setMaxRequestDate] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const validStatuses = ["Finalized", "Cancelled"];

    const filteredData = useMemo(() => {
        return journalEntriesData
        .filter((data) => {
            const matchesSearch = data.refNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
            const matchesStatus =
            statusFilter === "All" || data.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .filter((data) => {
            if (minRequestDate && data.date) {
                return new Date(data.date) >= new Date(minRequestDate);
            }
            return true;
        })
        .filter((data) => {
            if (maxRequestDate && data.date) {
                return new Date(data.date) <= new Date(maxRequestDate);
            }
            return true;
        });
    }, [searchQuery, statusFilter, validStatuses, minRequestDate, maxRequestDate]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    const handleAddNewEntry = () => {
        window.alert("Add New Journal Entry action triggered");
    };

    const exportToExcel = () => {
        type ExportRow = {
            "Ref Num": string;
            Date: string;
            Description: string;
            "Paid To": string;
            Check: string;
            "Check Date": string;
            "User ID": string;
            Branch: string;
            "Branch ID": string;
            "System Date": string;
            "System Time": string;
            Status: string;
            "Finalized By": string;
            "Finalized On": string;
        };

        const exportData: ExportRow[] = filteredData.map((data) => ({
            "Ref Num": data.refNumber,
            Date: data.date,
            Description: data.description,
            "Paid To": data.paidTo,
            Check: data.check,
            "Check Date": data.checkDate,
            "User ID": data.userId,
            Branch: data.branch,
            "Branch ID": data.branchId,
            "System Date": data.systemDate,
            "System Time": data.systemTime,
            Status: data.status,
            "Finalized By": data.finalizedBy,
            "Finalized On": data.finalizedDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Requests");
        const colWidths = Object.keys(exportData[0]).map((key) =>
            Math.max(
                key.length,
                ...exportData.map((row) => String(row[key as keyof ExportRow] || "").length)
            ) + 2
            );
            worksheet["!cols"] = colWidths.map((w) => ({ wch: w }));
            XLSX.writeFile(workbook, "purchase_request_list.xlsx"); // Use writeFile to match PaymentsTable
    };

    const toggleDropdown = (id: number) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                <div className="flex flex-col sm:flex-row md:justify-end md:items-center gap-2 dark:text-white">
                    <label htmlFor="minDate">Period:</label>
                    <input 
                        id="minDate"
                        type="date"
                        title="Select the minimum request date"
                        value={minRequestDate} 
                        onChange={e => setMinRequestDate(e.target.value)} 
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                    <label htmlFor="maxDate">To:</label>
                    <input 
                        id="maxDate"
                        type="date"
                        title="Select the maximum request date"
                        value={maxRequestDate} 
                        onChange={e => setMaxRequestDate(e.target.value)} 
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        aria-label="Filter by status"
                    >
                        <option value="All">All Statuses</option>
                        {validStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                            onClick={handleAddNewEntry}
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
                            New Entry
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
                                    "Ref Num",
                                    "Date",
                                    "Description",
                                    "Paid To",
                                    "Check",
                                    "Check Date",
                                    "User ID",
                                    "Branch",
                                    "Branch ID",
                                    "System Date",
                                    "System Time",
                                    "Status",
                                    "Finalized By",
                                    "Finalized On",
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
                                            {data.refNumber || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.date || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.description || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.paidTo || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.check || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.checkDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.userId || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.branch || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.branchId || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.systemDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.systemTime || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <Badge
                                            size="sm"
                                            color={
                                                data.status === "Finalized"
                                                ? "success"
                                                : data.status === "Cancelled"
                                                ? "error"
                                                : "primary"
                                            }
                                            >
                                            {data.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.finalizedBy || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.finalizedDate || "—"}
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
                                                        className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                                                        onItemClick={() => window.alert("Delete action triggered")}
                                                        >
                                                        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-full h-6 w-6 flex items-center justify-center">
                                                            <Trash2 className="h-4 w-4 text-white" />
                                                        </div>
                                                        Delete
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
                onSave={handleAddNewEntry}
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