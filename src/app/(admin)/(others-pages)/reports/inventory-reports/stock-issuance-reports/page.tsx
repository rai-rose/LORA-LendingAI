import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StockIssuanceReportsTable from "@/components/tables/reports/inventory-reports/stock-issuance-reports/StockIssuanceReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Issuance Reports",
  description: "Stock Issuance Reports management page for Lending AI",
};

export default function LoanStockIssuanceReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Stock Issuance Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Stock Issuance Reports">
          <StockIssuanceReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}