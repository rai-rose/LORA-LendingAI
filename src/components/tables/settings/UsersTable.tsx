"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import { Ellipsis, Eye, Edit, Trash, Plus } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Pagination from "@/components/tables/Pagination";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface User {
  id: number;
  image: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "client";
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
}

const tableData: User[] = [
  {
    id: 1,
    image: "/images/user/user-17.jpg",
    name: "Lindsey Curtis",
    email: "lindsey.curtis@example.com",
    role: "admin",
    status: "Active",
    lastLogin: "2025-08-07 10:30 AM",
  },
  {
    id: 2,
    image: "/images/user/user-18.jpg",
    name: "Kaiya George",
    email: "kaiya.george@example.com",
    role: "agent",
    status: "Active",
    lastLogin: "2025-08-06 02:15 PM",
  },
  {
    id: 3,
    image: "/images/user/user-17.jpg",
    name: "Zain Geidt",
    email: "zain.geidt@example.com",
    role: "client",
    status: "Inactive",
    lastLogin: "2025-08-05 09:00 AM",
  },
  {
    id: 4,
    image: "/images/user/user-20.jpg",
    name: "Abram Schleifer",
    email: "abram.schleifer@example.com",
    role: "client",
    status: "Suspended",
    lastLogin: "2025-08-04 11:45 AM",
  },
  {
    id: 5,
    image: "/images/user/user-21.jpg",
    name: "Carla George",
    email: "carla.george@example.com",
    role: "agent",
    status: "Active",
    lastLogin: "2025-08-07 04:20 PM",
  },
];

export default function UserManagementTable() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "client" as "admin" | "agent" | "client",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const itemsPerPage = 10;

  const validStatuses = ["Active", "Inactive", "Suspended"];

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleViewDetails = (userId: number) => {
    console.log(`Viewing details for user ${userId}`);
    setOpenDropdownId(null);
  };

  const handleEdit = (userId: number) => {
    console.log(`Editing user ${userId}`);
    setOpenDropdownId(null);
  };

  const handleDelete = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    console.log(`Deleted user ${userId}`);
    setOpenDropdownId(null);
  };

  const handleAddUser = () => {
    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    const newUserData: User = {
      id: newId,
      image: "/images/user/default-user.jpg",
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
    setUsers((prevUsers) => [...prevUsers, newUserData]);
    setNewUser({ name: "", email: "", role: "client" });
    setIsModalOpen(false);
    console.log(`Added new user: ${newUser.name}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <div className="flex items-center gap-4">
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
          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Add New User
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
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter name"
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter email"
                  className="border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as "admin" | "agent" | "client",
                    })
                  }
                  className="border border-gray-200 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="client">Client</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
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
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email}
                className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
              >
                Add User
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
                    User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Last Login
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
                  paginatedData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                              width={40}
                              height={40}
                              src={user.image}
                              alt={user.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {user.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            user.role === "admin"
                              ? "success"
                              : user.role === "agent"
                              ? "warning"
                              : "info"
                          }
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          variant="solid"
                          color={
                            user.status === "Active"
                              ? "success"
                              : user.status === "Inactive"
                              ? "warning"
                              : "error"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-sm text-gray-600 dark:text-gray-300">
                        <div className="relative">
                          <button
                            className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => toggleDropdown(user.id)}
                          >
                            <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150" />
                          </button>
                          <Dropdown
                            isOpen={openDropdownId === user.id}
                            onClose={() => setOpenDropdownId(null)}
                            className="w-48 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 transition-colors duration-200"
                          >
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => handleViewDetails(user.id)}
                            >
                              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                              View Details
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => handleEdit(user.id)}
                            >
                              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full h-6 w-6 flex items-center justify-center">
                                <Edit className="h-4 w-4 text-white" />
                              </div>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm flex items-center gap-3 px-4 py-2.5 transition-colors duration-150"
                              onItemClick={() => handleDelete(user.id)}
                            >
                              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-full h-6 w-6 flex items-center justify-center">
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