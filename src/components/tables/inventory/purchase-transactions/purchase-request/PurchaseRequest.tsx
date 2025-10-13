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
import { getActions, purchaseRequestData } from "../../../utils";
import { Ellipsis, Eye, Edit, ArrowLeft } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import CreatePurchaseRequestModal from "@/components/ui/modal/CreatePurchaseRequest";

export default function PurchaseRequest() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const itemsPerPage = 10;

    const validStatuses = ["Active", "Cancelled"];

    const filteredData = useMemo(() => {
        return purchaseRequestData
        .map((data) => ({
            ...data,
            actions: getActions(data.status, "loan-contract-list"),
        }))
        .filter((data) => {
            const matchesSearch = data.recipient.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
            const matchesStatus =
            statusFilter === "All" || data.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter, validStatuses]);

    const handleAddNewLoan = () => {
        setShowCreateModal(true);
    };

    const handleSavePurchaseRequest = (data: any) => {
        setShowCreateModal(false);
    };

    const handleBack = () => {
        router.push("/inventory/purchase-transactions");
    };

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    const exportToExcel = () => {
        type ExportRow = {
            "P.R#": string;
            "P.O#": string;
            Reference: string;
            "PR Date": string;
            "Date Needed": string;
            Recipient: string;
            Status: string;
            "Requested By": string;
            "Transaction Date": string;
            "Transaction Time": string;
            "Cost Center": string;
            "Sub Cost Center": string;
        };

        const exportData: ExportRow[] = filteredData.map((data) => ({
            "P.O#": data.poNumber,
            "P.R#": data.prNumber,
            Reference: data.referenceNumber || "—",
            "PR Date": data.prDate || "—",
            "Date Needed": data.dateNeeded || "—",
            Recipient: data.recipient.name,
            Status: data.status,
            "Requested By": data.requestedBy || "—",
            "Transaction Date": data.transactionDate || "—",
            "Transaction Time": data.transactionTime || "—",
            "Cost Center": data.costCenter || "—",
            "Sub Cost Center": data.subCostCenter || "—",
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        aria-label="Search by borrower name"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
                            onClick={handleAddNewLoan}
                            className="px-4 py-2 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
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
                            New Purchase Request
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

            <CreatePurchaseRequestModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSave={handleSavePurchaseRequest}
            />

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                {[
                                    "P.R#",
                                    "P.O#",
                                    "Reference",
                                    "PR Date",
                                    "Date Needed",
                                    "Recipient",
                                    "Status",
                                    "Requested By",
                                    "Transaction Date",
                                    "Transaction Time",
                                    "Cost Center",
                                    "Sub Cost Center",
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
                                            {data.prNumber || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.poNumber}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.referenceNumber}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.prDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.dateNeeded || "—"}
                                        </TableCell>

                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <Image
                                                width={40}
                                                height={40}
                                                src={data.recipient.image}
                                                alt={`Profile image of ${data.recipient.name}`}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {data.recipient.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                {data.recipient.role}
                                                </span>
                                            </div>
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <Badge
                                            size="sm"
                                            color={
                                                data.status === "Active"
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
                                            ADMIN
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.transactionDate || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.transactionTime || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            {data.costCenter || "—"}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">                                      
                                            {data.subCostCenter || "—"}
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
                                                    onItemClick={() => setOpenDropdownId(null)}
                                                    >
                                                    <div className="bg-gradient-to-r from-gray-600 to-gray-800 dark:bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center">
                                                        <Eye className="h-4 w-4 text-white" />
                                                    </div>
                                                    View Details
                                                    </DropdownItem>
                                                    <DropdownItem
                                                    className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                                                    onItemClick={() => setOpenDropdownId(null)}
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

            <Pagination
                currentPage={currentPage}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}