import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Stock Transactions",
    description:
        "Stock Transactions page for Lending AI",
  // other metadata
};

export default function StockTransactions() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Stock Transactions" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Stock Transactions">
                    <BasicTableOne activeMenu="stock-transactions" />
                </ComponentCard>
            </div>
        </div>
    );
}
