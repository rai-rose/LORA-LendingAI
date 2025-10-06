import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PurchaseRequestReportsTable from "@/components/tables/reports/inventory-reports/purchase-request-reports/PurchaseRequestReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Request Reports",
  description: "Purchase Request Reports management page for Lending AI",
};

export default function LoanPurchaseRequestReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Purchase Request Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Purchase Request Reports">
          <PurchaseRequestReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}