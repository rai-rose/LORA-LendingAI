"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import * as XLSX from "xlsx";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Ellipsis, Eye, Edit, Check, X } from "lucide-react";
import { getActions, tableData } from "./utils";
import Pagination from "@/components/tables/Pagination";

export default function PaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const validStatuses = [
    "Active",
    "3 Days Before Due",
    "Today's Due",
    "Past Due",
    "Overdue",
    "Deceased",
    "Closed Account",
  ];

  const filteredData = useMemo(() => {
    return tableData
      .map((order) => ({
        ...order,
        actions: getActions(order.status, "payments"),
      }))
      .filter((order) => {
        const matchesSearch = order.user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "All" || order.status === statusFilter;
        const isValid = order.loanApplied && validStatuses.includes(order.status);
        return matchesSearch && matchesStatus && isValid;
      });
  }, [searchQuery, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const exportToExcel = () => {
    const exportData = filteredData.map((order) => ({
      Borrower: order.user.name,
      "Interest Rate": order.interestRate || "—",
      "Loan Type": order.loanType,
      "Contract Number": order.contractNumber || "—",
      "Contract Date": order.contractDate || "—",
      Class: order.subclass,
      "Loan ID": order.loanId,
      "Interest Balance": order.interestBalance || "—",
      "Principal Balance": order.principalBalance || "—",
      Occurrence: order.occurrence || "—",
      "First Due Date": order.firstDueDate || "—",
      "Due Date": order.dueDate || "—",
      Status: order.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    const colWidths = Object.keys(exportData[0]).map((key) =>
      Math.max(
        key.length,
        ...exportData.map((row) => String(row[key as keyof typeof row]).length)
      ) + 2
    );
    worksheet["!cols"] = colWidths.map((w) => ({ wch: w }));
    XLSX.writeFile(workbook, "payments.xlsx");
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="All">All Statuses</option>
            {validStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
            title="Export to Excel"
          >
            <Image
              src="/images/icons/excel.svg"
              alt="Excel"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {[
                    "Borrower",
                    "Interest Rate",
                    "Loan Type",
                    "Contract Number",
                    "Contract Date",
                    "Class",
                    "Loan ID",
                    "Interest Balance",
                    "Principal Balance",
                    "Occurrence",
                    "First Due Date",
                    "Due Date",
                    "Status",
                    "Actions",
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
                  paginatedData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                              width={40}
                              height={40}
                              src={order.user.image}
                              alt={order.user.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {order.user.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {order.user.role}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.interestRate || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.loanType}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.contractNumber || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.contractDate || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.subclass}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.loanId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.interestBalance || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.principalBalance || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.occurrence || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.firstDueDate || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.dueDate || "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            order.status === "Active" ||
                            order.status === "Today's Due" ||
                            order.status === "3 Days Before Due"
                              ? "success"
                              : order.status === "Past Due" ||
                                order.status === "Overdue"
                              ? "warning"
                              : order.status === "Deceased"
                              ? "error"
                              : order.status === "Closed Account"
                              ? "default"
                              : "default"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-sm text-gray-600 dark:text-gray-300">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(order.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === order.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-48 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 transition-colors duration-200"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="bg-gradient-to-r from-gray-500 to-gray-600 dark:bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                              View Details
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:bg-blue-400 rounded-full h-6 w-6 flex items-center justify-center">
                                <Edit className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="bg-gradient-to-r from-green-500 to-green-600 dark:bg-green-400 rounded-full h-6 w-6 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                              Approve
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="bg-gradient-to-r from-red-500 to-red-600 dark:bg-red-400 rounded-full h-6 w-6 flex items-center justify-center">
                                <X className="h-4 w-4 text-white" />
                              </div>
                              Reject
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={14} className="text-center py-6">
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