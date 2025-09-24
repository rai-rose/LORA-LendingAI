import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CollateralReportsTable from "@/components/tables/reports/loan-reports/collateral-reports/CollateralReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Collateral Reports",
  description: "Loan Collateral Reports management page for Lending AI",
};

export default function LoanCollateralReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Collateral Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Loan Collateral Reports">
          <CollateralReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}