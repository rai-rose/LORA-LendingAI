"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface LoanCollateral {
  id: number;
  code: string;
  description: string;
}

const collateralData: LoanCollateral[] = [
  { id: 1, code: "COL001", description: "Real Estate Property" },
  { id: 2, code: "COL002", description: "Vehicle Title" },
  { id: 3, code: "COL003", description: "Savings Account Pledge" },
  { id: 4, code: "COL004", description: "Government Bonds" },
  { id: 5, code: "COL005", description: "Jewelry" },
  { id: 6, code: "COL006", description: "Business Assets" },
  { id: 7, code: "COL007", description: "Stock Certificates" },
  { id: 8, code: "COL008", description: "Land Title" },
  { id: 9, code: "COL009", description: "Equipment Lease" },
  { id: 10, code: "COL010", description: "Retirement Fund Pledge" },
  { id: 11, code: "COL011", description: "Corporate Guarantee" },
  { id: 12, code: "COL012", description: "Time Deposit" },
];

export default function LoanCollateralTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [collaterals, setCollaterals] = useState<LoanCollateral[]>(collateralData);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return collaterals.slice(startIndex, endIndex);
  }, [currentPage, collaterals]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new collateral");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const collateral = collaterals.find((c) => c.id === id);
    console.log("Editing collateral:", collateral);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting collateral:", id);
    setCollaterals(collaterals.filter((collateral) => collateral.id !== id));
    setOpenDropdownId(null);
  };

  const handleBack = () => {
    router.push("/master-files/loan-management");
    // Implement navigation
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <ArrowLeft className="h-5 w-5" />
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
                  paginatedData.map((collateral) => (
                    <TableRow key={collateral.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {collateral.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {collateral.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(collateral.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === collateral.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(collateral.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(collateral.id)}
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
        totalItems={collaterals.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}