"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/tables/Pagination";

interface HumanResourceModule {
  id: number;
  code: string;
  module: string;
}

const humanResourceData: HumanResourceModule[] = [
  { id: 1, code: "M0901", module: "Employee" },
];

export default function HumanResourceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return humanResourceData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleModuleClick = (module: string) => {
    if (module === "Employee") {
      router.push("/master-files/human-resource/employee");
    } else {
      console.log("Navigating to module:", module);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["Code", "Module"].map((title) => (
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
                  paginatedData.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="px-5 py-4 text-gray-700 dark:text-white">
                        {loan.code}
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <button
                          onClick={() => handleModuleClick(loan.module)}
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline"
                        >
                          {loan.module}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-6">
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
        totalItems={humanResourceData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}