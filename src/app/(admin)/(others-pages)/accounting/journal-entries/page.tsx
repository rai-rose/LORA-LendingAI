import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Journal Entries",
    description:
        "Journal Entries page for Lending AI",
  // other metadata
};

export default function JournalEntries() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Journal Entries" />
            <div className="space-y-6">
                <ComponentCard title="Manage and View Journal Entries">
                    <BasicTableOne activeMenu="journal-entries" />
                </ComponentCard>
            </div>
        </div>
    );
}
