import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Purchase Request",
    description:
        "Purchase Request page for Lending AI",
  // other metadata
};

export default function PurchaseRequest() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Request" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Purchase Request Entries">
                    <BasicTableOne activeMenu="purchase-request" />
                </ComponentCard>
            </div>
        </div>
    );
}
