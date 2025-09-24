import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BorrowersLedgerReportsTable from "@/components/tables/reports/loan-reports/borrower-ledger-reports/BorrowerLedgerReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borrowers Ledger Reports",
  description: "Borrowers Ledger Reports management page for Lending AI",
};

export default function LoanBorrowersLedgerReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Borrowers Ledger Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Borrowers Ledger Reports">
          <BorrowersLedgerReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}