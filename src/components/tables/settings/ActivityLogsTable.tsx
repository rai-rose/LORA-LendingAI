"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Pagination from "@/components/tables/Pagination"; // Import the new Pagination component
import { Filter } from "lucide-react";
import { format } from "date-fns";

interface Log {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

const sampleLogs: Log[] = [
  { id: 1, user: "admin@example.com", action: "Login", timestamp: "2025-08-08T10:00:00Z", details: "Admin logged in from IP 192.168.1.1" },
  { id: 2, user: "user@example.com", action: "Update Profile", timestamp: "2025-08-08T09:45:00Z", details: "Updated user profile information" },
  { id: 3, user: "admin@example.com", action: "Delete Record", timestamp: "2025-08-08T09:30:00Z", details: "Deleted user ID 123" },
  { id: 4, user: "user2@example.com", action: "Role Change", timestamp: "2025-08-07T14:30:00Z", details: "Changed role to Agent" },
  { id: 5, user: "user3@example.com", action: "Create", timestamp: "2025-08-07T10:20:00Z", details: "Created new task" },
  { id: 6, user: "admin@example.com", action: "Login", timestamp: "2025-08-06T11:00:00Z", details: "Admin logged in from IP 192.168.1.2" },
  { id: 7, user: "user4@example.com", action: "Update Profile", timestamp: "2025-08-06T09:15:00Z", details: "Updated email address" },
  { id: 8, user: "user5@example.com", action: "Delete Record", timestamp: "2025-08-05T16:45:00Z", details: "Deleted task ID 456" },
  { id: 9, user: "admin@example.com", action: "Role Change", timestamp: "2025-08-05T12:00:00Z", details: "Changed role to Admin" },
  { id: 10, user: "user6@example.com", action: "Create", timestamp: "2025-08-04T08:30:00Z", details: "Created new project" },
  { id: 11, user: "user7@example.com", action: "Login", timestamp: "2025-08-04T07:00:00Z", details: "User logged in from IP 192.168.1.3" },
];

export default function ActivityLogsPage() {
  const [logs] = useState<Log[]>(sampleLogs);
  const [filter, setFilter] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  // Filter logs based on user, action, or details
  const filteredLogs = logs.filter(
    (log) =>
      (log.user.toLowerCase().includes(filter.toLowerCase()) ||
        log.action.toLowerCase().includes(filter.toLowerCase()) ||
        log.details.toLowerCase().includes(filter.toLowerCase())) &&
      (actionFilter === "all" || log.action === actionFilter)
  );

  const handleActionFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActionFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleResetFilters = () => {
    setFilter("");
    setActionFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Activity Logs
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          View and filter system activity logs
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Filter by user, action, or details..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 rounded-lg border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <select
            value={actionFilter}
            onChange={handleActionFilterChange}
            className="w-full sm:w-48 rounded-lg border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 px-3 py-2 text-sm"
          >
            <option value="all">All Actions</option>
            <option value="Login">Login</option>
            <option value="Update Profile">Update Profile</option>
            <option value="Delete Record">Delete Record</option>
            <option value="Role Change">Role Change</option>
            <option value="Create">Create</option>
          </select>
        </div>
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="rounded-lg border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          Reset Filters
        </Button>
      </div>

      {/* Logs Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Timestamp
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Details
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredLogs
                  .slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)
                  .map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90 text-theme-sm">
                        {log.user}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90 text-theme-sm">
                        <Badge
                          size="sm"
                          variant="solid"
                          color={
                            log.action === "Login"
                              ? "success"
                              : log.action === "Update Profile"
                              ? "info"
                              : log.action === "Delete Record"
                              ? "error"
                              : log.action === "Role Change"
                              ? "warning"
                              : "primary"
                          }
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 dark:text-gray-400 text-theme-sm">
                        {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 dark:text-gray-400 text-theme-sm">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="px-5 py-4 text-center text-gray-500 dark:text-gray-400 text-theme-sm"
                    >
                      No logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredLogs.length}
        itemsPerPage={logsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}