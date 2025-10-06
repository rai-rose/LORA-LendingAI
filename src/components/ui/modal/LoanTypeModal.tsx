import React, { useState, useEffect } from "react";
import { LoanType } from "@/components/tables/utils";

interface LoanTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (loan: LoanType) => void;
    initialLoanType?: LoanType | null;
}

const initialState: Omit<LoanType, "id"> = {
    code: "",
    description: "",
    format: "",
    series: "",
};

const LoanTypeModal: React.FC<LoanTypeModalProps> = ({ isOpen, onClose, onAdd, initialLoanType }) => {
    const [form, setForm] = useState<Omit<LoanType, "id">>(
        initialLoanType
        ? {
            code: initialLoanType.code,
            description: initialLoanType.description,
            format: initialLoanType.format,
            series: initialLoanType.series,
        }
        : initialState
    );

    useEffect(() => {
        if (initialLoanType) {
            setForm({
                code: initialLoanType.code,
                description: initialLoanType.description,
                format: initialLoanType.format,
                series: initialLoanType.series,
            });
        } else {
            setForm(initialState);
        }
    }, [initialLoanType, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code || !form.description || !form.format || !form.series) return;
        if (initialLoanType) {
            onAdd({ ...form, id: initialLoanType.id });
        } else {
            onAdd({ ...form, id: Date.now() });
        }
        setForm(initialState);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
            <div className="no-scrollbar relative w-full max-w-lg mx-auto my-4 overflow-y-auto rounded-xl bg-white dark:bg-gray-900 p-6 lg:p-8 shadow-2xl transition-all duration-300" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {initialLoanType ? "Edit Loan Type" : "Add New Loan Type"}
                    </h4>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Code *</label>
                        <input
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            placeholder="Code"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Description *</label>
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Format *</label>
                        <input
                            name="format"
                            value={form.format}
                            onChange={handleChange}
                            placeholder="Format"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Series *</label>
                        <input
                            name="series"
                            value={form.series}
                            onChange={handleChange}
                            placeholder="Series"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition shadow-sm text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-brand-500 text-white hover:bg-brand-600 transition shadow-sm text-sm"
                        >
                            {initialLoanType ? "Save" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanTypeModal;
