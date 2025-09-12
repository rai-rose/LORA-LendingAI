import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Loan Details",
  description:
    "Loan Details page for Lending AI",
  // other metadata
};

export default function LoanDetails() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Application Details" />
      <div className="space-y-6">
        <ComponentCard title="Review and edit the loan type, client details, application details, and associated documents below.">
          <BasicTableOne activeMenu="loan-details" />
        </ComponentCard>
        {/* <Pagination  /> */}
      </div>
    </div>
  );
}
