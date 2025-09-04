"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface PaymentSchedule {
  id: number;
  code: string;
  description: string;
  daysInMonth: number;
}

const paymentScheduleData: PaymentSchedule[] = [
  { id: 1, code: "SCH001", description: "Monthly Payment - Start of Month", daysInMonth: 1 },
  { id: 2, code: "SCH002", description: "Monthly Payment - Mid Month", daysInMonth: 15 },
  { id: 3, code: "SCH003", description: "Bi-Monthly Payment - 1st and 15th", daysInMonth: 1 },
  { id: 4, code: "SCH004", description: "Bi-Monthly Payment - 10th and 25th", daysInMonth: 10 },
  { id: 5, code: "SCH005", description: "End of Month Payment", daysInMonth: 30 },
  { id: 6, code: "SCH006", description: "Quarterly Payment - First Day", daysInMonth: 1 },
  { id: 7, code: "SCH007", description: "Semi-Monthly Payment - 5th and 20th", daysInMonth: 5 },
  { id: 8, code: "SCH008", description: "Monthly Payment - 10th of Month", daysInMonth: 10 },
  { id: 9, code: "SCH009", description: "Monthly Payment - 20th of Month", daysInMonth: 20 },
  { id: 10, code: "SCH010", description: "Bi-Weekly Payment - 1st and 15th", daysInMonth: 1 },
  { id: 11, code: "SCH011", description: "Monthly Payment - Last Day", daysInMonth: 30 },
  { id: 12, code: "SCH012", description: "Custom Payment Schedule", daysInMonth: 15 },
];

export default function ScheduleOfPaymentsTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [schedules, setSchedules] = useState<PaymentSchedule[]>(paymentScheduleData);
  const route = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return schedules.slice(startIndex, endIndex);
  }, [currentPage, schedules]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new payment schedule");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const schedule = schedules.find((s) => s.id === id);
    console.log("Editing payment schedule:", schedule);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting payment schedule:", id);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    setOpenDropdownId(null);
  };

  const handleBack = () => {
    route.push("/master-files/loan-management");
    // Implement navigation
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 bg-gray-400 text-white rounded-full text-sm hover:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </button>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>
      <div className="text-sm overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[400px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Code
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Days in a Month
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.length > 0 ? (
                  paginatedData.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {schedule.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {schedule.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {schedule.daysInMonth}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(schedule.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === schedule.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(schedule.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(schedule.id)}
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
                    <TableCell colSpan={4} className="text-center py-6">
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
        totalItems={schedules.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}