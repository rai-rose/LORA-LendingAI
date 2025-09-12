/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";

interface CloseAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    confirmClosure: boolean;
    reason: string;
    finalBalance: string;
    closureNotes: string;
  }) => void;
}

const CloseAccountModal: React.FC<CloseAccountModalProps> = ({ isOpen, onClose, onSave }) => {
  const [confirmClosure, setConfirmClosure] = useState(false);
  const [reason, setReason] = useState("");
  const [finalBalance, setFinalBalance] = useState("0.00");
  const [closureNotes, setClosureNotes] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "reason":
        setReason(value);
        break;
      case "finalBalance":
        setFinalBalance(value);
        break;
      case "closureNotes":
        setClosureNotes(value);
        break;
    }
  };

  const handleSave = () => {
    if (!confirmClosure) {
      alert("Please confirm account closure.");
      return;
    }
    onSave({
      confirmClosure,
      reason,
      finalBalance,
      closureNotes,
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
            Close Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Confirm account closure details
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          <div className="col-span-2 flex items-center gap-4">
            <Checkbox checked={confirmClosure} onChange={setConfirmClosure} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              I confirm the account closure
            </span>
          </div>
          <div className="col-span-2">
            <Label>Reason for Closure</Label>
            <textarea
              name="reason"
              value={reason}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
              rows={4}
            />
          </div>
          <div>
            <Label>Final Balance</Label>
            <Input
              type="number"
              step={0.01}
              name="finalBalance"
              value={finalBalance}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
          </div>
          <div className="col-span-2">
            <Label>Closure Notes</Label>
            <textarea
              name="closureNotes"
              value={closureNotes}
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
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
          >
            Close Account
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CloseAccountModal;