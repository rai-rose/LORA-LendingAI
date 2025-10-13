"use client";

import React from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Master Files", href: "/master-files" },
  { label: "Accounting", href: "/master-files/accounting" },
];

export default function AccountingMasterFilesPage() {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <PageBreadCrumb items={breadcrumbItems} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Accounting Master Files
        </h2>
      </div>
      <BasicTableOne activeMenu="accounting" />
    </div>
  );
}
