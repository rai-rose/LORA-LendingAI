import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Contract List",
  description: "Loan Contract List Table page for Lending AI",
};

export default function LoanContractList() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Contract List" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View loan contracts">
          <BasicTableOne activeMenu="loan-contract-list" />
        </ComponentCard>
      </div>
    </div>
  );
}