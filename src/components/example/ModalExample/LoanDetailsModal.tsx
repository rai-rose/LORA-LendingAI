/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/form-elements/SelectInputs";
import Textarea from "@/components/form/form-elements/TextAreaInput";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { CalenderIcon, PlusIcon } from "@/icons";

type DatePickerPropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: flatpickr.Options.Hook | flatpickr.Options.Hook[];
  defaultDate?: flatpickr.Options.DateOption;
  label?: string;
  placeholder?: string;
};

function DatePicker({ id, mode, onChange, label, defaultDate, placeholder }: DatePickerPropsType) {
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}

type LoanDetailsModalProps = object;

interface ClientData {
  type: string;
  title: string;
  lastName: string;
  firstName: string;
  midName: string;
  birthDate: string;
  gender: string;
  civilStatus: string;
  nationality: string;
  facebook: string;
  idPresented: string;
  sss: string;
  tin: string;
  landline: string;
  mobile: string;
  email: string;
  remarks: string;
  addressLine: string;
  addressMain: string;
  addressType: string;
  country: string;
  zipCode: string;
  province: string;
  city: string;
  barangay: string;
  sitio: string;
  street: string;
  homeNo: string;
  owned: string;
  value: string;
  income: number;
  charges?: { code: string; name: string; price: number }[];
  collateralIncome?: number;
  childBeneficiaryAge?: number;
}

interface SavedData {
  loanType: string;
  loanSubClass: string;
  client: ClientData;
  capturedImages: string[];
  incomeDetails: string;
  collateralDetails: string;
}

interface ApplicationDetails {
  purpose: string;
  monthlyAmortization: number;
  paymentSchedule: string;
  appliedPrincipalLoan: number;
  grantedPrincipalLoan: number;
  totalTerms: number;
  remainingTerms: number;
  totalInterest: number;
  firstDue: string;
  endDue: string;
  lessTotalCharges: number;
  netRelease: number;
  charges: { code: string; name: string; price: number }[];
  recommendedTerms?: number; // Added for recommended terms
}

export default function LoanDetailsModal({}: LoanDetailsModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [loanType, setLoanType] = useState<string>("");
  const [loanSubClass, setLoanSubClass] = useState<string>("");
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [incomeDetails, setIncomeDetails] = useState<string>("");
  const [collateralDetails, setCollateralDetails] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails>({
    purpose: "",
    monthlyAmortization: 0,
    paymentSchedule: "",
    appliedPrincipalLoan: 0,
    grantedPrincipalLoan: 0,
    totalTerms: 2,
    remainingTerms: 0,
    totalInterest: 0,
    firstDue: "2025-07-30",
    endDue: "2025-08-30",
    lessTotalCharges: 300,
    netRelease: 0,
    charges: [
      { code: "APPFEE", name: "Appraisal Fee", price: 200 },
      { code: "NOTFEE", name: "Notarial Fee", price: 100 },
    ],
    recommendedTerms: 0,
  });
  const [activeTab, setActiveTab] = useState("client");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("clientRegistrationData");
    if (savedData) {
      try {
        const parsedData: SavedData = JSON.parse(savedData);
        setLoanType(parsedData.loanType);
        setLoanSubClass(parsedData.loanSubClass || "");
        setClientData({
          ...parsedData.client,
          collateralIncome: parsedData.client.income || 3000,
          childBeneficiaryAge: 0,
        });
        setCapturedImages(parsedData.capturedImages || []);
        setIncomeDetails(parsedData.incomeDetails || "3,000.00");
        setCollateralDetails(parsedData.collateralDetails || "");
        setRemarks(parsedData.client.remarks || "");
      } catch (error) {
        console.error("Failed to parse client data from localStorage:", error);
        alert("Error loading client data. Please try again.");
      }
    }
  }, []);

  const handleBack = () => {
    router.push("/loans/loan-application");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    router.push("/loans/loan-application");
  };

  const handleApplicationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationDetails((prev) => ({
      ...prev,
      [name]: name.includes("Loan") || name.includes("Terms") || name.includes("Charges") || name.includes("netRelease") ? Number(value) : value,
    }));
  };

  const handleDateChange = (name: string) => (selectedDates: Date[]) => {
    const formattedDate = selectedDates[0] ? selectedDates[0].toISOString().split("T")[0] : "";
    setApplicationDetails((prev) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  const handleChargeChange = (index: number, field: string, value: string | number) => {
    setApplicationDetails((prev) => {
      const updatedCharges = [...prev.charges];
      updatedCharges[index] = { ...updatedCharges[index], [field]: field === "price" ? Number(value) : value };
      return { ...prev, charges: updatedCharges, lessTotalCharges: updatedCharges.reduce((sum, charge) => sum + charge.price, 0) };
    });
  };

  const addCharge = () => {
    setApplicationDetails((prev) => ({
      ...prev,
      charges: [...prev.charges, { code: "", name: "", price: 0 }],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setCapturedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    if (!loanType || !applicationDetails.appliedPrincipalLoan || !applicationDetails.totalInterest) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedData: SavedData = {
      loanType,
      loanSubClass,
      client: { ...clientData, remarks } as ClientData,
      capturedImages,
      incomeDetails,
      collateralDetails,
    };
    localStorage.setItem("clientRegistrationData", JSON.stringify(updatedData));
    localStorage.setItem("applicationDetails", JSON.stringify(applicationDetails));

    console.log("Submitting loan application:", { updatedData, applicationDetails });
    alert("Loan application recommended for approval!");
    setIsOpen(false);
    router.push("/loans/loan-application");
  };

  const formatFullName = (client: ClientData) => {
    const fullName = `${client.title || ""} ${client.firstName || ""} ${client.midName || ""} ${client.lastName || ""}`.trim();
    return fullName.toUpperCase();
  };

  const loanClassOptions = [
    { value: "personal", label: "Personal Loan" },
    { value: "business", label: "Business Loan" },
    { value: "mortgage", label: "Mortgage Loan" },
  ];

  const loanSubClassOptions = {
    personal: [
      { value: "unsecured", label: "Unsecured Personal Loan" },
      { value: "secured", label: "Secured Personal Loan" },
    ],
    business: [
      { value: "startup", label: "Startup Loan" },
      { value: "expansion", label: "Business Expansion Loan" },
    ],
    mortgage: [
      { value: "home", label: "Home Mortgage" },
      { value: "commercial", label: "Commercial Mortgage" },
    ],
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isFullscreen={true} showCloseButton={true}>
      <div className="fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-10">
        <div>
          <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">Loan Details</h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Review and edit the loan type, client details, application details, and associated documents below.
          </p>

          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "client" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"} dark:text-gray-400 dark:hover:text-white`}
              onClick={() => setActiveTab("client")}
            >
              Client Information
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "application" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"} dark:text-gray-400 dark:hover:text-white`}
              onClick={() => setActiveTab("application")}
            >
              Application Details
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "documents" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"} dark:text-gray-400 dark:hover:text-white`}
              onClick={() => setActiveTab("documents")}
            >
              Documents and Images
            </button>
          </div>

          {clientData ? (
            <>
              {activeTab === "client" && (
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-white uppercase">
                        {formatFullName(clientData) || "DELA CRUZ, MARIA FE L"}
                      </h2>
                      <p className="text-md text-gray-600 dark:text-gray-300 mt-1 flex items-center">
                        {loanType || "Loan Type Not Specified"}
                        <span className="ml-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Pending
                        </span>
                      </p>
                    </div>
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-md">
                      {capturedImages.length > 0 ? (
                        <img src={capturedImages[0]} alt="Client Selfie" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">
                          No Client Selfie
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 mb-6" />

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Loan Details</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Loan Class</Label>
                        <Select
                          value={loanType}
                          onChange={(e) => setLoanType(e.target.value)}
                          options={loanClassOptions}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        />
                      </div>
                      <div>
                        <Label>Loan Subclass</Label>
                        <Select
                          value={loanSubClass}
                          onChange={(e) => setLoanSubClass(e.target.value)}
                          options={loanType ? loanSubClassOptions[loanType as keyof typeof loanSubClassOptions] || [] : []}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                          disabled={!loanType}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 mb-6" />

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Personal Details</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Birth Date:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.birthDate || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Gender:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.gender || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Civil Status:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.civilStatus || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Nationality:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.nationality || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Collateral Monthly Income:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.collateralIncome?.toLocaleString() || "3,000.00"}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Child Beneficiary Age:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.childBeneficiaryAge || 0}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 mb-6" />

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Address:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">
                          {`${clientData.addressLine || ""} ${clientData.addressMain || ""}, ${clientData.barangay || ""}, ${clientData.city || ""}, ${clientData.province || ""}, ${clientData.country || ""}`.trim() || ""}
                        </p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Mobile:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.mobile || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Email:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.email || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Facebook:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.facebook || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">Landline:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.landline || ""}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 mb-6" />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Identification</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">ID Presented:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.idPresented || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">SSS:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.sss || ""}</p>
                      </div>
                      <div className="flex">
                        <Label className="w-40 text-xs font-medium text-gray-600 dark:text-gray-300">TIN:</Label>
                        <p className="text-sm text-gray-800 dark:text-white/90">{clientData.tin || ""}</p>
                      </div>
                      <div>
                        <Label>CI Remarks</Label>
                        <Textarea
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs"
                          placeholder="Enter remarks here..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "application" && (
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Loan Details</h5>
                  <div className="space-y-6">
                    <div>
                      <Label>Purpose</Label>
                      <Input
                        name="purpose"
                        value={applicationDetails.purpose}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                      />
                    </div>
                    <div>
                      <Label>Schedule of Payment (Day(s) of the Month)</Label>
                      <Input
                        name="paymentSchedule"
                        value={applicationDetails.paymentSchedule}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label>Total Terms</Label>
                        <Input
                          name="totalTerms"
                          type="number"
                          value={applicationDetails.totalTerms}
                          onChange={handleApplicationInputChange}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label>Remaining Terms</Label>
                        <Input
                          name="remainingTerms"
                          type="number"
                          value={applicationDetails.remainingTerms}
                          onChange={handleApplicationInputChange}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label>First Due</Label>
                        <DatePicker
                          id="firstDue"
                          defaultDate={applicationDetails.firstDue}
                          onChange={handleDateChange("firstDue")}
                          placeholder="Select First Due Date"
                        />
                      </div>
                      <div>
                        <Label>End Due</Label>
                        <DatePicker
                          id="endDue"
                          defaultDate={applicationDetails.endDue}
                          onChange={handleDateChange("endDue")}
                          placeholder="Select End Due Date"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Recommended Terms</Label>
                      <Input
                        name="recommendedTerms"
                        type="number"
                        value={applicationDetails.recommendedTerms}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label>Monthly Amortization</Label>
                      <Input
                        name="monthlyAmortization"
                        type="number"
                        value={applicationDetails.monthlyAmortization}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="font-bold">Applied Principal Loan</Label>
                      <Input
                        name="appliedPrincipalLoan"
                        type="number"
                        value={applicationDetails.appliedPrincipalLoan}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs font-bold"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label>Granted Principal Loan</Label>
                      <Input
                        name="grantedPrincipalLoan"
                        type="number"
                        value={applicationDetails.grantedPrincipalLoan}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label>Total Interest</Label>
                      <Input
                        name="totalInterest"
                        type="number"
                        value={applicationDetails.totalInterest}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-red-600 dark:text-red-400">Less Total Charges</Label>
                      <Input
                        name="lessTotalCharges"
                        type="number"
                        value={applicationDetails.lessTotalCharges}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        min="0"
                        disabled
                      />
                    </div>
                    <div>
                      <Label>Net Release</Label>
                      <Input
                        name="netRelease"
                        type="number"
                        value={applicationDetails.netRelease}
                        onChange={handleApplicationInputChange}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Loan Charges/Deductions</h3>
                    {applicationDetails.charges.map((charge, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 mb-4 items-center">
                        <Input
                          value={charge.name}
                          onChange={(e) => handleChargeChange(index, "name", e.target.value)}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                          placeholder="Charge Name"
                        />
                        <Input
                          value={charge.code}
                          onChange={(e) => handleChargeChange(index, "code", e.target.value)}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                          placeholder="Charge Code"
                        />
                        <Input
                          type="number"
                          value={charge.price}
                          onChange={(e) => handleChargeChange(index, "price", e.target.value)}
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                          min="0"
                          placeholder="Price"
                        />
                      </div>
                    ))}
                    <Button size="sm" variant="outline" onClick={addCharge} className="mt-2 flex items-center">
                      <PlusIcon className="mr-2 h-4 w-4" /> Add Charge
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Documents and Images</h3>
                  <div className="mb-6">
                    <Label>Upload Requirements</Label>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs"
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Images</h4>
                    {capturedImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {capturedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="w-full h-[150px] object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No images available.</p>
                    )}
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700 mb-6" />
                  <div>
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Documents</h4>
                    {uploadedFiles.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {uploadedFiles.map((file, index) => (
                          <li key={index} className="text-sm text-gray-800 dark:text-white/90">{file.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No documents uploaded.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No client data available. Please complete client registration first.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}