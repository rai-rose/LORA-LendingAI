"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ActiveAccount from "./loans/payments/BorrowersDetails";
import PurchaseTransactions from "./inventory/purchase-transactions/PurchaseTransactions";
import StockTransactions from "./inventory/stock-transactions/StockTransactions";
import LoanDetailsPage from "./loans/loan-application-approval/LoanDetails";
import HumanResourceTable from "./master-files/human-resource/HumanResource";
import LoanReportsTable from "./reports/loan-reports/LoanReports";
import InventoryReportsList from "./reports/inventory-reports/InventoryReports";
import AccountingReportsList from "./reports/accounting-reports/AccountingReports";

interface BasicTableOneProps {
  activeMenu:
    | "journal-entries"
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
    | "stock-issuance"
    | "stock-adjustment"
    | "loan-management"
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
const JournalEntries = dynamic(() => import("./accounting/journal-entries/JournalEntries"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

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

const StockIssuance = dynamic(() => import("./inventory/stock-transactions/stock-issuance/StockIssuance"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const StockAdjustment = dynamic(() => import("./inventory/stock-transactions/stock-adjustment/StockAdjustment"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanManagementTable = dynamic(() => import("./master-files/loan-management/LoanManagement"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const AccountingMasterFiles = dynamic(() => import("./master-files/accounting/Accounting"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const InventoryMasterFiles = dynamic(() => import("./master-files/inventory/Inventory"), {
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
      {activeMenu === "journal-entries" && <JournalEntries />}
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
      {activeMenu === "stock-issuance" && <StockIssuance />}
      {activeMenu === "stock-adjustment" && <StockAdjustment />}
      {activeMenu === "loan-management" && <LoanManagementTable />}
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