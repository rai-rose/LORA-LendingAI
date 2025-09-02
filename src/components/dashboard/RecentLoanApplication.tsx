"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Ellipsis, Plus, Eye, Check, X } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState } from "react";

// Define the TypeScript interface for the table rows
interface LoanApplication {
  id: number;
  applicantName: string;
  loanType: string;
  amount: string;
  creditScore: number;
  status: "Approved" | "Pending" | "Rejected";
  dateApplied: string;
}

// Define the table data using the interface
const tableData: LoanApplication[] = [
  {
    id: 1,
    applicantName: "John Doe",
    loanType: "Personal",
    amount: "$10,000",
    creditScore: 720,
    status: "Approved",
    dateApplied: "2025-07-20",
  },
  {
    id: 2,
    applicantName: "Jane Smith",
    loanType: "Mortgage",
    amount: "$250,000",
    creditScore: 680,
    status: "Pending",
    dateApplied: "2025-07-22",
  },
  {
    id: 3,
    applicantName: "Alice Johnson",
    loanType: "Auto",
    amount: "$25,000",
    creditScore: 650,
    status: "Rejected",
    dateApplied: "2025-07-25",
  },
  {
    id: 4,
    applicantName: "Bob Wilson",
    loanType: "Business",
    amount: "$50,000",
    creditScore: 700,
    status: "Pending",
    dateApplied: "2025-07-28",
  },
  {
    id: 5,
    applicantName: "Emma Brown",
    loanType: "Personal",
    amount: "$5,000",
    creditScore: 740,
    status: "Approved",
    dateApplied: "2025-07-30",
  },
];

export default function RecentLoanApplications() {
  // State to manage dropdown open/close for each row
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Toggle dropdown for a specific row
  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
            Recent Loan Applications
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors duration-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            New Application
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-200 dark:border-gray-700 border-y">
            <TableRow className="hover:bg-transparent">
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[20%]"
              >
                Applicant Name
              </TableCell>
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[15%]"
              >
                Loan Type
              </TableCell>
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[15%]"
              >
                Amount
              </TableCell>
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[15%]"
              >
                Credit Score
              </TableCell>
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[15%]"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[15%]"
              >
                Date Applied
              </TableCell>
              <TableCell
                isHeader
                className="py-4 px-4 font-semibold text-gray-600 text-start text-xs dark:text-gray-300 w-[10%]"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((application) => (
              <TableRow
                key={application.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
              >
                <TableCell className="py-4 px-4 text-gray-800 text-sm font-medium dark:text-white/90">
                  {application.applicantName}
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">
                  {application.loanType}
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">
                  {application.amount}
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">
                  {application.creditScore}
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">
                  <Badge
                    size="sm"
                    color={
                      application.status === "Approved"
                        ? "success"
                        : application.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                    className="px-3 py-1"
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">
                  {application.dateApplied}
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm dark:text-gray-300">
                  <div className="relative">
                    <button
                      className="dropdown-toggle focus:outline-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
                      onClick={() => toggleDropdown(application.id)}
                    >
                      <Ellipsis className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === application.id}
                      onClose={() => setOpenDropdownId(null)}
                      className="w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    >
                      <DropdownItem
                        className="text-black hover:text-blue-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownItem>
                      <DropdownItem
                        className="text-green-600 hover:text-green-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </DropdownItem>
                      <DropdownItem
                        className="text-red-600 hover:text-red-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-3 px-4 py-2.5"
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}