import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Reports",
  description: "Inventory Reports Page for Lending AI",
};

export default function InventoryReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Inventory Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Inventory Reports">
          <BasicTableOne activeMenu="inventory-reports" />
        </ComponentCard>
      </div>
    </div>
  );
}