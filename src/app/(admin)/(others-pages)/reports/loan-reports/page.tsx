import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Reports",
  description: "Loan Reports Page for Lending AI",
};

export default function LoanReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Loan Reports">
          <BasicTableOne activeMenu="loan-reports" />
        </ComponentCard>
      </div>
    </div>
  );
}