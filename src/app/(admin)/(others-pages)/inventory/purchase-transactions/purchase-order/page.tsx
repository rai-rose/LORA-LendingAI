import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Purchase Order",
    description:
        "Purchase Order page for Lending AI",
  // other metadata
};

export default function PurchaseOrder() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Order" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Purchase Order Entries">
                    <BasicTableOne activeMenu="purchase-order" />
                </ComponentCard>
            </div>
        </div>
    );
}
