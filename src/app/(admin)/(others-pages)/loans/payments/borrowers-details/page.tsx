import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Loan Application Approval",
  description:
    "Loan Application Approval page for Lending AI",
  // other metadata
};

export default function BorrowersDetailsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Borrowers Details" />
      <div className="space-y-6">
        <ComponentCard title="Manage and Approve loan applications.">
          <BasicTableOne activeMenu="borrowers-details" />
        </ComponentCard>
        {/* <Pagination  /> */}
      </div>
    </div>
  );
}
