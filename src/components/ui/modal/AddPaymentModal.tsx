/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { CalenderIcon } from "@/icons";

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    transactionDate: string;
    chargeNo: string;
    paymentDescription: string;
    officialReceipt: boolean;
    loanPayment: boolean;
    particularReference: string;
    collateralAct: string;
    accountNumber: string;
    principal: string;
    totalInterest: string;
    netInterest: string;
    taxAmount: string;
    earnedInterest: string;
    totalAmount: string;
    acceptedAmount: string;
    refundVoucherNo: string;
    refundable: string;
    refundSource: string;
    bankAccount: string;
  }) => void;
}

type DatePickerPropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: flatpickr.Options.Hook | flatpickr.Options.Hook[];
  defaultDate?: flatpickr.Options.DateOption;
  label?: string;
  placeholder?: string;
  formData: { transactionDate: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function DatePicker({
  id,
  mode = "single",
  onChange,
  defaultDate,
  label,
  placeholder,
  formData,
  handleInputChange,
}: DatePickerPropsType) {
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode,
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate: defaultDate || formData.transactionDate,
      onChange: (selectedDates, dateStr, instance) => {
        if (onChange) {
          if (Array.isArray(onChange)) {
            onChange.forEach((hook) => hook(selectedDates, dateStr, instance));
          } else {
            onChange(selectedDates, dateStr, instance);
          }
        }
        const event = {
          target: { name: "transactionDate", value: dateStr },
        } as React.ChangeEvent<HTMLInputElement>;
        handleInputChange(event);
      },
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [id, mode, onChange, defaultDate, formData.transactionDate, handleInputChange]);

  return (
    <div className="relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative mt-1">
        <Input
          id={id}
          type="text"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleInputChange}
          placeholder={placeholder || "Select a date"}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
        />
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
          <CalenderIcon className="size-5" />
        </span>
      </div>
    </div>
  );
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ transactionDate: "2025-09-03" });
  const [chargeNo, setChargeNo] = useState("000-000001");
  const [paymentDescription, setPaymentDescription] = useState("Loan Payment");
  const [officialReceipt, setOfficialReceipt] = useState(false);
  const [loanPayment, setLoanPayment] = useState(false);
  const [particularReference, setParticularReference] = useState("");
  const [collateralAct, setCollateralAct] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [principal, setPrincipal] = useState("0.00");
  const [totalInterest, setTotalInterest] = useState("0.00");
  const [netInterest, setNetInterest] = useState("0.00");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [earnedInterest, setEarnedInterest] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [acceptedAmount, setAcceptedAmount] = useState("0.00");
  const [refundVoucherNo, setRefundVoucherNo] = useState("");
  const [refundable, setRefundable] = useState("0.00");
  const [refundSource, setRefundSource] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  useEffect(() => {
    const total = (
      parseFloat(principal || "0") +
      parseFloat(netInterest || "0") +
      parseFloat(earnedInterest || "0") +
      parseFloat(taxAmount || "0")
    ).toFixed(2);
    setTotalAmount(total);
  }, [principal, netInterest, earnedInterest, taxAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "transactionDate":
        setFormData((prev) => ({ ...prev, transactionDate: value }));
        break;
      case "chargeNo":
        setChargeNo(value);
        break;
      case "paymentDescription":
        setPaymentDescription(value);
        break;
      case "particularReference":
        setParticularReference(value);
        break;
      case "collateralAct":
        setCollateralAct(value);
        break;
      case "accountNumber":
        setAccountNumber(value);
        break;
      case "principal":
        setPrincipal(value);
        break;
      case "totalInterest":
        setTotalInterest(value);
        break;
      case "netInterest":
        setNetInterest(value);
        break;
      case "taxAmount":
        setTaxAmount(value);
        break;
      case "earnedInterest":
        setEarnedInterest(value);
        break;
      case "acceptedAmount":
        setAcceptedAmount(value);
        break;
      case "refundVoucherNo":
        setRefundVoucherNo(value);
        break;
      case "refundable":
        setRefundable(value);
        break;
      case "refundSource":
        setRefundSource(value);
        break;
      case "bankAccount":
        setBankAccount(value);
        break;
      case "officialReceipt":
        setOfficialReceipt(value === "true");
        break;
      case "loanPayment":
        setLoanPayment(value === "true" || parseFloat(value) > 0);
        break;
    }
  };

  const handleSave = () => {
    onSave({
      transactionDate: formData.transactionDate,
      chargeNo,
      paymentDescription,
      officialReceipt,
      loanPayment,
      particularReference,
      collateralAct,
      accountNumber,
      principal,
      totalInterest,
      netInterest,
      taxAmount,
      earnedInterest,
      totalAmount,
      acceptedAmount,
      refundVoucherNo,
      refundable,
      refundSource,
      bankAccount,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-3xl p-4 sm:p-6"
    >
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
            Add Payment
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter payment details to proceed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {/* Top Row */}
          <DatePicker
            id="transactionDatePicker"
            label="Transaction Date"
            mode="single"
            formData={formData}
            handleInputChange={handleInputChange}
            placeholder="YYYY-MM-DD"
          />
          <div>
            <Label>Charge No.</Label>
            <Input
              type="text"
              name="chargeNo"
              value={chargeNo}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Payment Description */}
          <div className="col-span-2">
            <Label>Payment Description</Label>
            <select
              name="paymentDescription"
              value={paymentDescription}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            >
              <option value="">Select</option>
              <option value="Official Receipt">Official Receipt</option>
              <option value="Loan Payment">Loan Payment</option>
            </select>
          </div>

          {/* Checkboxes with Inputs in one row */}
          <div className="col-span-2 flex items-center gap-4">
            <Checkbox checked={officialReceipt} onChange={setOfficialReceipt} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">Official Receipt</span>
            <Input
              type="text"
              name="officialReceipt"
              value={officialReceipt ? "true" : ""}
              onChange={handleInputChange}
              className="w-32 p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            />
            <Checkbox checked={loanPayment} onChange={setLoanPayment} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">Loan Payment</span>
            <Input
              type="text"
              name="loanPayment"
              value={loanPayment ? "true" : ""}
              onChange={handleInputChange}
              className="w-32 p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Particular/Reference and Collateral */}
          <div className="col-span-2">
            <Label>Particular/Reference</Label>
            <Input
              type="text"
              name="particularReference"
              value={particularReference}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            />
          </div>
          <div className="col-span-2">
            <Label>Collateral</Label>
            <select
              name="collateralAct"
              value={collateralAct}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Collateral</option>
              <option value="Collateral 1">Collateral 1</option>
              <option value="Collateral 2">Collateral 2</option>
            </select>
          </div>

          {/* Account Number */}
          <div className="col-span-2">
            <Label>Account Number</Label>
            <Input
              type="text"
              name="accountNumber"
              value={accountNumber}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            />
          </div>

          {/* Loan Payment Section */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Loan Payment Input */}
            <div className="col-span-2">
              <Label className="text-[#120695] dark:text-[#A5B4FC]">Loan Payment</Label>
              <Input
                type="number"
                step={0.01}
                name="loanPayment"
                value={loanPayment ? totalAmount : "0.00"}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>

            {/* Principal Input */}
            <div>
              <Label>Principal</Label>
              <Input
                type="number"
                step={0.01}
                name="principal"
                value={principal}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>

            {/* Total Interest Input */}
            <div>
              <Label>Total Interest</Label>
              <Input
                type="number"
                step={0.01}
                name="totalInterest"
                value={totalInterest}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>

            {/* Net Interest Input */}
            <div>
              <Label>Net Interest</Label>
              <Input
                type="number"
                step={0.01}
                name="netInterest"
                value={netInterest}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>

            {/* Tax Amount Input */}
            <div>
              <Label>Tax Amount</Label>
              <Input
                type="number"
                step={0.01}
                name="taxAmount"
                value={taxAmount}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>

            {/* Earned Interest (Penalty) Input */}
            <div className="col-span-2">
              <Label className="text-red-600 dark:text-red-400">
                <span className="font-bold">Plus:</span> <i>Earned Interest Loan (Penalty)</i>
              </Label>
              <Input
                type="number"
                step={0.01}
                name="earnedInterest"
                value={earnedInterest}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>

            {/* Total Amount Display */}
            <div className="col-span-2">
              <Label>Total Amount (PHP)</Label>
              <Input
                type="text"
                name="totalAmount"
                value={totalAmount}
                readOnly
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md text-blue-600 font-semibold bg-blue-500 dark:bg-blue-700 dark:text-blue-400"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Additional Fields */}
          <div className="col-span-2">
            <Label className="text-blue-400 dark:text-blue-300">Accepted Payment/Withdrawn Amount</Label>
            <Input
              type="number"
              step={0.01}
              name="acceptedAmount"
              value={acceptedAmount}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            />
          </div>
          <div className="col-span-2">
            <Label className="text-gray-400">Refund Voucher No.</Label>
          </div>
          <div className="col-span-2">
            <Label className="text-red-600 dark:text-red-400">Change/Refundable</Label>
            <Input
              type="number"
              step={0.01}
              name="refundable"
              value={refundable}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="col-span-2">
            <Label>Refund Source</Label>
            <select
              name="refundSource"
              value={refundSource}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Source</option>
              <option value="Source 1">Source 1</option>
              <option value="Source 2">Source 2</option>
            </select>
          </div>
          <div className="col-span-2">
            <Label>Bank Account</Label>
            <select
              name="bankAccount"
              value={bankAccount}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Account</option>
              <option value="Account 1">Account 1</option>
              <option value="Account 2">Account 2</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition text-sm"
          >
            Close
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="px-4 py-1.5 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition text-sm"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPaymentModal;