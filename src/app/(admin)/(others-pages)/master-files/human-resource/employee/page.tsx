import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EmployeesTable from "@/components/tables/master-files/human-resource/Employee";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Management",
  description: "Employee Management page for Lending AI",
};

export default function EmployeeManagementPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Employee Management" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Employees">
          <EmployeesTable />
        </ComponentCard>
      </div>
    </div>
  );
}