"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface PensionType {
  id: number;
  code: string;
  description: string;
  mainClass: string;
  accountLink: string;
}

const pensionData: PensionType[] = [
  { id: 1, code: "PEN001", description: "AFP Pension", mainClass: "Retirement", accountLink: "AFP-001" },
  { id: 2, code: "PEN002", description: "AFSLAI Pension", mainClass: "Retirement", accountLink: "AFSLAI-002" },
  { id: 3, code: "PEN003", description: "Allottee Pension", mainClass: "Supplemental", accountLink: "ALLOTEE-003" },
  { id: 4, code: "PEN004", description: "BFP Pension", mainClass: "Retirement", accountLink: "BFP-004" },
  { id: 5, code: "PEN005", description: "BJMP Pension", mainClass: "Retirement", accountLink: "BJMP-005" },
  { id: 6, code: "PEN006", description: "Business Pension", mainClass: "Private", accountLink: "BUS-006" },
  { id: 7, code: "PEN007", description: "Foreign Loan Pension", mainClass: "International", accountLink: "FL-007" },
  { id: 8, code: "PEN008", description: "GSIS Pension", mainClass: "Government", accountLink: "GSIS-008" },
  { id: 9, code: "PEN009", description: "SSS Pension", mainClass: "Government", accountLink: "SSS-009" },
  { id: 10, code: "PEN010", description: "Salary Pension", mainClass: "Supplemental", accountLink: "SAL-010" },
  { id: 11, code: "PEN011", description: "PNP Pension", mainClass: "Retirement", accountLink: "PNP-011" },
  { id: 12, code: "PEN012", description: "Philippine Coast Guard Pension", mainClass: "Retirement", accountLink: "PCG-012" },
];

export default function PensionTypeTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pensions, setPensions] = useState<PensionType[]>(pensionData);
  const route = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pensions.slice(startIndex, endIndex);
  }, [currentPage, pensions]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new pension type");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const pension = pensions.find((p) => p.id === id);
    console.log("Editing pension type:", pension);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting pension type:", id);
    setPensions(pensions.filter((pension) => pension.id !== id));
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
          <div className="min-w-[600px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                              <TableRow>
                                {[
                                  "Code",
                                  "Description",
                                  "Main Class",
                                  "Account Link",
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
              <TableBody className="text-sm divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.length > 0 ? (
                  paginatedData.map((pension) => (
                    <TableRow key={pension.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {pension.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {pension.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {pension.mainClass}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {pension.accountLink}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(pension.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === pension.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(pension.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(pension.id)}
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
                    <TableCell colSpan={5} className="text-center py-6">
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
        totalItems={pensions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}