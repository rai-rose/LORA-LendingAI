import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity Log",
  description: "Activity Log page.",
};

export default function ActivityLog() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Activity Log" />
      <div className="space-y-6">
        <ComponentCard title="Activity Log">
          <BasicTableOne activeMenu="activity-logs" />
        </ComponentCard>
      </div>
    </div>
  );
}