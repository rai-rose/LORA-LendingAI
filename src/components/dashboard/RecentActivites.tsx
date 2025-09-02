"use client";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function RecentActivities() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Sample data for recent activities
  const activities = [
    {
      action: "New loan application submitted",
      user: "John Doe",
      time: "2 minutes ago",
    },
    {
      action: "Loan approved",
      user: "Jane Smith - $25,000",
      time: "15 minutes ago",
    },
    {
      action: "Payment received",
      user: "Robert Johnson - $1,200",
      time: "1 hour ago",
    },
    {
      action: "Document uploaded",
      user: "Sarah Wilson",
      time: "2 hours ago",
    },
    {
      action: "Credit check completed",
      user: "Michael Brown",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Activities
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Latest updates on loan applications and payments
          </p>
        </div>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {activity.action}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {activity.user}
                </span>
              </div>
            </div>
            <p className="font-medium text-gray-600 text-theme-xs dark:text-gray-300">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}