import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ReceivingPOReportsTable from "@/components/tables/reports/inventory-reports/receiving-po-reports/ReceivingPOReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receiving P.O. Reports",
  description: "Receiving P.O. Reports management page for Lending AI",
};

export default function LoanReceivingPOReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Receiving P.O. Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Receiving P.O. Reports">
          <ReceivingPOReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}