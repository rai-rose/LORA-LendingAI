"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";

interface BasicTableOneProps {
  activeMenu:
    | "loan-application"
    | "loan-application-approval"
    | "loan-contract-list"
    | "payments"
    | "loan-management"
    | "user-settings"
    | "activity-logs"
    | "system";
}

// Lazy load each table (not loaded until needed)
const LoanApplicationTable = dynamic(() => import("./LoanApplication"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanApplicationApprovalTable = dynamic(
  () => import("./loanApplicationApproval"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const LoanContractListTable = dynamic(() => import("./LoanContractList"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PaymentsTable = dynamic(() => import("./Payments"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoanManagementTable = dynamic(() => import("./LoanManagement"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const UsersTable = dynamic(() => import("./UsersTable"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const ActivityLogsTable = dynamic(() => import("./ActivityLogsTable"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const SystemSettings = dynamic(() => import("./SystemSettings"), {
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