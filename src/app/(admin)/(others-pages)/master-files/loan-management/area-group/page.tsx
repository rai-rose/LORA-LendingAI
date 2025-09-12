import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AreaGroupTable from "@/components/tables/master-files/loan-management/AreaGroup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Group",
  description: "Area Group management page for Lending AI",
};

export default function AreaGroupPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Area Group" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Area Groups">
          <AreaGroupTable />
        </ComponentCard>
      </div>
    </div>
  );
}