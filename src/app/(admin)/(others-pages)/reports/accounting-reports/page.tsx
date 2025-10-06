import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounting Reports",
  description: "Accounting Reports Page for Lending AI",
};

export default function AccountingReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Accounting Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Accounting Reports">
          <BasicTableOne activeMenu="accounting-reports" />
        </ComponentCard>
      </div>
    </div>
  );
}