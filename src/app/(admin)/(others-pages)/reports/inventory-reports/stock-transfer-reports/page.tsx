import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StockTransferReportsTable from "@/components/tables/reports/inventory-reports/stock-transfer-reports/StockTransferReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Transfer Reports",
  description: "Stock Transfer Reports management page for Lending AI",
};

export default function LoanStockTransferReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Stock Transfer Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Stock Transfer Reports">
          <StockTransferReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}