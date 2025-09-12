"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ActiveAccount from "./payments/BorrowersDetails";
import LoanDetailsPage from "./loan-application-approval/LoanDetails";

interface BasicTableOneProps {
  activeMenu:
    | "loan-application"
    | "loan-application-approval"
    | "loan-details"
    | "borrowers-details"
    | "loan-contract-list"
    | "payments"
    | "loan-management"
    | "user-settings"
    | "activity-logs"
    | "system";
}

// Lazy load each table (not loaded until needed)
const LoanApplicationTable = dynamic(() => import("./loan-application/LoanApplication"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanApplicationApprovalTable = dynamic(
  () => import("./loan-application-approval/loanApplicationApproval"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const LoanContractListTable = dynamic(() => import("./loan-contract-list/LoanContractList"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PaymentsTable = dynamic(() => import("./payments/Payments"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanManagementTable = dynamic(() => import("./loan-management/LoanManagement"), {
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
      {activeMenu === "loan-management" && <LoanManagementTable />}
      {activeMenu === "user-settings" && <UsersTable />}
      {activeMenu === "activity-logs" && <ActivityLogsTable />}
      {activeMenu === "system" && <SystemSettings />}

    </div>
  );
};

export default BasicTableOne;