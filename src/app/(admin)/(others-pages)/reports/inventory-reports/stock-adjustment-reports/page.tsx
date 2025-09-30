import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StockAdjustmentReportsTable from "@/components/tables/reports/inventory-reports/stock-adjustment-reports/StockAdjustmentReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Adjustment Reports",
  description: "Stock Adjustment Reports management page for Lending AI",
};

export default function LoanStockAdjustmentReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Stock Adjustment Reports" />
      <div className="space-y-6">
        <ComponentCard title="Manage and View Stock Adjustment Reports">
          <StockAdjustmentReportsTable />
        </ComponentCard>
      </div>
    </div>
  );
}