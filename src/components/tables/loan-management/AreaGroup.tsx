"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface AreaGroup {
  id: number;
  code: string;
  description: string;
  branch: string;
}

const areaGroupData: AreaGroup[] = [
  { id: 1, code: "AG001", description: "Metro Manila North", branch: "BR001" },
  { id: 2, code: "AG002", description: "Metro Manila South", branch: "BR002" },
  { id: 3, code: "AG003", description: "Quezon City Central", branch: "BR003" },
  { id: 4, code: "AG004", description: "Makati Business District", branch: "BR001" },
  { id: 5, code: "AG005", description: "Pasay Coastal Area", branch: "BR004" },
  { id: 6, code: "AG006", description: "Mandaluyong Commercial", branch: "BR002" },
  { id: 7, code: "AG007", description: "Ortigas Center", branch: "BR003" },
  { id: 8, code: "AG008", description: "Manila Downtown", branch: "BR001" },
  { id: 9, code: "AG009", description: "Taguig Financial Zone", branch: "BR004" },
  { id: 10, code: "AG010", description: "Pasig Residential", branch: "BR002" },
  { id: 11, code: "AG011", description: "Parañaque Suburban", branch: "BR003" },
  { id: 12, code: "AG012", description: "Las Piñas Rural", branch: "BR004" },
];

export default function AreaGroupTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [areaGroups, setAreaGroups] = useState<AreaGroup[]>(areaGroupData);
  const route = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return areaGroups.slice(startIndex, endIndex);
  }, [currentPage, areaGroups]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new area group");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const areaGroup = areaGroups.find((ag) => ag.id === id);
    console.log("Editing area group:", areaGroup);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting area group:", id);
    setAreaGroups(areaGroups.filter((areaGroup) => areaGroup.id !== id));
    setOpenDropdownId(null);
  };

  const handleBack = () => {
    route.push("/master-files/loan-management");
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
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add New
        </button>
      </div>
      <div className="text-sm overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[400px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {[
                    "Code",
                    "Description",
                    "Branch",
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
                  paginatedData.map((areaGroup) => (
                    <TableRow key={areaGroup.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {areaGroup.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {areaGroup.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {areaGroup.branch}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(areaGroup.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === areaGroup.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(areaGroup.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(areaGroup.id)}
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
        totalItems={areaGroups.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}