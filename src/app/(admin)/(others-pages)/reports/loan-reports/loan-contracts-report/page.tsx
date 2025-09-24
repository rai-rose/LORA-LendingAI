import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoanContractsReportsTable from "@/components/tables/reports/loan-reports/loan-contracts-reports/LonContractsReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Contracts Reports",
  description: "Loan Contracts Reports management page for Lending AI",
};

export default function LoanContractsReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Contracts Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Loan Contracts Reports">
          <LoanContractsReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}