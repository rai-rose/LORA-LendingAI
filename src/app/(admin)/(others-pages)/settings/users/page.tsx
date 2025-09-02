import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Users Management Page",
};

export default function Users() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Users Settings" />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <BasicTableOne activeMenu="user-settings" />
        </ComponentCard>
      </div>
    </div>
  );
}