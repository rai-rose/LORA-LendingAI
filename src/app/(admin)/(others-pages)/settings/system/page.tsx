import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Settings",
  description: "System Settings Page",
};

export default function SystemSettings() {
  return (
    <div>
      <PageBreadcrumb pageTitle="System Settings" />
      <div className="space-y-6">
        <ComponentCard title="System Settings">
          <BasicTableOne activeMenu="system" />
        </ComponentCard>
      </div>
    </div>
  );
}