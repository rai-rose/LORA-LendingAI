import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ReceivingPOReportsTable from "@/components/tables/reports/inventory-reports/receiving-po-reports/ReceivingPOReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct Purchase Reports",
  description: "Direct Purchase Reports management page for Lending AI",
};

export default function LoanDirectPurchaseReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Direct Purchase Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Direct Purchase Reports">
          <ReceivingPOReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}