import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Contracts",
  description: "Loan Contracts",
};

export default function Payments() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Payments" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View payments  ">
          <BasicTableOne activeMenu="payments" />
        </ComponentCard>
      </div>
    </div>
  );
}