"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface Requirement {
  id: number;
  code: string;
  description: string;
}

const requirementData: Requirement[] = [
  { id: 1, code: "REQ001", description: "AFP Membership Verification" },
  { id: 2, code: "REQ002", description: "AFSLAI Account Statement" },
  { id: 3, code: "REQ003", description: "Allottee Identification Document" },
  { id: 4, code: "REQ004", description: "BFP Service Record" },
  { id: 5, code: "REQ005", description: "BJMP Employment Certificate" },
  { id: 6, code: "REQ006", description: "Business Registration Document" },
  { id: 7, code: "REQ007", description: "Foreign Loan Agreement" },
  { id: 8, code: "REQ008", description: "GSIS Membership Form" },
  { id: 9, code: "REQ009", description: "SSS Contribution Proof" },
  { id: 10, code: "REQ010", description: "Salary Payslip" },
  { id: 11, code: "REQ011", description: "PNP Service Record" },
  { id: 12, code: "REQ012", description: "Philippine Coast Guard ID" },
];

export default function RequirementsTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requirements, setRequirements] = useState<Requirement[]>(requirementData);
  const route = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return requirements.slice(startIndex, endIndex);
  }, [currentPage, requirements]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new requirement");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const requirement = requirements.find((r) => r.id === id);
    console.log("Editing requirement:", requirement);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting requirement:", id);
    setRequirements(requirements.filter((requirement) => requirement.id !== id));
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
                    Requirement Description
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
                  paginatedData.map((requirement) => (
                    <TableRow key={requirement.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {requirement.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {requirement.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(requirement.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === requirement.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(requirement.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(requirement.id)}
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
                    <TableCell colSpan={3} className="text-center py-6">
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
        totalItems={requirements.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}