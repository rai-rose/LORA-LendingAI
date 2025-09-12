"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface LoanDeduction {
  id: number;
  code: string;
  chargeNumber: string;
  description: string;
  accountCode: string;
  price: number;
  vat: number;
}

const deductionData: LoanDeduction[] = [
  { id: 1, code: "DED001", chargeNumber: "CHG001", description: "Processing Fee", accountCode: "ACC001", price: 500.00, vat: 60.00 },
  { id: 2, code: "DED002", chargeNumber: "CHG002", description: "Service Fee", accountCode: "ACC002", price: 300.00, vat: 36.00 },
  { id: 3, code: "DED003", chargeNumber: "CHG003", description: "Documentation Fee", accountCode: "ACC003", price: 200.00, vat: 24.00 },
  { id: 4, code: "DED004", chargeNumber: "CHG004", description: "Appraisal Fee", accountCode: "ACC004", price: 1000.00, vat: 120.00 },
  { id: 5, code: "DED005", chargeNumber: "CHG005", description: "Insurance Premium", accountCode: "ACC005", price: 1500.00, vat: 180.00 },
  { id: 6, code: "DED006", chargeNumber: "CHG006", description: "Notary Fee", accountCode: "ACC006", price: 400.00, vat: 48.00 },
  { id: 7, code: "DED007", chargeNumber: "CHG007", description: "Registration Fee", accountCode: "ACC007", price: 600.00, vat: 72.00 },
  { id: 8, code: "DED008", chargeNumber: "CHG008", description: "Legal Fee", accountCode: "ACC008", price: 800.00, vat: 96.00 },
  { id: 9, code: "DED009", chargeNumber: "CHG009", description: "Credit Check Fee", accountCode: "ACC009", price: 250.00, vat: 30.00 },
  { id: 10, code: "DED010", chargeNumber: "CHG010", description: "Administrative Fee", accountCode: "ACC010", price: 350.00, vat: 42.00 },
  { id: 11, code: "DED011", chargeNumber: "CHG011", description: "Collateral Valuation", accountCode: "ACC011", price: 1200.00, vat: 144.00 },
  { id: 12, code: "DED012", chargeNumber: "CHG012", description: "Transaction Fee", accountCode: "ACC012", price: 450.00, vat: 54.00 },
];

export default function LoanDeductionTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deductions, setDeductions] = useState<LoanDeduction[]>(deductionData);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return deductions.slice(startIndex, endIndex);
  }, [currentPage, deductions]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new deduction");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const deduction = deductions.find((d) => d.id === id);
    console.log("Editing deduction:", deduction);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting deduction:", id);
    setDeductions(deductions.filter((deduction) => deduction.id !== id));
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
          <div className="min-w-[600px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                              <TableRow>
                                {[
                                  "Code",
                                  "Charge Number",
                                  "Description",
                                  "Account Code",
                                  "Price",
                                  "VAT",
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
                  paginatedData.map((deduction) => (
                    <TableRow key={deduction.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {deduction.code}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {deduction.chargeNumber}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {deduction.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {deduction.accountCode}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        ₱{deduction.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        ₱{deduction.vat.toFixed(2)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(deduction.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === deduction.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(deduction.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(deduction.id)}
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
                    <TableCell colSpan={7} className="text-center py-6">
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
        totalItems={deductions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}