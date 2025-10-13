"use client";

import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

interface Customer {
  id: number;
  customerCode: string;
  customerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  creditLimit: number;
  isActive: boolean;
  createdAt: string;
}

const sampleData: Customer[] = [
  {
    id: 1,
    customerCode: "CUST001",
    customerName: "ABC Corporation",
    contactPerson: "John Doe",
    email: "john@abccorp.com",
    phone: "+1-555-0123",
    address: "123 Business St, City, State 12345",
    creditLimit: 50000,
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    customerCode: "CUST002",
    customerName: "XYZ Industries",
    contactPerson: "Jane Smith",
    email: "jane@xyzind.com",
    phone: "+1-555-0456",
    address: "456 Industrial Ave, City, State 12345",
    creditLimit: 75000,
    isActive: true,
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    customerCode: "CUST003",
    customerName: "Global Solutions Ltd",
    contactPerson: "Mike Johnson",
    email: "mike@globalsol.com",
    phone: "+1-555-0789",
    address: "789 Global Blvd, City, State 12345",
    creditLimit: 100000,
    isActive: true,
    createdAt: "2024-01-17",
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const filteredData = sampleData.filter(
    (customer) =>
      customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      // Handle delete logic here
      console.log("Delete customer:", id);
    }
  };

  const handleView = (customer: Customer) => {
    // Handle view logic here
    console.log("View customer:", customer);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Customers (M0108)
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Customer Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Contact Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Credit Limit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">
                    {customer.customerCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {customer.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {customer.contactPerson}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    ${customer.creditLimit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        customer.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {customer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(customer)}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Customer Code
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCustomer?.customerCode || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCustomer?.customerName || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCustomer?.contactPerson || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={editingCustomer?.email || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue={editingCustomer?.phone || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Credit Limit
                  </label>
                  <input
                    type="number"
                    defaultValue={editingCustomer?.creditLimit || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <textarea
                  defaultValue={editingCustomer?.address || ""}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  defaultChecked={editingCustomer?.isActive ?? true}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCustomer(null);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  {editingCustomer ? "Update" : "Add"} Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
