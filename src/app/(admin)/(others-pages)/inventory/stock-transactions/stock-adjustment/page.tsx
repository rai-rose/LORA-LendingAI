import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Stock Adjustment",
    description:
        "Stock Adjustment page for Lending AI",
  // other metadata
};

export default function StockAdjustment() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Stock Adjustment" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Stock Adjustment">
                    <BasicTableOne activeMenu="stock-adjustment" />
                </ComponentCard>
            </div>
        </div>
    );
}
