import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import JournalEntryReportsTable from "@/components/tables/reports/accounting-reports/journal-entry-reports/JournalEntryReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal Entry Reports",
  description: "Journal Entry Reports management page for Lending AI",
};

export default function LoanJournalEntryReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Journal Entry Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Journal Entry Reports">
          <JournalEntryReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}