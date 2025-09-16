"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "@/components/form/Label";
import Image from "next/image";
import { ArrowLeft, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddPaymentModal from "@/components/ui/modal/AddPaymentModal";
import DetailedAnalysisV1Modal from "@/components/ui/modal/DetailedAnalysisV1Modal";
import DetailedAnalysisV2Modal from "@/components/ui/modal/DetailedAnalysisV2Modal";
import UpdateContractModal from "@/components/ui/modal/UpdateContractModal";
import ApplyOtherLoansModal from "@/components/ui/modal/ApplyOtherLoansModal";
import CloseAccountModal from "@/components/ui/modal/CloseAccountModal";

export default function BorrowersDetailsTable() {
  const router = useRouter();
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isAnalysisV1Open, setIsAnalysisV1Open] = useState(false);
  const [isAnalysisV2Open, setIsAnalysisV2Open] = useState(false);
  const [isUpdateContractOpen, setIsUpdateContractOpen] = useState(false);
  const [isApplyLoansOpen, setIsApplyLoansOpen] = useState(false);
  const [isCloseAccountOpen, setIsCloseAccountOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "John Doe",
    loanId: "N/A",
    email: "N/A",
    contactNo: "N/A",
    address: "Aloguinsan, Cebu",
    contractNo: "DUM-AL-000001",
    contractDate: "2010-10-01",
    interestType: "Straight 5",
    firstDue: "2010-11-30",
    maturityDue: "2010-11-30",
    paymentSchedule: "Monthly",
    allottees: "LOANS RECEIVABLE-ALLOTMENT (1013-09)",
    principalLoan: "36,500.00",
    unearnedInterestRate: "2.50",
    terms: "2",
    amortization: "36,500.00",
    landlineNo: "N/A",
    status: "Active",
    remarks: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const transactions = [
    {
      trxDate: "2010-10-01",
      time: "12:00 AM",
      description: "LOAN BALANCE",
      orNo: "",
      arNo: "",
      principal: "36,500.00",
      interest: "912.50",
      tax: "0",
      loanCharge: "36,500.00",
      loanPayment: "0.00",
      penaltyPay: "0",
      lineTotal: "36,500.00",
      principalBal: "36,500.00",
      unearnedIntBal: "912.50",
      outstandingBal: "36,500.00",
      withdrawnBal: "0.00",
      bankBalance: "0.00",
    },
  ];

  const handleAddPayment = () => {
    setIsAddPaymentOpen(true);
  };

  const handleDetailedV1 = () => {
    setIsAnalysisV1Open(true);
  };

  const handleDetailedV2 = () => {
    setIsAnalysisV2Open(true);
  };

  const handleUpdateContract = () => {
    setIsUpdateContractOpen(true);
  };

  const handleApplyLoans = () => {
    setIsApplyLoansOpen(true);
  };

  const handleCloseAccount = () => {
    setIsCloseAccountOpen(true);
  };

  const handleBack = () => {
    router.push("/loans/payments");
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 sm:mt-0">
          <button
            onClick={handleDetailedV1}
            className="w-full sm:w-auto px-3 py-1.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Detailed Analysis V1
          </button>
          <button
            onClick={handleDetailedV2}
            className="w-full sm:w-auto px-3 py-1.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Detailed Analysis V2
          </button>
          <button
            onClick={handleUpdateContract}
            className="w-full sm:w-auto px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Update Contract
          </button>
          <button
            onClick={handleApplyLoans}
            className="w-full sm:w-auto px-3 py-1.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Apply Other Loans
          </button>
          <button
            onClick={handleCloseAccount}
            className="w-full sm:w-auto px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          >
            Close Account
          </button>
        </div>
      </div>

      {/* Client Info Card */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-sm">
              <Image
                width={80}
                height={80}
                src="/placeholder.svg?height=80&width=80"
                alt="Client profile"
                className="object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white uppercase">
                {formData.clientName}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {formData.loanId}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {formData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 gap-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contract No.:</span>{" "}
              <span className="font-bold text-blue-500 text-xl">{formData.contractNo}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Allottees:</span>{" "}
              <span className="font-bold text-blue-500">{formData.allottees}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Address:</span> {formData.address}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Email:</span> {formData.email}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contact No.:</span> {formData.contactNo}
            </p>
          </div>

          {/* Contract Info */}
          <div className="grid grid-cols-1 gap-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contract Date:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-blue-500">{formData.contractDate}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Interest Type:</span> {formData.interestType}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">First Due:</span> {formData.firstDue}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Maturity Due:</span>{" "}
              <span className="font-bold text-red-600 dark:text-red-400">{formData.maturityDue}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Landline No.:</span> {formData.landlineNo}
            </p>
          </div>

          {/* Financial Info */}
          <div className="grid grid-cols-1 gap-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Principal Loan:</span>{" "}
              <span className="font-bold text-lg text-gray-600 dark:text-white">₱{formData.principalLoan}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Unearned Interest Rate:</span>{" "}
              {formData.unearnedInterestRate}%
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Terms:</span> {formData.terms}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Payment Schedule:</span>{" "}
              <span className="font-bold">{formData.paymentSchedule}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium text-green-600 dark:text-green-400">Amortization:</span>{" "}
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">₱{formData.amortization}</span>
            </p>
            <div className="col-span-2">
              <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Remarks</Label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex justify-end mb-3">
          <button
            onClick={handleAddPayment}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            aria-label="Add Payment"
          >
            <Plus className="h-4 w-4" />
            Add Payment
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-700">
                <TableRow>
                  {[
                    "Trx Date",
                    "Time",
                    "Description",
                    "OR No.",
                    "AR No.",
                    "Principal",
                    "Interest",
                    "Tax",
                    "Loan Charge",
                    "Loan Payment",
                    "Penalty Pay",
                    "Line Total",
                    "Principal Balance",
                    "Unearned Interest Balance",
                    "Run Outstanding Balance",
                    "Withdraw",
                    "Bank Balance",
                  ].map((title) => (
                    <TableCell
                      key={title}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((tx, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-900 dark:text-white text-xs">{tx.trxDate}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{tx.time}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{tx.description}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{tx.orNo}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{tx.arNo}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.principal}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.interest}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.tax}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.loanCharge}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.loanPayment}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.penaltyPay}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-white text-right font-bold text-sm">{tx.lineTotal}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.principalBal}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.unearnedIntBal}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.outstandingBal}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.withdrawnBal}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right text-xs">{tx.bankBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        onSave={() => {
          setIsAddPaymentOpen(false);
          // Add save logic here
        }}
      />
      <DetailedAnalysisV1Modal
        isOpen={isAnalysisV1Open}
        onClose={() => setIsAnalysisV1Open(false)}
        onSave={() => {
          setIsAnalysisV1Open(false);
          // Add save logic here
        }}
      />
      <DetailedAnalysisV2Modal
        isOpen={isAnalysisV2Open}
        onClose={() => setIsAnalysisV2Open(false)}
        onSave={() => {
          setIsAnalysisV2Open(false);
          // Add save logic here
        }}
      />
      <UpdateContractModal
        isOpen={isUpdateContractOpen}
        onClose={() => setIsUpdateContractOpen(false)}
        onSave={() => {
          setIsUpdateContractOpen(false);
          // Add save logic here
        }}
      />
      <ApplyOtherLoansModal
        isOpen={isApplyLoansOpen}
        onClose={() => setIsApplyLoansOpen(false)}
        onSave={() => {
          setIsApplyLoansOpen(false);
          // Add save logic here
        }}
      />
      <CloseAccountModal
        isOpen={isCloseAccountOpen}
        onClose={() => setIsCloseAccountOpen(false)}
        onSave={() => {
          setIsCloseAccountOpen(false);
          // Add save logic here
        }}
      />
    </div>
  );
}