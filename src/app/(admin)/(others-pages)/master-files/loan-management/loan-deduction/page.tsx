import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoanDeductionTable from "@/components/tables/master-files/loan-management/LoanDeduction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Deductions",
  description: "Loan Deductions management page for Lending AI",
};

export default function LoanDeductionPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Deductions" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View loan deductions">
          <LoanDeductionTable />
        </ComponentCard>
      </div>
    </div>
  );
}