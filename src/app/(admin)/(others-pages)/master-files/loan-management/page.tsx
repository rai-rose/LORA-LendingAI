import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Management",
  description: "Loan Management page for Lending AI",
};

export default function LoanManagement() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Management" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View loan contracts">
          <BasicTableOne activeMenu="loan-management" />
        </ComponentCard>
      </div>
    </div>
  );
}