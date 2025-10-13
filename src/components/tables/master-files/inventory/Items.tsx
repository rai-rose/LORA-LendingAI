"use client";

import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Package, Eye, Barcode } from "lucide-react";

interface Item {
  id: number;
  itemCode: string;
  itemName: string;
  brand: string;
  category: string;
  unit: string;
  unitPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  barcode: string;
  isActive: boolean;
  createdAt: string;
}

const sampleData: Item[] = [
  {
    id: 1,
    itemCode: "ITM001",
    itemName: "iPhone 15 Pro",
    brand: "Apple",
    category: "Mobile Phones",
    unit: "Piece",
    unitPrice: 999,
    stockQuantity: 25,
    minStockLevel: 5,
    barcode: "1234567890123",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    itemCode: "ITM002",
    itemName: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Mobile Phones",
    unit: "Piece",
    unitPrice: 899,
    stockQuantity: 18,
    minStockLevel: 5,
    barcode: "1234567890124",
    isActive: true,
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    itemCode: "ITM003",
    itemName: "Dell XPS 13",
    brand: "Dell",
    category: "Laptops",
    unit: "Piece",
    unitPrice: 1299,
    stockQuantity: 12,
    minStockLevel: 3,
    barcode: "1234567890125",
    isActive: true,
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    itemCode: "ITM004",
    itemName: "HP LaserJet Pro",
    brand: "HP",
    category: "Printers",
    unit: "Piece",
    unitPrice: 299,
    stockQuantity: 8,
    minStockLevel: 2,
    barcode: "1234567890126",
    isActive: true,
    createdAt: "2024-01-18",
  },
  {
    id: 5,
    itemCode: "ITM005",
    itemName: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    category: "Laptops",
    unit: "Piece",
    unitPrice: 1499,
    stockQuantity: 0,
    minStockLevel: 3,
    barcode: "1234567890127",
    isActive: false,
    createdAt: "2024-01-19",
  },
];

export default function Items() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const filteredData = sampleData.filter(
    (item) =>
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      // Handle delete logic here
      console.log("Delete item:", id);
    }
  };

  const handleView = (item: Item) => {
    // Handle view logic here
    console.log("View item:", item);
  };

  const handlePrintBarcode = (item: Item) => {
    // Handle barcode printing logic here
    console.log("Print barcode for item:", item);
  };

  const getStockStatus = (item: Item) => {
    if (item.stockQuantity === 0) {
      return { text: "Out of Stock", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" };
    } else if (item.stockQuantity <= item.minStockLevel) {
      return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" };
    } else {
      return { text: "In Stock", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Items (M0504)
          </h3>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search items..."
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
                  Item Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  Stock
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
              {filteredData.map((item) => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">
                      {item.itemCode}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {item.itemName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {item.brand}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      ${item.unitPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.stockQuantity}</span>
                        <span className="text-xs text-gray-500">Min: {item.minStockLevel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`rounded-full px-2 py-1 text-xs ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePrintBarcode(item)}
                          className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                          title="Print Barcode"
                        >
                          <Barcode className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Item Code
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.itemCode || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Item Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.itemName || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Brand
                  </label>
                  <select
                    defaultValue={editingItem?.brand || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Brand</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    defaultValue={editingItem?.category || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Printers">Printers</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Unit
                  </label>
                  <select
                    defaultValue={editingItem?.unit || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Unit</option>
                    <option value="Piece">Piece</option>
                    <option value="Box">Box</option>
                    <option value="Set">Set</option>
                    <option value="Pack">Pack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Unit Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingItem?.unitPrice || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue={editingItem?.stockQuantity || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Min Stock Level
                  </label>
                  <input
                    type="number"
                    defaultValue={editingItem?.minStockLevel || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Barcode
                  </label>
                  <input
                    type="text"
                    defaultValue={editingItem?.barcode || ""}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  defaultChecked={editingItem?.isActive ?? true}
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
                    setEditingItem(null);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  {editingItem ? "Update" : "Add"} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
