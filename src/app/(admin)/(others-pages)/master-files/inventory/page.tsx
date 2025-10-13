import React from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Inventory Management page for Lending AI",
};

export default function InventoryMasterFilesPage() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Inventory" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Inventory">
          <BasicTableOne activeMenu="inventory" />
        </ComponentCard>
      </div>
    </div>
  );
}
