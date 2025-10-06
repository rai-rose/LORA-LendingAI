import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import OtherInventoryReportsTable from "@/components/tables/reports/inventory-reports/other-inventory-reports/OtherInventoryReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Inventory Reports",
  description: "Other Inventory Reports management page for Lending AI",
};

export default function LoanOtherInventoryReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Other Inventory Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Other Inventory Reports">
          <OtherInventoryReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}