import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoanTypeTable from "@/components/tables/loan-management/LoanType";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Types",
  description: "Loan Types management page for Lending AI",
};

export default function LoanTypePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Types" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View loan types">
          <LoanTypeTable />
        </ComponentCard>
      </div>
    </div>
  );
}