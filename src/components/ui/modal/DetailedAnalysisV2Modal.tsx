/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { CalenderIcon } from "@/icons";

interface DetailedAnalysisV2ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    analysisDate: string;
    loanId: string;
    analysisType: string;
    riskLevel: string;
    paymentHistory: string;
    totalOutstanding: string;
    comments: string;
  }) => void;
}

type DatePickerPropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: flatpickr.Options.Hook | flatpickr.Options.Hook[];
  defaultDate?: flatpickr.Options.DateOption;
  label?: string;
  placeholder?: string;
  formData: { analysisDate: string };
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
      defaultDate: defaultDate || formData.analysisDate,
      onChange: (selectedDates, dateStr, instance) => {
        if (onChange) {
          if (Array.isArray(onChange)) {
            onChange.forEach((hook) => hook(selectedDates, dateStr, instance));
          } else {
            onChange(selectedDates, dateStr, instance);
          }
        }
        const event = {
          target: { name: "analysisDate", value: dateStr },
        } as React.ChangeEvent<HTMLInputElement>;
        handleInputChange(event);
      },
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [id, mode, onChange, defaultDate, formData.analysisDate, handleInputChange]);

  return (
    <div className="relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative mt-1">
        <Input
          id={id}
          type="text"
          name="analysisDate"
          value={formData.analysisDate}
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

const DetailedAnalysisV2Modal: React.FC<DetailedAnalysisV2ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ analysisDate: "2025-09-12" });
  const [loanId, setLoanId] = useState("N/A");
  const [analysisType, setAnalysisType] = useState("Advanced");
  const [riskLevel, setRiskLevel] = useState("Low");
  const [paymentHistory, setPaymentHistory] = useState("On Time");
  const [totalOutstanding, setTotalOutstanding] = useState("37412.50");
  const [comments, setComments] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "analysisDate":
        setFormData((prev) => ({ ...prev, analysisDate: value }));
        break;
      case "loanId":
        setLoanId(value);
        break;
      case "analysisType":
        setAnalysisType(value);
        break;
      case "riskLevel":
        setRiskLevel(value);
        break;
      case "paymentHistory":
        setPaymentHistory(value);
        break;
      case "totalOutstanding":
        setTotalOutstanding(value);
        break;
      case "comments":
        setComments(value);
        break;
    }
  };

  const handleSave = () => {
    onSave({
      analysisDate: formData.analysisDate,
      loanId,
      analysisType,
      riskLevel,
      paymentHistory,
      totalOutstanding,
      comments,
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
            Detailed Analysis V2
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Advanced loan analysis
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          <DatePicker
            id="analysisDatePicker"
            label="Analysis Date"
            mode="single"
            formData={formData}
            handleInputChange={handleInputChange}
            placeholder="YYYY-MM-DD"
          />
          <div>
            <Label>Loan ID</Label>
            <Input
              type="text"
              name="loanId"
              value={loanId}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="col-span-2">
            <Label>Analysis Type</Label>
            <select
              name="analysisType"
              value={analysisType}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            >
              <option value="Advanced">Advanced</option>
              <option value="Risk-Based">Risk-Based</option>
              <option value="Comparative">Comparative</option>
            </select>
          </div>
          <div>
            <Label>Risk Level</Label>
            <select
              name="riskLevel"
              value={riskLevel}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <Label>Payment History</Label>
            <select
              name="paymentHistory"
              value={paymentHistory}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
            >
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Missed">Missed</option>
            </select>
          </div>
          <div className="col-span-2">
            <Label>Total Outstanding</Label>
            <Input
              type="number"
              step={0.01}
              name="totalOutstanding"
              value={totalOutstanding}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
          </div>
          <div className="col-span-2">
            <Label>Comments</Label>
            <textarea
              name="comments"
              value={comments}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
              rows={4}
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
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailedAnalysisV2Modal;
