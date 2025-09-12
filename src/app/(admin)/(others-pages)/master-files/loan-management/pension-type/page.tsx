import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PensionTypeTable from "@/components/tables/master-files/loan-management/PensionType";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pension Types",
  description: "Pension Types management page for Lending AI",
};

export default function PensionTypePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Pension Types" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View pension types">
          <PensionTypeTable/>
        </ComponentCard>
      </div>
    </div>
  );
}