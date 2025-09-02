"use client";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import Image from "next/image";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import PhilippineMap from "./PhilippineMap";

export default function ExcellentBorrowersTrack() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Sample data for borrowers with excellent repayment records
  const repaymentData = [
    {
      name: "John Doe",
      city: "Manila",
      payments: 36,
      percentage: 98,
      profileImage: "/images/profiles/john-doe.jpg",
    },
    {
      name: "Maria Santos",
      city: "Cebu",
      payments: 24,
      percentage: 95,
      profileImage: "/images/profiles/maria-santos.jpg",
    },
    {
      name: "Juan Cruz",
      city: "Davao",
      payments: 18,
      percentage: 90,
      profileImage: "/images/profiles/juan-cruz.jpg",
    },
    {
      name: "Ana Reyes",
      city: "Quezon City",
      payments: 12,
      percentage: 85,
      profileImage: "/images/profiles/ana-reyes.jpg",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Excellent Borrowers Track
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Top borrowers with outstanding loan repayment by Philippine city
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
      <div className="px-4 py-6 my-6 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <PhilippineMap />
        </div>
      </div>
      <div className="space-y-5">
        {repaymentData.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <Image
                  src={data.profileImage}
                  alt={`${data.name} profile`}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {data.name}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {data.city} • {data.payments} On-Time Payments
                </span>
              </div>
            </div>
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {data.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}