import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Purchase Transactions",
    description:
        "Purchase Transactions page for Lending AI",
  // other metadata
};

export default function PurchaseTransactions() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Transactions" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Purchase Transactions">
                    <BasicTableOne activeMenu="purchase-transactions" />
                </ComponentCard>
            </div>
        </div>
    );
}
