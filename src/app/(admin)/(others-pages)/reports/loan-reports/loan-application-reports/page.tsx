import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoanApplicationReportsTable from "@/components/tables/reports/loan-reports/loan-application-reports/LoanApplicationReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Application Reports",
  description: "Loan Application Reports management page for Lending AI",
};

export default function LoanApplicationReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Application Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Loan Application Reports">
          <LoanApplicationReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}