import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TransactionTypeTable from "@/components/tables/loan-management/TransactionType";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Types",
  description: "Transaction Types management page for Lending AI",
};

export default function TransactionTypePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Transaction Types" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View transaction types">
          <TransactionTypeTable />
        </ComponentCard>
      </div>
    </div>
  );
}