import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Stock Issuance",
    description:
        "Stock Issuance page for Lending AI",
  // other metadata
};

export default function StockIssuance() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Stock Issuance" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Stock Issuance">
                    <BasicTableOne activeMenu="stock-issuance" />
                </ComponentCard>
            </div>
        </div>
    );
}
