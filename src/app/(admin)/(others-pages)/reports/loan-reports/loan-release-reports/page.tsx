import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoanReleaseReportsTable from "@/components/tables/reports/loan-reports/loan-release-reports/LoanReleaseReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Release Reports",
  description: "Loan Release Reports management page for Lending AI",
};

export default function LoanReleaseReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Release Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Loan Release Reports">
          <LoanReleaseReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}