import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import BarcodePrints from "@/components/tables/master-files/inventory-management/BarcodePrints";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Inventory Management page for Lending AI",
};

export default function InventoryManagement() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Inventory Management" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Inventory">
          <BasicTableOne activeMenu="inventory-management" />
        </ComponentCard>
      </div>
    </div>
  );
}