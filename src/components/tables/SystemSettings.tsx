"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, Eye, Edit, Trash, Plus } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface Branch {
  id: number;
  branch: string;
  company: string;
  address: string;
  type: "Main" | "Sub" | "Regional";
  branchId: string;
}

const branchData: Branch[] = [
  {
    id: 1,
    branch: "Downtown Branch",
    company: "ABC Corp",
    address: "123 Main St, Cityville",
    type: "Main",
    branchId: "BR001",
  },
  {
    id: 2,
    branch: "Uptown Branch",
    company: "ABC Corp",
    address: "456 Oak Ave, Townsville",
    type: "Sub",
    branchId: "BR002",
  },
  {
    id: 3,
    branch: "Eastside Regional",
    company: "XYZ Inc",
    address: "789 Pine Rd, East City",
    type: "Regional",
    branchId: "BR003",
  },
  {
    id: 4,
    branch: "Westside Branch",
    company: "ABC Corp",
    address: "101 Maple Dr, West Town",
    type: "Sub",
    branchId: "BR004",
  },
  {
    id: 5,
    branch: "Central Hub",
    company: "XYZ Inc",
    address: "321 Elm St, Central City",
    type: "Main",
    branchId: "BR005",
  },
];

export default function SystemSettings() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [branches, setBranches] = useState<Branch[]>(branchData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    branch: "",
    company: "",
    address: "",
    type: "Main" as "Main" | "Sub" | "Regional",
    branchId: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const itemsPerPage = 10;

  const validTypes = ["Main", "Sub", "Regional"];

  const filteredData = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch = branch.branch
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || branch.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [branches, searchQuery, typeFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleViewDetails = (branchId: number) => {
    console.log(`Viewing details for branch ${branchId}`);
    setOpenDropdownId(null);
  };

  const handleEdit = (branchId: number) => {
    console.log(`Editing branch ${branchId}`);
    setOpenDropdownId(null);
  };

  const handleDelete = (branchId: number) => {
    setBranches((prevBranches) =>
      prevBranches.filter((branch) => branch.id !== branchId)
    );
    console.log(`Deleted branch ${branchId}`);
    setOpenDropdownId(null);
  };

  const handleAddBranch = () => {
    const newId = Math.max(...branches.map((b) => b.id), 0) + 1;
    const newBranchData: Branch = {
      id: newId,
      branch: newBranch.branch,
      company: newBranch.company,
      address: newBranch.address,
      type: newBranch.type,
      branchId: newBranch.branchId,
    };
    setBranches((prevBranches) => [...prevBranches, newBranchData]);
    setNewBranch({ branch: "", company: "", address: "", type: "Main", branchId: "" });
    setIsModalOpen(false);
    console.log(`Added new branch: ${newBranch.branch}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by branch name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <div className="flex items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="All">All Types</option>
            {validTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Branch
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Add New Branch
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="branch" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Branch Name
                </label>
                <Input
                  id="branch"
                  value={newBranch.branch}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, branch: e.target.value })
                  }
                  placeholder="Enter branch name"
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company
                </label>
                <Input
                  id="company"
                  value={newBranch.company}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, company: e.target.value })
                  }
                  placeholder="Enter company name"
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <Input
                  id="address"
                  value={newBranch.address}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, address: e.target.value })
                  }
                  placeholder="Enter address"
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  id="type"
                  value={newBranch.type}
                  onChange={(e) =>
                    setNewBranch({
                      ...newBranch,
                      type: e.target.value as "Main" | "Sub" | "Regional",
                    })
                  }
                  className="border border-gray-200 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="Main">Main</option>
                  <option value="Sub">Sub</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="branchId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Branch ID
                </label>
                <Input
                  id="branchId"
                  value={newBranch.branchId}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, branchId: e.target.value })
                  }
                  placeholder="Enter branch ID"
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddBranch}
                disabled={!newBranch.branch || !newBranch.company || !newBranch.address || !newBranch.branchId}
                className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
              >
                Add Branch
              </Button>
            </div>
          </div>
        </div>
      )}

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
                    Branch
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Company
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Address
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Type
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Branch ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.length > 0 ? (
                  paginatedData.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                        {branch.branch}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch.company}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch.address}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch.type}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch.branchId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-sm text-gray-600 dark:text-gray-300">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(branch.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === branch.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-48 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 transition-colors duration-200"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => handleViewDetails(branch.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-full h-6 w-6 flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                              View Details
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => handleEdit(branch.id)}
                            >
                              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-6 w-6 flex items-center justify-center">
                                <Edit className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => handleDelete(branch.id)}
                            >
                              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full h-6 w-6 flex items-center justify-center">
                                <Trash className="h-4 w-4 text-white" />
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
                    <TableCell colSpan={6} className="text-center py-6">
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