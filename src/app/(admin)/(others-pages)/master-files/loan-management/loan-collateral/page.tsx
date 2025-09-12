import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoanCollateralTable from "@/components/tables/master-files/loan-management/LoanCollateral";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Collaterals",
  description: "Loan Collaterals management page for Lending AI",
};

export default function LoanCollateralPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Loan Collaterals" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View loan collaterals">
          <LoanCollateralTable />
        </ComponentCard>
      </div>
    </div>
  );
}