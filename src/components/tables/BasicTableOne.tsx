"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ActiveAccount from "./loans/payments/BorrowersDetails";
import PurchaseTransactions from "./inventory/purchase-transactions/PurchaseTransactions";
import StockTransactions from "./inventory/stock-transactions/StockTransactions";
import LoanDetailsPage from "./loans/loan-application-approval/LoanDetails";
import HumanResourceTable from "./master-files/human-resource/HumanResource";
import AccountingMasterFiles from "./master-files/accounting/Accounting";
import InventoryMasterFiles from "./master-files/inventory/Inventory";
import LoanReportsTable from "./reports/loan-reports/LoanReports";
import InventoryReportsList from "./reports/inventory-reports/InventoryReports";
import AccountingReportsList from "./reports/accounting-reports/AccountingReports";

interface BasicTableOneProps {
  activeMenu:
    | "loan-application"
    | "loan-application-approval"
    | "loan-details"
    | "borrowers-details"
    | "loan-contract-list"
    | "payments"
    | "purchase-transactions"
    | "purchase-request"
    | "purchase-order"
    | "stock-transactions"
    | "loan-management"
    | "inventory-management"
    | "accounting"
    | "inventory"
    | "human-resource"
    | "loan-reports"
    | "accounting-reports"
    | "inventory-reports"
    | "user-settings"
    | "activity-logs"
    | "system";
}

// Lazy load each table (not loaded until needed)
const LoanApplicationTable = dynamic(() => import("./loans/loan-application/LoanApplication"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanApplicationApprovalTable = dynamic(
  () => import("./loans/loan-application-approval/loanApplicationApproval"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const LoanContractListTable = dynamic(() => import("./loans/loan-contract-list/LoanContractList"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PaymentsTable = dynamic(() => import("./loans/payments/Payments"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PurchaseRequest = dynamic(() => import("./inventory/purchase-transactions/purchase-request/PurchaseRequest"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PurchaseOrder = dynamic(() => import("./inventory/purchase-transactions/purchase-order/PurchaseOrder"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanManagementTable = dynamic(() => import("./master-files/loan-management/LoanManagement"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const InventoryManagementTable = dynamic(() => import("./master-files/inventory-management/InventoryManagement"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const UsersTable = dynamic(() => import("./settings/UsersTable"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const ActivityLogsTable = dynamic(() => import("./settings/ActivityLogsTable"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const SystemSettings = dynamic(() => import("./settings/SystemSettings"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const BasicTableOne: React.FC<BasicTableOneProps> = ({ activeMenu }) => {
  return (
    <div className="w-full">
      {activeMenu === "loan-application" && <LoanApplicationTable />}
      {activeMenu === "loan-application-approval" && (
        <LoanApplicationApprovalTable />
      )}
      {activeMenu === "loan-details" && <LoanDetailsPage />} {/* No table wrapper */}
      {activeMenu === "borrowers-details" && <ActiveAccount />}
      {activeMenu === "loan-contract-list" && <LoanContractListTable />}
      {activeMenu === "payments" && <PaymentsTable />}
      {activeMenu === "purchase-transactions" && <PurchaseTransactions />}
      {activeMenu === "purchase-request" && <PurchaseRequest />}
      {activeMenu === "purchase-order" && <PurchaseOrder />}
      {activeMenu === "stock-transactions" && <StockTransactions />}
      {activeMenu === "loan-management" && <LoanManagementTable />}
      {activeMenu === "inventory-management" && <InventoryManagementTable />}
      {activeMenu === "accounting" && <AccountingMasterFiles />}
      {activeMenu === "inventory" && <InventoryMasterFiles />}
      {activeMenu === "human-resource" && <HumanResourceTable />}
      {activeMenu === "loan-reports" && <LoanReportsTable />}
      {activeMenu === "accounting-reports" && <AccountingReportsList />}
      {activeMenu === "inventory-reports" && <InventoryReportsList />}
      {activeMenu === "user-settings" && <UsersTable />}
      {activeMenu === "activity-logs" && <ActivityLogsTable />}
      {activeMenu === "system" && <SystemSettings />}

    </div>
  );
};

export default BasicTableOne;