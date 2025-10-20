// ExcellentBorrowersTrack.tsx
"use client";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import Image from "next/image";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import dynamic from "next/dynamic";

const PhilippineMap = dynamic(() => import("./PhilippineMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
  ),
});

export default function ExcellentBorrowersTrack() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const repaymentData = [
    {
      name: "John Doe",
      city: "Manila",
      payments: 36,
      percentage: 98,
      profileImage: "/images/user/user-01.jpg",
    },
    {
      name: "Maria Santos",
      city: "Cebu",
      payments: 24,
      percentage: 95,
      profileImage: "/images/user/user-03.jpg",
    },
    {
      name: "Juan Cruz",
      city: "Davao",
      payments: 18,
      percentage: 90,
      profileImage: "/images/user/user-02.jpg",
    },
    {
      name: "Ana Reyes",
      city: "Quezon City",
      payments: 12,
      percentage: 85,
      profileImage: "/images/user/user-04.jpg",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Excellent Borrowers Track
          </h3>
          <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
            Top borrowers with outstanding loan repayment by Philippine city
          </p>
        </div>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 w-5 h-5" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-none"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 px-3 py-2"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 px-3 py-2"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="my-6 rounded-xl overflow-hidden">
        <PhilippineMap />
      </div>
      <div className="space-y-4">
        {repaymentData.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                <Image
                  src={data.profileImage}
                  alt={`${data.name} profile`}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-base dark:text-white/90">
                  {data.name}
                </p>
                <span className="block text-gray-500 text-sm dark:text-gray-400">
                  {data.city} • {data.payments} On-Time Payments
                </span>
              </div>
            </div>
            <div className="flex w-full max-w-[160px] items-center gap-4">
              <div className="relative block h-3 w-full max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-brand-500 transition-all duration-300"
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
              <p className="font-semibold text-gray-800 text-base dark:text-white/90">
                {data.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}