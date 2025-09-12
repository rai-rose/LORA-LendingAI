import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ScheduleOfPaymentsTable from "@/components/tables/master-files/loan-management/SchedulePayments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule of Payments",
  description: "Schedule of Payments management page for Lending AI",
};

export default function Schedule() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Schedule of Payments" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View schedule of payments">
          <ScheduleOfPaymentsTable />
        </ComponentCard>
      </div>
    </div>
  );
}