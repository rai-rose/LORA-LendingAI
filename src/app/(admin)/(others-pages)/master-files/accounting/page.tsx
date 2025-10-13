import React from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounting Management",
  description: "Accounting Management page for Lending AI",
};

export default function AccountingMasterFilesPage() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Accounting" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Accounting">
          <BasicTableOne activeMenu="accounting" />
        </ComponentCard>
      </div>
    </div>
  );
}
