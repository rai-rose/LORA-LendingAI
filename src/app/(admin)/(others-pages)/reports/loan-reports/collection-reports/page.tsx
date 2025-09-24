import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CollectionReportsTable from "@/components/tables/reports/loan-reports/collection-reports/CollectionReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Collection Reports",
  description: "Loan Collection Reports management page for Lending AI",
};

export default function LoanCollectionReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Collection Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Loan Collection Reports">
          <CollectionReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}