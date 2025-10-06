import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PurchaseOrdersReportsTable from "@/components/tables/reports/inventory-reports/purchase-orders-reports/PurchaseOrdersReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Orders Reports",
  description: "Purchase Orders Reports management page for Lending AI",
};

export default function LoanPurchaseOrdersReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Purchase Orders Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Purchase Orders Reports">
          <PurchaseOrdersReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}