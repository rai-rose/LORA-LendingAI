import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RequirementsTable from "@/components/tables/loan-management/Requirements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requirements",
  description: "Requirements management page for Lending AI",
};

export default function RequirementsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Requirements" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Requirements">
          <RequirementsTable />
        </ComponentCard>
      </div>
    </div>
  );
}