import React from "react";
import { FiEye, FiEdit, FiCheckCircle } from "react-icons/fi";
import { LiaTimesCircle } from "react-icons/lia";

export interface LoanType {
  id: number;
  code: string;
  description: string;
  format: string;
  series: string;
}

export const loanData: LoanType[] = [
  { id: 1, code: "BAC-AL", description: "Additional Loan", format: "BAC-AL-{0:0000000}", series: "7" },
  { id: 2, code: "BAC-EL", description: "Extension Loan", format: "BAC-EL-{0:0000000}", series: "23" },
  { id: 3, code: "BAC-LL", description: "Liquidation Loan", format: "BAC-LL-{0:0000000}", series: "46" },
  { id: 4, code: "BAC-NL", description: "New Loan", format: "BAC-NL-{0:0000000}", series: "15" },
  { id: 5, code: "BAC-RL", description: "ReLoan", format: "BAC-RL-{0:0000000}", series: "97" },
  { id: 6, code: "BAC-XB", description: "Bonus Loan", format: "BAC-XB-{0:0000000}", series: "19" },
  { id: 7, code: "BUT-AL", description: "Additional Loan", format: "BUT-AL-{0:0000000}", series: "6" },
  { id: 8, code: "BUT-EL", description: "Extension Loan", format: "BUT-EL-{0:0000000}", series: "23" },
  { id: 9, code: "BUT-LL", description: "Liquidation Loan", format: "BUT-LL-{0:0000000}", series: "67" },
  { id: 10, code: "BUT-NL", description: "New Loan", format: "BUT-NL-{0:0000000}", series: "34" },
  { id: 11, code: "BUT-RL", description: "ReLoan", format: "BUT-RL-{0:0000000}", series: "59" },
  { id: 12, code: "BUT-XB", description: "Bonus Loan", format: "BUT-XB-{0:0000000}", series: "11" },
  { id: 13, code: "CAG-AL", description: "Additional Loan", format: "CAG-AL-{0:0000000}", series: "17" },
  { id: 14, code: "CAG-EL", description: "Extension Loan", format: "CAG-EL-{0:0000000}", series: "47" },
  { id: 15, code: "CAG-LL", description: "Liquidation Loan", format: "CAG-LL-{0:0000000}", series: "27" },
  { id: 16, code: "CAG-NL", description: "New Loan", format: "CAG-NL-{0:0000000}", series: "29" },
  { id: 17, code: "CAG-RL", description: "ReLoan", format: "CAG-RL-{0:0000000}", series: "28" },
  { id: 18, code: "CAG-XB", description: "Bonus Loan", format: "CAG-XB-{0:0000000}", series: "8" },
  { id: 19, code: "DAV-AL", description: "Additional Loan", format: "DAV-AL-{0:0000000}", series: "9" },
  { id: 20, code: "DAV-EL", description: "Extension Loan", format: "DAV-EL-{0:0000000}", series: "90" },
  { id: 21, code: "DAV-LL", description: "Liquidation Loan", format: "DAV-LL-{0:0000000}", series: "78" },
  { id: 22, code: "DAV-NL", description: "New Loan", format: "DAV-NL-{0:0000000}", series: "30" },
  { id: 23, code: "DAV-RL", description: "ReLoan", format: "DAV-RL-{0:0000000}", series: "33" },
];

export interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  interestRate?: string;
  loanType: string;
  subclass: string;
  loanId: string;
  appliedOn: string;
  approvedDate: string;
  loanApplied: boolean;
  status: string;
  riskScore: number;
  approvalProbability: string;
  actions?: React.ReactNode;
  contractNumber?: string;
  contractDate?: string;
  interestBalance?: string;
  principalBalance?: string;
  occurrence?: string;
  firstDueDate?: string;
  dueDate?: string;
}

export interface PurchaseRequest {
  id: number;
  prNumber: string;
  poNumber: string;
  referenceNumber: string;
  prDate: string;
  dateNeeded: string;
  recipient: {
    image: string;
    name: string;
    role: string;
  };
  status: string;
  requestedBy: string;
  transactionDate: string;
  transactionTime: string;
  costCenter: string;
  subCostCenter: string;
}

export interface PurchaseOrder {
  id: number;
  poNumber: string;
  status: string;
  supplier: string;
  referenceNumber: string;
  prNumber: string;
  expectedOn: string;
  requestedOn: string;
  finalizedOn: string;
  finalizedTime: string;
  finalizedBy: string;
  approvedOn: string;
}

export interface StockIssuance {
  id: number;
  issNumber: string;
  description: string;
  adjDate: string;
  location: string;
  status: string;
  jrnlz: string;
  userId: string;
  date: string;
  time: string;
  locCode: string;
  costCenter: string;
}

export interface StockAdjustment {
  id: number;
  adjNumber: string;
  description: string;
  adjDate: string;
  location: string;
  user: {
    image: string;
    name: string;
    role: string;
  };
  updatedDate: string;
  updatedTime: string;
  jrnlz: string;
  status: string;
  approvedBy: string;
  approvedDate: string;
}

export interface JournalEntries {
  id: number;
  refNumber: string;
  date: string;
  description: string;
  paidTo: string;
  check: string;
  checkDate: string;
  userId: string;
  branch: string;
  branchId: string;
  systemDate: string;
  systemTime: string;
  status: string;
  finalizedBy: string;
  finalizedDate: string;
}

export const journalEntriesData: JournalEntries[] = [
  {
    id: 1,
    refNumber: "JE-3001",
    date: "2023-07-01",
    description: "Journal Entry for July",
    paidTo: "Supplier A",
    check: "CHK-1001",
    checkDate: "2023-07-05",
    userId: "U-1001",
    branch: "Main Branch",
    branchId: "B-001",
    systemDate: "2023-07-01",
    systemTime: "10:30 AM",
    status: "Finalized",
    finalizedBy: "Alice Johnson",
    finalizedDate: "2023-07-06",
  },
  {
    id: 2,
    refNumber: "JE-3002",
    date: "2023-07-02",
    description: "Journal Entry for August",
    paidTo: "Supplier B",
    check: "CHK-1002",
    checkDate: "2023-07-06",
    userId: "U-1002",
    branch: "Secondary Branch",
    branchId: "B-002",
    systemDate: "2023-07-02",
    systemTime: "11:00 AM",
    status: "Cancelled",
    finalizedBy: "-",
    finalizedDate: "-",
  },
];

export const purchaseRequestData: PurchaseRequest[] = [
  {
    id: 1,
    prNumber: "PR-1001",
    poNumber: "PO-2001",
    referenceNumber: "REF-3001",
    prDate: "2023-07-01",
    dateNeeded: "2024-07-10",
    recipient: {
      image: "/images/user/user-19.jpg",
      name: "John Doe",
      role: "Developer",
    },
    status: "Cancelled",
    requestedBy: "-",
    transactionDate: "2025-07-01",
    transactionTime: "10:30 AM",
    costCenter: "Marketing",
    subCostCenter: "Digital Marketing",
  },
  {
    id: 2,
    prNumber: "PR-1002",
    poNumber: "PO-2102",
    referenceNumber: "REF-3023",
    prDate: "2023-07-01",
    dateNeeded: "2025-07-10",
    recipient: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    status: "Active",
    requestedBy: "-",
    transactionDate: "2023-07-01",
    transactionTime: "10:30 AM",
    costCenter: "Marketing",
    subCostCenter: "Digital Marketing",
  }
];

export const purchaseOrderData: PurchaseOrder[] = [
  {
    id: 1,
    poNumber: "PO-2001",
    status: "Printed",
    supplier: "Supplier A",
    referenceNumber: "REF-3001",
    prNumber: "PR-1001",
    expectedOn: "2023-07-15",
    requestedOn: "2023-07-01",
    finalizedOn: "-",
    finalizedTime: "-",
    finalizedBy: "Alice Johnson",
    approvedOn: "-",
  },
  {
    id: 2,
    poNumber: "PO-2002",
    status: "Approved",
    supplier: "Supplier B",
    referenceNumber: "REF-3002",
    prNumber: "PR-1002",
    expectedOn: "2023-09-15",
    requestedOn: "2023-05-01",
    finalizedOn: "2023-10-05",
    finalizedTime: "01:00 PM",
    finalizedBy: "Alice Johnson",
    approvedOn: "2023-10-06",
  },
  {
    id: 3,
    poNumber: "PO-2023",
    status: "Finalized",
    supplier: "Supplier C",
    referenceNumber: "REF-3003",
    prNumber: "PR-1003",
    expectedOn: "2023-07-15",
    requestedOn: "2023-07-01",
    finalizedOn: "2023-07-05",
    finalizedTime: "02:00 PM",
    finalizedBy: "Alice Johnson",
    approvedOn: "-",
  }
];

export const stockIssuanceData: StockIssuance[] = [
  {
    id: 1,
    issNumber: "ISS-5001",
    description: "Issuance for Project A",
    adjDate: "2023-07-01",
    location: "Warehouse 1",
    status: "Cancelled",
    jrnlz: "Yes",
    userId: "U-1001",
    date: "2023-07-01",
    time: "10:30 AM",
    locCode: "LOC-001",
    costCenter: "Marketing",
  },
];

export const stockAdjustmentData: StockAdjustment[] = [
  {
    id: 1,
    adjNumber: "ADJ-6001",
    description: "Adjustment for Inventory A",
    adjDate: "2023-07-01",
    location: "Warehouse 1",
    user: {
      image: "/images/user/user-19.jpg",
      name: "John Doe",
      role: "Developer",
    },
    updatedDate: "2023-07-02",
    updatedTime: "11:00 AM",
    jrnlz: "Yes",
    status: "Approved",
    approvedBy: "Alice Johnson",
    approvedDate: "-",
  },
];

export const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    interestRate: "5.5%",
    loanType: "Personal Loan",
    subclass: "Unsecured",
    loanId: "LN-1001",
    contractNumber: "CN-1001",
    contractDate: "2025-07-05",
    appliedOn: "2025-07-01",
    approvedDate: "2025-07-05",
    loanApplied: true,
    interestBalance: "$500.00",
    principalBalance: "$10,000.00",
    occurrence: "Monthly",
    firstDueDate: "2025-08-05",
    dueDate: "2025-08-05",
    riskScore: 75,
    approvalProbability: "85%",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    interestRate: "6.0%",
    loanType: "Home Loan",
    subclass: "Fixed Rate",
    loanId: "LN-1002",
    contractNumber: "CN-1002",
    contractDate: "",
    appliedOn: "2025-06-15",
    approvedDate: "",
    loanApplied: false,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "",
    firstDueDate: "",
    dueDate: "",
    riskScore: 80,
    approvalProbability: "90%",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "John Doe",
      role: "Developer",
    },
    interestRate: "4.8%",
    loanType: "Auto Loan",
    subclass: "Secured",
    loanId: "LN-1003",
    contractNumber: "CN-1003",
    contractDate: "2025-05-15",
    appliedOn: "2025-05-10",
    approvedDate: "2025-05-15",
    loanApplied: true,
    interestBalance: "$300.00",
    principalBalance: "$15,000.00",
    occurrence: "Monthly",
    firstDueDate: "2025-06-15",
    dueDate: "2025-08-03",
    riskScore: 70,
    approvalProbability: "80%",
    status: "3 Days Before Due",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Jane Smith",
      role: "Manager",
    },
    interestRate: "7.0%",
    loanType: "Business Loan",
    subclass: "Unsecured",
    loanId: "LN-1004",
    contractNumber: "CN-1004",
    contractDate: "",
    appliedOn: "2025-04-01",
    approvedDate: "",
    loanApplied: false,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "",
    firstDueDate: "",
    dueDate: "",
    riskScore: 65,
    approvalProbability: "75%",
    status: "Documentary Not Accepted",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Alice Johnson",
      role: "Analyst",
    },
    interestRate: "5.0%",
    loanType: "Personal Loan",
    subclass: "Unsecured",
    loanId: "LN-1005",
    contractNumber: "CN-1005",
    contractDate: "2025-07-12",
    appliedOn: "2025-07-10",
    approvedDate: "2025-07-12",
    loanApplied: true,
    interestBalance: "$400.00",
    principalBalance: "$8,000.00",
    occurrence: "Monthly",
    firstDueDate: "2025-08-12",
    dueDate: "2025-08-01",
    riskScore: 60,
    approvalProbability: "70%",
    status: "Today's Due",
  },
  {
    id: 6,
    user: {
      image: "/images/user/user-22.jpg",
      name: "Bob Wilson",
      role: "Accountant",
    },
    interestRate: "6.5%",
    loanType: "Business Loan",
    subclass: "Secured",
    loanId: "LN-1006",
    contractNumber: "CN-1006",
    contractDate: "",
    appliedOn: "2025-03-15",
    approvedDate: "",
    loanApplied: false,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "",
    firstDueDate: "",
    dueDate: "",
    riskScore: 72,
    approvalProbability: "82%",
    status: "Recommended for Approval",
  },
  {
    id: 7,
    user: {
      image: "/images/user/user-23.jpg",
      name: "Emma Brown",
      role: "Marketing",
    },
    interestRate: "5.2%",
    loanType: "Personal Loan",
    subclass: "Unsecured",
    loanId: "LN-1007",
    contractNumber: "CN-1007",
    contractDate: "",
    appliedOn: "2025-02-20",
    approvedDate: "",
    loanApplied: false,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "",
    firstDueDate: "",
    dueDate: "",
    riskScore: 68,
    approvalProbability: "78%",
    status: "Documentary Accepted",
  },
  {
    id: 8,
    user: {
      image: "/images/user/user-24.jpg",
      name: "Michael Lee",
      role: "Engineer",
    },
    interestRate: "6.8%",
    loanType: "Home Loan",
    subclass: "Fixed Rate",
    loanId: "LN-1008",
    contractNumber: "CN-1008",
    contractDate: "",
    appliedOn: "2025-01-10",
    approvedDate: "",
    loanApplied: false,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "",
    firstDueDate: "",
    dueDate: "",
    riskScore: 62,
    approvalProbability: "73%",
    status: "Disapproved",
  },
  {
    id: 9,
    user: {
      image: "/images/user/user-25.jpg",
      name: "Sarah Davis",
      role: "Consultant",
    },
    interestRate: "5.7%",
    loanType: "Auto Loan",
    subclass: "Secured",
    loanId: "LN-1009",
    contractNumber: "CN-1009",
    contractDate: "2025-06-05",
    appliedOn: "2025-06-01",
    approvedDate: "2025-06-05",
    loanApplied: true,
    interestBalance: "$350.00",
    principalBalance: "$12,000.00",
    occurrence: "Monthly",
    firstDueDate: "2025-07-05",
    dueDate: "2025-07-15",
    riskScore: 77,
    approvalProbability: "88%",
    status: "Past Due",
  },
  {
    id: 10,
    user: {
      image: "/images/user/user-26.jpg",
      name: "Tom Clark",
      role: "Sales",
    },
    interestRate: "6.2%",
    loanType: "Personal Loan",
    subclass: "Unsecured",
    loanId: "LN-1010",
    contractNumber: "CN-1010",
    contractDate: "2025-05-25",
    appliedOn: "2025-05-20",
    approvedDate: "2025-05-25",
    loanApplied: true,
    interestBalance: "$600.00",
    principalBalance: "$9,000.00",
    occurrence: "Monthly",
    firstDueDate: "2025-06-25",
    dueDate: "2025-06-01",
    riskScore: 69,
    approvalProbability: "79%",
    status: "Overdue",
  },
  {
    id: 11,
    user: {
      image: "/images/user/user-27.jpg",
      name: "Laura Adams",
      role: "HR",
    },
    interestRate: "4.9%",
    loanType: "Auto Loan",
    subclass: "Secured",
    loanId: "LN-1011",
    contractNumber: "CN-1011",
    contractDate: "2025-04-20",
    appliedOn: "2025-04-15",
    approvedDate: "2025-04-20",
    loanApplied: true,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "Monthly",
    firstDueDate: "2025-05-20",
    dueDate: "2025-08-20",
    riskScore: 71,
    approvalProbability: "81%",
    status: "Closed Account",
  },
  {
    id: 12,
    user: {
      image: "/images/user/user-28.jpg",
      name: "David Miller",
      role: "Manager",
    },
    interestRate: "7.1%",
    loanType: "Business Loan",
    subclass: "Unsecured",
    loanId: "LN-1012",
    contractNumber: "CN-1012",
    contractDate: "2025-03-05",
    appliedOn: "2025-03-01",
    approvedDate: "2025-03-05",
    loanApplied: true,
    interestBalance: "$0.00",
    principalBalance: "$0.00",
    occurrence: "Monthly",
    firstDueDate: "2025-04-05",
    dueDate: "2025-08-05",
    riskScore: 64,
    approvalProbability: "74%",
    status: "Deceased",
  },
];

export const getActions = (status: string, table: string) => {
  const commonActions = (
    <div className="flex items-center gap-3">
      <button
        title="View"
        className="text-blue-500 hover:text-blue-600 transition-colors"
      >
        <FiEye className="w-5 h-5" />
      </button>
      {status !== "Approved" &&
        status !== "Disapproved" &&
        status !== "Cash/Check Released/Transaction Done" &&
        status !== "Closed Account" &&
        status !== "Deceased" && (
          <button
            title="Edit"
            className="text-yellow-500 hover:text-yellow-600 transition-colors"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        )}
    </div>
  );

  if (table === "loan-application" || table === "loan-application-approval") {
    if (
      status === "Pending" ||
      status === "Recommended for Approval" ||
      status === "Documentary Accepted" ||
      status === "Documentary Not Accepted"
    ) {
      return (
        <div className="flex items-center gap-3">
          {commonActions}
          <button
            title="Approve"
            className="text-green-500 hover:text-green-600 transition-colors"
          >
            <FiCheckCircle className="w-5 h-5" />
          </button>
          <button
            title="Reject"
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            <LiaTimesCircle className="w-5 h-5" />
          </button>
        </div>
      );
    }
    return commonActions;
  }

  if (table === "loan-contract-list" || table === "payments") {
    if (
      status === "Active" ||
      status === "Overdue" ||
      status === "3 Days Before Due" ||
      status === "Today's Due" ||
      status === "Past Due"
    ) {
      return (
        <div className="flex items-center gap-3">
          <button
            title="View"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <FiEye className="w-5 h-5" />
          </button>
          <button
            title="Edit"
            className="text-yellow-500 hover:text-yellow-600 transition-colors"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <button
          title="View"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return commonActions;
};