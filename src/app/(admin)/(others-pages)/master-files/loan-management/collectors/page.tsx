import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CollectorsTable from "@/components/tables/master-files/loan-management/Collectors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collectors",
  description: "Collectors management page for Lending AI",
};

export default function Collector() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Collectors" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Collectors">
          <CollectorsTable />
        </ComponentCard>
      </div>
    </div>
  );
}