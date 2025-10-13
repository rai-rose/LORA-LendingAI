"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Package, Database, Users2, ArrowRight } from "lucide-react";

const masterFileCategories = [
  {
    title: "Accounting",
    description: "Manage chart of accounts, customers, suppliers, and accounting periods",
    icon: <Calculator className="h-8 w-8 text-blue-600" />,
    href: "/master-files/accounting",
    modules: ["Main Accounts", "Sub Accounts", "Customers", "Suppliers", "Banks"],
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Inventory",
    description: "Manage brands, items, categories, suppliers, and stock locations",
    icon: <Package className="h-8 w-8 text-green-600" />,
    href: "/master-files/inventory",
    modules: ["Brand Name", "Item Category", "Items", "Stock Locations", "Suppliers"],
    color: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Loan Management",
    description: "Manage loan types, borrowers, collectors, and loan configurations",
    icon: <Database className="h-8 w-8 text-purple-600" />,
    href: "/master-files/loan-management",
    modules: ["Loan Types", "Borrowers", "Collectors", "Requirements", "Collateral"],
    color: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Human Resource",
    description: "Manage employees, departments, and HR configurations",
    icon: <Users2 className="h-8 w-8 text-orange-600" />,
    href: "/master-files/human-resource",
    modules: ["Employees", "Departments", "Positions", "Pay Grades", "Benefits"],
    color: "bg-orange-50 dark:bg-orange-900/20",
  },
];

export default function MasterFilesPage() {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Master Files
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your system's master data including accounting, inventory, loans, and human resources.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {masterFileCategories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className="group block rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03] hover:border-primary"
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-lg p-3 ${category.color}`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white group-hover:text-primary">
                  {category.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Key Modules:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {category.modules.map((module, moduleIndex) => (
                      <span
                        key={moduleIndex}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform duration-200">
                  <span>View Details</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Accounting</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-black dark:text-white">13</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Modules</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-black dark:text-white">14</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Modules</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Loans</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-black dark:text-white">11</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Modules</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <Users2 className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">HR</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-black dark:text-white">5</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Modules</p>
        </div>
      </div>
    </div>
  );
}
