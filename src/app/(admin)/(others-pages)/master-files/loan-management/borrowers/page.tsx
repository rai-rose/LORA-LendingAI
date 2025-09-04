import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BorrowersTable from "@/components/tables/loan-management/Borrowers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borrowers",
  description: "Borrowers management page for Lending AI",
};

export default function BorrowersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Borrowers" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Borrowers">
          <BorrowersTable />
        </ComponentCard>
      </div>
    </div>
  );
}