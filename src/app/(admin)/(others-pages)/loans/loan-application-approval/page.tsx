import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Loan Application Approval",
  description:
    "Loan Application Approval page for TailAdmin",
  // other metadata
};

export default function LoanApplicationApproval() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Application Approval" />
      <div className="space-y-6">
        <ComponentCard title="Manage and Approve loan applications.">
          <BasicTableOne activeMenu="loan-application-approval" />
        </ComponentCard>
        {/* <Pagination  /> */}
      </div>
    </div>
  );
}
