import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Plus, Trash2 } from "lucide-react";

interface ItemDetail {
line: number;
description: string;
qty: number;
unit: string;
price: number;
remark: string;
}

interface CreatePurchaseRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

const CreatePurchaseRequest: React.FC<CreatePurchaseRequestModalProps> = ({ isOpen, onClose, onSave }) => {
const [prNumber, setPrNumber] = useState("");
const [referenceNumber, setReferenceNumber] = useState("");
const [costCenter, setCostCenter] = useState("");
const [subCostCenter, setSubCostCenter] = useState("");
const [requestDate, setRequestDate] = useState("");
const [dateNeeded, setDateNeeded] = useState("");
const [items, setItems] = useState<ItemDetail[]>([
    {
        line: 1,
        description: "",
        qty: 1,
        unit: "",
        price: 0,
        remark: "",
    },
]);

const handleItemChange = (
    index: number,
    field: keyof ItemDetail,
    value: string | number
) => {
    const updatedItems = [...items];
    switch (field) {
        case "qty":
        case "price":
        case "line":
            updatedItems[index][field] = Number(value);
            break;
        case "description":
        case "unit":
        case "remark":
            updatedItems[index][field] = String(value);
        break;
    }
setItems(updatedItems);
    setItems(updatedItems);
};

const handleAddItem = () => {
    setItems([
        ...items,
        {
            line: items.length + 1,
            description: "",
            qty: 1,
            unit: "",
            price: 0,
            remark: "",
        },
    ]);
};

const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(
        updatedItems.map((item, idx) => ({
            ...item,
            line: idx + 1,
        }))
    );
};

const handleCancel = () => {
    // setPrNumber("");
    // setReferenceNumber("");
    // setCostCenter("");
    // setSubCostCenter("");
    // setRequestDate("");
    // setDateNeeded("");
    // setItems([
    //     {
    //         line: 1,
    //         description: "",
    //         qty: 1,
    //         unit: "",
    //         price: 0,
    //         remark: "",
    //     },
    // ]);
    onClose();
};

const handleProceed = () => {
    console.log({
        prNumber,
        referenceNumber,
        costCenter,
        subCostCenter,
        requestDate,
        dateNeeded,
        requestedBy: "ADMIN",
        items,
    });
};

if (!isOpen) return null;

return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-3xl p-4 sm:p-6">
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Create Purchase Request</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details for the new purchase request.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <div>
                    <Label>PR#</Label>
                    <Input type="text" name="prNumber" value={prNumber} onChange={e => setPrNumber(e.target.value)} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <Label>Reference #</Label>
                    <Input type="text" name="referenceNumber" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <Label>Cost Center</Label>
                    <Input type="text" name="costCenter" value={costCenter} onChange={e => setCostCenter(e.target.value)} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <Label>Sub Cost Center</Label>
                    <Input type="text" name="subCostCenter" value={subCostCenter} onChange={e => setSubCostCenter(e.target.value)} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <Label>Request Date</Label>
                    <Input type="date" name="requestDate" value={requestDate} onChange={e => setRequestDate(e.target.value)} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <Label>Date Needed</Label>
                    <Input type="date" name="dateNeeded" value={dateNeeded} onChange={e => setDateNeeded(e.target.value)} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="col-span-2 mt-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400">Requested By: <b>ADMIN</b></span>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Request Item Details</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead className="bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th className="px-3 py-2">Line</th>
                                <th className="px-3 py-2">Description</th>
                                <th className="px-3 py-2">QTY</th>
                                <th className="px-3 py-2">Unit</th>
                                <th className="px-3 py-2">Price</th>
                                <th className="px-3 py-2">Line Amt</th>
                                <th className="px-3 py-2">Remark</th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 dark:text-gray-400">
                                    <td className="px-3 py-2">{item.line}</td>
                                    <td className="px-3 py-2">
                                        <Input type="text" value={item.description} onChange={e => handleItemChange(idx, "description", e.target.value)} className="w-full" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input type="number" value={String(item.qty)} onChange={e => handleItemChange(idx, "qty", e.target.value)} min="1" className="w-full" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input type="text" value={item.unit} onChange={e => handleItemChange(idx, "unit", e.target.value)} className="w-full" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input type="number" value={String(item.price)} onChange={e => handleItemChange(idx, "price", e.target.value)} min="0" className="w-full" />
                                    </td>
                                    <td className="px-3 py-2">{(item.qty * item.price).toFixed(2)}</td>
                                    <td className="px-3 py-2">
                                        <Input type="text" value={item.remark} onChange={e => handleItemChange(idx, "remark", e.target.value)} className="w-full" />
                                    </td>
                                    <td className="px-3 py-2">
                                                            <Button size="sm" variant="outline" onClick={() => handleDeleteItem(idx)} disabled={items.length === 1} className="p-1">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={8} className="text-right px-3 py-2">
                                    <Button size="sm" variant="outline" onClick={handleAddItem} className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Add Item
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={handleCancel} className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition text-sm">Cancel</Button>
                <Button size="sm" onClick={handleProceed} className="px-4 py-1.5 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition text-sm">Proceed</Button>
            </div>
        </div>
    </Modal>
);
};

export default CreatePurchaseRequest;