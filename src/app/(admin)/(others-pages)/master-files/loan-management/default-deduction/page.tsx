import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DefaultDeductionTable from "@/components/tables/loan-management/DefaultDeduction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Deductions",
  description: "Loan Deductions management page for Lending AI",
};

export default function DefaultDeductionPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Deductions" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View loan deductions">
          <DefaultDeductionTable />
        </ComponentCard>
      </div>
    </div>
  );
}