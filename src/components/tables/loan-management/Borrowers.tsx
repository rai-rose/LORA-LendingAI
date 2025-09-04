"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Plus, ArrowLeft, Search, Pencil, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";

interface Borrower {
  id: number;
  branchEncoded: string;
  customer: string;
  address: string;
  blocked: boolean;
  type: string;
}

const borrowerData: Borrower[] = [
  { id: 1, branchEncoded: "BR001", customer: "Cruz, Juan", address: "123 Rizal St, Manila", blocked: false, type: "Individual" },
  { id: 2, branchEncoded: "BR002", customer: "Santos, Maria", address: "456 Quezon Ave, Quezon City", blocked: true, type: "Business" },
  { id: 3, branchEncoded: "BR003", customer: "Reyes, Pedro", address: "789 Makati Ave, Makati", blocked: false, type: "Individual" },
  { id: 4, branchEncoded: "BR001", customer: "Garcia, Ana", address: "321 EDSA, Pasay", blocked: false, type: "Individual" },
  { id: 5, branchEncoded: "BR004", customer: "Lopez, Jose", address: "654 Aurora Blvd, Quezon City", blocked: true, type: "Business" },
  { id: 6, branchEncoded: "BR002", customer: "Dela Cruz, Sofia", address: "987 Taft Ave, Manila", blocked: false, type: "Individual" },
  { id: 7, branchEncoded: "BR003", customer: "Fernandez, Miguel", address: "147 Ortigas Ave, Pasig", blocked: false, type: "Individual" },
  { id: 8, branchEncoded: "BR004", customer: "Torres, Clara", address: "258 Commonwealth Ave, Quezon City", blocked: true, type: "Business" },
  { id: 9, branchEncoded: "BR001", customer: "Rivera, Diego", address: "369 Shaw Blvd, Mandaluyong", blocked: false, type: "Individual" },
  { id: 10, branchEncoded: "BR002", customer: "Aquino, Liza", address: "741 Katipunan Ave, Quezon City", blocked: false, type: "Individual" },
  { id: 11, branchEncoded: "BR003", customer: "Martinez, Carlo", address: "852 Roxas Blvd, Manila", blocked: true, type: "Business" },
  { id: 12, branchEncoded: "BR004", customer: "Gomez, Elena", address: "963 Boni Ave, Mandaluyong", blocked: false, type: "Individual" },
];

export default function BorrowersTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [borrowers, setBorrowers] = useState<Borrower[]>(borrowerData);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRouter();
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!searchQuery) return borrowers;
    const lowerQuery = searchQuery.toLowerCase();
    return borrowers.filter((borrower) =>
      borrower.customer.toLowerCase().includes(lowerQuery)
    );
  }, [borrowers, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleAddNew = () => {
    console.log("Add new borrower");
    // Implement add functionality
  };

  const handleEdit = (id: number) => {
    const borrower = borrowers.find((b) => b.id === id);
    console.log("Editing borrower:", borrower);
    setOpenDropdownId(null);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Deleting borrower:", id);
    setBorrowers(borrowers.filter((borrower) => borrower.id !== id));
    setOpenDropdownId(null);
  };

  const handleBack = () => {
    route.push("/master-files/loan-management");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-gray-400 text-white rounded-full text-sm hover:bg-gray-500 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by first or last name..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
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
                                  "Branch Encoded",
                                  "Customer",
                                  "Address",
                                  "Blocked",
                                  "Type",
                                  "ID",
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
                  paginatedData.map((borrower) => (
                    <TableRow key={borrower.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {borrower.branchEncoded}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {borrower.customer}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {borrower.address}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {borrower.blocked ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {borrower.type}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {borrower.id}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(borrower.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === borrower.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleEdit(borrower.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Pencil className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                              onItemClick={() => handleDelete(borrower.id)}
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
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}