/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

interface ApplyOtherLoansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    loanType: string;
    loanAmount: string;
    applicationReason: string;
    collateral: string;
    proposedTerms: string;
  }) => void;
}

const ApplyOtherLoansModal: React.FC<ApplyOtherLoansModalProps> = ({ isOpen, onClose, onSave }) => {
  const [loanType, setLoanType] = useState("Personal");
  const [loanAmount, setLoanAmount] = useState("0.00");
  const [applicationReason, setApplicationReason] = useState("");
  const [collateral, setCollateral] = useState("");
  const [proposedTerms, setProposedTerms] = useState("12");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "loanType":
        setLoanType(value);
        break;
      case "loanAmount":
        setLoanAmount(value);
        break;
      case "applicationReason":
        setApplicationReason(value);
        break;
      case "collateral":
        setCollateral(value);
        break;
      case "proposedTerms":
        setProposedTerms(value);
        break;
    }
  };

  const handleSave = () => {
    onSave({
      loanType,
      loanAmount,
      applicationReason,
      collateral,
      proposedTerms,
    });
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
            Apply Other Loans
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Apply for a new loan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          <div>
            <Label>Loan Type</Label>
            <select
              name="loanType"
              value={loanType}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Mortgage">Mortgage</option>
            </select>
          </div>
          <div>
            <Label>Loan Amount</Label>
            <Input
              type="number"
              step={0.01}
              name="loanAmount"
              value={loanAmount}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
          </div>
          <div className="col-span-2">
            <Label>Application Reason</Label>
            <textarea
              name="applicationReason"
              value={applicationReason}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
              rows={4}
            />
          </div>
          <div>
            <Label>Collateral</Label>
            <select
              name="collateral"
              value={collateral}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            >
              <option value="">Select Collateral</option>
              <option value="Property">Property</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label>Proposed Terms (Months)</Label>
            <Input
              type="number"
              name="proposedTerms"
              value={proposedTerms}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

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
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplyOtherLoansModal;