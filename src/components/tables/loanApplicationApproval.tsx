/* eslint-disable react-hooks/exhaustive-deps */
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
import { Ellipsis, Eye, Check, X, Edit } from "lucide-react";
import Image from "next/image";
import { getActions, tableData } from "./utils";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import Button from "../ui/button/Button";

export default function LoanApplicationApprovalTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const validStatuses = [
    "Pending",
    "Recommended for Approval",
    "Documentary Accepted",
    "Documentary Not Accepted",
    "Approved",
    "Disapproved",
    "Voucher Created",
    "Cash/Check Released/Transaction Done",
  ];

  const filteredData = useMemo(() => {
    return tableData
      .map((order) => ({
        ...order,
        actions: getActions(order.status, "loan-application-approval"),
      }))
      .filter((order) => {
        const matchesSearch = order.user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "All" || order.status === statusFilter;
        return matchesSearch && matchesStatus && validStatuses.includes(order.status);
      });
  }, [searchQuery, statusFilter, validStatuses]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

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
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {[
                    "Client",
                    "Interest Rate",
                    "Loan Type",
                    "Subclass",
                    "Loan ID",
                    "Applied On",
                    "Approved Date",
                    "Loan Applied",
                    "Status",
                    "Risk Score",
                    "Approval Probability",
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
                        {order.interestRate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.loanType}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.subclass}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.loanId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.appliedOn}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.approvedDate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.loanApplied ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            order.status === "Approved" ||
                            order.status === "Cash/Check Released/Transaction Done"
                              ? "success"
                              : order.status === "Pending" ||
                                order.status === "Recommended for Approval" ||
                                order.status === "Documentary Accepted"
                              ? "warning"
                              : order.status === "Disapproved" ||
                                order.status === "Documentary Not Accepted"
                              ? "error"
                              : order.status === "Voucher Created"
                              ? "dark"
                              : "primary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.riskScore}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {order.approvalProbability}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-sm text-gray-600 dark:text-gray-300">
                        <div className="relative">
                          <Button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full bg-transparent hover:bg-transparent dark:hover:bg-transparent transition-colors duration-200"
                            onClick={() => toggleDropdown(order.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150" />
                          </Button>
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
                    <TableCell colSpan={12} className="text-center py-6">
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