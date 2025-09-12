import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Resource Management",
  description: "Human Resource Management page for Lending AI",
};

export default function HumanResourceManagement() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Human Resource Management" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Human Resource">
          <BasicTableOne activeMenu="human-resource" />
        </ComponentCard>
      </div>
    </div>
  );
}