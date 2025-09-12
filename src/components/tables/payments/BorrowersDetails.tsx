"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Image from "next/image";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddPaymentModal from "@/components/ui/modal/AddPaymentModal";

export default function BorrowersDetailsTable() {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    status: "Active", // Added status property
  });

  const handleSave = () => {
    console.log("Saving changes...", formData);
    closeModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const transactions = [
    {
      trxDate: "2010-10-01",
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
      remarks: "",
    },
  ];

  const handleAddPayment = () => {
    setIsModalOpen(true);
  };

  const handleBack = () => {
    router.push("/loans/payments");
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Client Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
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
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white uppercase">
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
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contract No.:</span>{" "}
              <span className="font-bold text-blue-500 text-xl">{formData.contractNo}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Allottees:</span> {" "}
              <span className="font-bold text-blue-500">{formData.allottees}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Address:</span> {formData.address}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Email:</span> {formData.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contact No.:</span> {formData.contactNo}
            </p>
          </div>

          {/* Contract Info */}
          <div className="grid grid-cols-1 gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contract Date:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-blue-500">{formData.contractDate}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Interest Type:</span> {formData.interestType}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">First Due:</span> {formData.firstDue}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Maturity Due:</span>{" "}
              <span className="font-bold text-red-600 dark:text-red-400"> {formData.maturityDue}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Payment Schedule:</span> {" "}
              <span className="font-bold"> {formData.paymentSchedule}</span>
            </p>
          </div>

          {/* Financial Info */}
          <div className="grid grid-cols-1 gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Principal Loan:</span>{""}
              <span className="font-bold text-lg"> ₱{formData.principalLoan}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Unearned Interest Rate:</span>{" "}{formData.unearnedInterestRate}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Terms:</span> {formData.terms}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium   text-green-600 dark:text-green-400">Amortization:</span>{" "}
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">₱{formData.amortization}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Landline No.:</span> {formData.landlineNo}
            </p>
            <button
              onClick={openModal}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddPayment}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Add Payment"
        >
          <Plus className="h-5 w-5" />
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
                  "Bank Balance"
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
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-white">{tx.trxDate}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300">12:00 AM</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300">{tx.description}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300">{tx.orNo}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300">{tx.arNo}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.principal}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.interest}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.tax}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.loanCharge}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.loanPayment}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.penaltyPay}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right font-bold">{tx.lineTotal}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.principalBal}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.unearnedIntBal}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.outstandingBal}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.withdrawnBal}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">{tx.bankBalance}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-300">{tx.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-3xl m-4">
        <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
          <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Edit Client Information
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Update client details to keep the profile accurate.
          </p>
          <form className="space-y-8">
            <div className="space-y-6">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="clientName">Client&apos;s Name</Label>
                  <Input
                    id="clientName"
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="loanId">Loan ID</Label>
                  <Input
                    id="loanId"
                    type="text"
                    name="loanId"
                    value={formData.loanId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="contactNo">Contact No.</Label>
                  <Input
                    id="contactNo"
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contract Information
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contractNo">Contract No.</Label>
                  <Input
                    id="contractNo"
                    type="text"
                    name="contractNo"
                    value={formData.contractNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="contractDate">Contract Date</Label>
                  <Input
                    id="contractDate"
                    type="date"
                    name="contractDate"
                    value={formData.contractDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="interestType">Interest Type</Label>
                  <Input
                    id="interestType"
                    type="text"
                    name="interestType"
                    value={formData.interestType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="firstDue">First Due</Label>
                  <Input
                    id="firstDue"
                    type="date"
                    name="firstDue"
                    value={formData.firstDue}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="maturityDue">Maturity Due</Label>
                  <Input
                    id="maturityDue"
                    type="date"
                    name="maturityDue"
                    value={formData.maturityDue}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                  <Input
                    id="paymentSchedule"
                    type="text"
                    name="paymentSchedule"
                    value={formData.paymentSchedule}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="allottees">Allottees</Label>
                  <Input
                    id="allottees"
                    type="text"
                    name="allottees"
                    value={formData.allottees}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                Financial Information
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="principalLoan">Principal Loan</Label>
                  <Input
                    id="principalLoan"
                    type="text"
                    name="principalLoan"
                    value={formData.principalLoan}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="unearnedInterestRate">Interest Rate (%)</Label>
                  <Input
                    id="unearnedInterestRate"
                    type="number"
                    name="unearnedInterestRate"
                    value={formData.unearnedInterestRate}
                    onChange={handleInputChange}
                    min="0"
                    step={0.01}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="terms">Terms</Label>
                  <Input
                    id="terms"
                    type="text"
                    name="terms"
                    value={formData.terms}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="amortization">Amortization</Label>
                  <Input
                    id="amortization"
                    type="text"
                    name="amortization"
                    value={formData.amortization}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="landlineNo">Landline No.</Label>
                  <Input
                    id="landlineNo"
                    type="tel"
                    name="landlineNo"
                    value={formData.landlineNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                className="rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <AddPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}