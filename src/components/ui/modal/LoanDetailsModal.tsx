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
import { CalenderIcon, PlusIcon, ChevronDownIcon } from "@/icons";
import { useDropzone } from "react-dropzone";

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
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-white text-gray-800 border-gray-300 focus:border-brand-300 dark:border-gray-700 dark:focus:border-brand-800"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-5" />
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
  healthStatus?: string;
  clientAge?: number;
  ifLivingSpouseAge?: number;
  status?: string;
  loanId?: string;
  appliedOn?: string;
  processType?: string;
  coMaker?: string;
  contactNo?: string;
  coMakerRelationship?: string;
  otherInfoMOA?: string;
  requestedBy?: string;
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
  recommendedTerms?: number;
}

export default function LoanDetailsModal({}: LoanDetailsModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [loanType, setLoanType] = useState<string>("");
  const [loanSubClass, setLoanSubClass] = useState<string>("");
  const [clientData, setClientData] = useState<ClientData>({
    type: "",
    title: "",
    lastName: "",
    firstName: "",
    midName: "",
    birthDate: "",
    gender: "",
    civilStatus: "",
    nationality: "",
    facebook: "",
    idPresented: "",
    sss: "",
    tin: "",
    landline: "",
    mobile: "",
    email: "",
    remarks: "",
    addressLine: "",
    addressMain: "",
    addressType: "",
    country: "",
    zipCode: "",
    province: "",
    city: "",
    barangay: "",
    sitio: "",
    street: "",
    homeNo: "",
    owned: "",
    value: "",
    income: 0,
    charges: [],
    collateralIncome: 0,
    childBeneficiaryAge: 0,
    healthStatus: "",
    clientAge: 0,
    ifLivingSpouseAge: 0,
    status: "",
    loanId: "",
    appliedOn: "",
    processType: "",
    coMaker: "",
    contactNo: "",
    coMakerRelationship: "",
    otherInfoMOA: "",
    requestedBy: "",
  });
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [incomeDetails, setIncomeDetails] = useState<string>("");
  const [collateralDetails, setCollateralDetails] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails>({
    monthlyAmortization: 0,
    paymentSchedule: "",
    appliedPrincipalLoan: 0,
    grantedPrincipalLoan: 0,
    totalTerms: 2,
    remainingTerms: 0,
    totalInterest: 0,
    firstDue: "",
    endDue: "",
    lessTotalCharges: 0,
    netRelease: 0,
    charges: [],
    recommendedTerms: 0,
  });
  const [activeTab, setActiveTab] = useState("client");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [openSections, setOpenSections] = useState({
    loanDetails: true,
    personalDetails: true,
    contactInfo: true,
    identification: true,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setCapturedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("clientRegistrationData");
    if (savedData) {
      try {
        const parsedData: SavedData = JSON.parse(savedData);
        setLoanType(parsedData.loanType || "");
        setLoanSubClass(parsedData.loanSubClass || "");
        setClientData(parsedData.client || {
          type: "",
          title: "",
          lastName: "",
          firstName: "",
          midName: "",
          birthDate: "",
          gender: "",
          civilStatus: "",
          nationality: "",
          facebook: "",
          idPresented: "",
          sss: "",
          tin: "",
          landline: "",
          mobile: "",
          email: "",
          remarks: "",
          addressLine: "",
          addressMain: "",
          addressType: "",
          country: "",
          zipCode: "",
          province: "",
          city: "",
          barangay: "",
          sitio: "",
          street: "",
          homeNo: "",
          owned: "",
          value: "",
          income: 0,
          charges: [],
          collateralIncome: 0,
          childBeneficiaryAge: 0,
          healthStatus: "",
          clientAge: 0,
          ifLivingSpouseAge: 0,
          status: "",
          loanId: "",
          appliedOn: "",
          processType: "",
          coMaker: "",
          contactNo: "",
          coMakerRelationship: "",
          otherInfoMOA: "",
          requestedBy: "",
        });
        setCapturedImages(parsedData.capturedImages || []);
        setIncomeDetails(parsedData.incomeDetails || "");
        setCollateralDetails(parsedData.collateralDetails || "");
        setRemarks(parsedData.client.remarks || "");
      } catch (error) {
        console.error("Failed to parse client data from localStorage:", error);
        alert("Error loading client data. Please try again.");
      }
    }
  }, []);

  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClientDateChange = (name: string) => (selectedDates: Date[]) => {
    const formattedDate = selectedDates[0] ? selectedDates[0].toISOString().split("T")[0] : "";
    setClientData((prev) => ({
      ...prev,
      [name]: formattedDate,
    }));
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

  const handleSubmit = () => {
    if (!loanType || !applicationDetails.appliedPrincipalLoan || !applicationDetails.totalInterest) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedData: SavedData = {
      loanType,
      loanSubClass,
      client: clientData,
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

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const civilStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  const coMakerRelationshipOptions = [
    { value: "spouse", label: "Spouse" },
    { value: "parent", label: "Parent" },
    { value: "sibling", label: "Sibling" },
    { value: "other", label: "Other" },
  ];

  const healthStatusOptions = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
  ];

  const handleBack = () => {
    setIsOpen(false);
    router.push("/loans/loan-application");
  };

  const handleClose = () => {
    setIsOpen(false);
    router.push("/loans/loan-application");
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isFullscreen={true} showCloseButton={true}>
      <div className="fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 lg:p-10">
        <div>
          <h4 className="font-semibold text-gray-800 mb-6 text-2xl dark:text-white/90">Loan Details</h4>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Review and edit the loan type, client details, application details, and associated documents below.
          </p>

          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "client" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"} dark:text-gray-400 dark:hover:text-white transition-colors`}
              onClick={() => setActiveTab("client")}
            >
              Client Information
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "application" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"} dark:text-gray-400 dark:hover:text-white transition-colors`}
              onClick={() => setActiveTab("application")}
            >
              Application Details
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "documents" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"} dark:text-gray-400 dark:hover:text-white transition-colors`}
              onClick={() => setActiveTab("documents")}
            >
              Documents and Images
            </button>
          </div>

          {clientData && (
            <>
              {activeTab === "client" && (
                <div className="max-w-5xl mx-auto bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                        {formatFullName(clientData) || "Client Name"}
                      </h2>
                      <p className="text-md text-gray-600 dark:text-gray-300 mt-2 flex items-center space-x-4">
                        <span>{loanType || "Loan Type Not Specified"}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          {clientData.status || "Pending"}
                        </span>
                      </p>
                    </div>
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-md">
                      {capturedImages.length > 0 ? (
                        <img src={capturedImages[0]} alt="Client Selfie" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                          No Client Selfie
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Accordion Sections */}
                  <div className="space-y-4">
                    {/* Loan Details */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => toggleSection("loanDetails")}
                        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 transition-colors"
                      >
                        Loan Details
                        <ChevronDownIcon
                          className={`w-5 h-5 transform ${openSections.loanDetails ? "rotate-180" : ""} transition-transform`}
                        />
                      </button>
                      {openSections.loanDetails && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Loan Class</Label>
                            <Select
                              value={loanType}
                              onChange={(e) => setLoanType(e.target.value)}
                              options={loanClassOptions}
                              className="h-10 w-full rounded-md border appearance-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <Label>Loan Subclass</Label>
                            <Select
                              value={loanSubClass}
                              onChange={(e) => setLoanSubClass(e.target.value)}
                              options={loanType ? loanSubClassOptions[loanType as keyof typeof loanSubClassOptions] || [] : []}
                              className="h-10 w-full rounded-md border appearance-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              disabled={!loanType}
                            />
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Input
                              name="status"
                              value={clientData.status}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter status"
                            />
                          </div>
                          <div>
                            <Label>Loan ID</Label>
                            <Input
                              name="loanId"
                              value={clientData.loanId}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter loan ID"
                            />
                          </div>
                          <div>
                            <Label>Applied On</Label>
                            <DatePicker
                              id="appliedOn"
                              defaultDate={clientData.appliedOn}
                              onChange={handleClientDateChange("appliedOn")}
                              placeholder="Select applied date"
                            />
                          </div>
                          <div>
                            <Label>Process Type</Label>
                            <Input
                              name="processType"
                              value={clientData.processType}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter process type"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Personal Details */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => toggleSection("personalDetails")}
                        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 transition-colors"
                      >
                        Personal Details
                        <ChevronDownIcon
                          className={`w-5 h-5 transform ${openSections.personalDetails ? "rotate-180" : ""} transition-transform`}
                        />
                      </button>
                      {openSections.personalDetails && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              name="title"
                              value={clientData.title}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter title"
                            />
                          </div>
                          <div>
                            <Label>First Name</Label>
                            <Input
                              name="firstName"
                              value={clientData.firstName}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div>
                            <Label>Middle Name</Label>
                            <Input
                              name="midName"
                              value={clientData.midName}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter middle name"
                            />
                          </div>
                          <div>
                            <Label>Last Name</Label>
                            <Input
                              name="lastName"
                              value={clientData.lastName}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter last name"
                            />
                          </div>
                          <div>
                            <Label>Birth Date</Label>
                            <DatePicker
                              id="birthDate"
                              defaultDate={clientData.birthDate}
                              onChange={handleClientDateChange("birthDate")}
                              placeholder="Select birth date"
                            />
                          </div>
                          <div>
                            <Label>Gender</Label>
                            <Select
                              name="gender"
                              value={clientData.gender}
                              onChange={handleClientInputChange}
                              options={genderOptions}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Select gender"
                            />
                          </div>
                          <div>
                            <Label>Civil Status</Label>
                            <Select
                              name="civilStatus"
                              value={clientData.civilStatus}
                              onChange={handleClientInputChange}
                              options={civilStatusOptions}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Select civil status"
                            />
                          </div>
                          <div>
                            <Label>Nationality</Label>
                            <Input
                              name="nationality"
                              value={clientData.nationality}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter nationality"
                            />
                          </div>
                          <div>
                            <Label>Client Age</Label>
                            <Input
                              name="clientAge"
                              type="number"
                              value={clientData.clientAge}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter client age"
                            />
                          </div>
                          <div>
                            <Label>Health Status</Label>
                            <Select
                              name="healthStatus"
                              value={clientData.healthStatus}
                              onChange={handleClientInputChange}
                              options={healthStatusOptions}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Select health status"
                            />
                          </div>
                          <div>
                            <Label>Child Beneficiary Age</Label>
                            <Input
                              name="childBeneficiaryAge"
                              type="number"
                              value={clientData.childBeneficiaryAge}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter child beneficiary age"
                            />
                          </div>
                          <div>
                            <Label>If Living Spouse Age</Label>
                            <Input
                              name="ifLivingSpouseAge"
                              type="number"
                              value={clientData.ifLivingSpouseAge}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter living spouse age"
                            />
                          </div>
                          <div>
                            <Label>Collateral Income</Label>
                            <Input
                              name="collateralIncome"
                              type="number"
                              value={clientData.collateralIncome}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter collateral income"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => toggleSection("contactInfo")}
                        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 transition-colors"
                      >
                        Contact Information
                        <ChevronDownIcon
                          className={`w-5 h-5 transform ${openSections.contactInfo ? "rotate-180" : ""} transition-transform`}
                        />
                      </button>
                      {openSections.contactInfo && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Address Line</Label>
                            <Input
                              name="addressLine"
                              value={clientData.addressLine}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter address line"
                            />
                          </div>
                          <div>
                            <Label>Address Main</Label>
                            <Input
                              name="addressMain"
                              value={clientData.addressMain}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter address main"
                            />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input
                              name="city"
                              value={clientData.city}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter city"
                            />
                          </div>
                          <div>
                            <Label>Province</Label>
                            <Input
                              name="province"
                              value={clientData.province}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter province"
                            />
                          </div>
                          <div>
                            <Label>Country</Label>
                            <Input
                              name="country"
                              value={clientData.country}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter country"
                            />
                          </div>
                          <div>
                            <Label>Zip Code</Label>
                            <Input
                              name="zipCode"
                              value={clientData.zipCode}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter zip code"
                            />
                          </div>
                          <div>
                            <Label>Mobile</Label>
                            <Input
                              name="mobile"
                              value={clientData.mobile}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter mobile number"
                            />
                          </div>
                          <div>
                            <Label>Landline</Label>
                            <Input
                              name="landline"
                              value={clientData.landline}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter landline number"
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              name="email"
                              value={clientData.email}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter email"
                            />
                          </div>
                          <div>
                            <Label>Facebook</Label>
                            <Input
                              name="facebook"
                              value={clientData.facebook}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter Facebook"
                            />
                          </div>
                          <div>
                            <Label>Contact No.</Label>
                            <Input
                              name="contactNo"
                              value={clientData.contactNo}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter contact number"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Identification */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => toggleSection("identification")}
                        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 transition-colors"
                      >
                        Identification
                        <ChevronDownIcon
                          className={`w-5 h-5 transform ${openSections.identification ? "rotate-180" : ""} transition-transform`}
                        />
                      </button>
                      {openSections.identification && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>ID Presented</Label>
                            <Input
                              name="idPresented"
                              value={clientData.idPresented}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter ID presented"
                            />
                          </div>
                          <div>
                            <Label>SSS</Label>
                            <Input
                              name="sss"
                              value={clientData.sss}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter SSS"
                            />
                          </div>
                          <div>
                            <Label>TIN</Label>
                            <Input
                              name="tin"
                              value={clientData.tin}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter TIN"
                            />
                          </div>
                          <div>
                            <Label>Co-Maker</Label>
                            <Input
                              name="coMaker"
                              value={clientData.coMaker}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter co-maker"
                            />
                          </div>
                          <div>
                            <Label>Co-Maker Relationship</Label>
                            <Select
                              name="coMakerRelationship"
                              value={clientData.coMakerRelationship ?? ""}
                              onChange={handleClientInputChange}
                              options={coMakerRelationshipOptions}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Select relationship"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Remarks</Label>
                            <Textarea
                              name="remarks"
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter remarks"
                            />
                          </div>
                          <div>
                            <Label>Requested By</Label>
                            <Input
                              name="requestedBy"
                              value={clientData.requestedBy}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter requested by"
                            />
                          </div>
                          <div>
                            <Label>Other Info MOA</Label>
                            <Input
                              name="otherInfoMOA"
                              value={clientData.otherInfoMOA}
                              onChange={handleClientInputChange}
                              className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                              placeholder="Enter other info MOA"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "application" && (
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90">Loan Details</h5>
                  <div className="space-y-6">
                    <div>
                      <Label>Schedule of Payment (Day(s) of the Month)</Label>
                      <Input
                        name="paymentSchedule"
                        value={applicationDetails.paymentSchedule}
                        onChange={handleApplicationInputChange}
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                          className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                          className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white font-bold"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                        className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
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
                          className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                          placeholder="Charge Name"
                        />
                        <Input
                          value={charge.code}
                          onChange={(e) => handleChargeChange(index, "code", e.target.value)}
                          className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                          placeholder="Charge Code"
                        />
                        <Input
                          type="number"
                          value={charge.price}
                          onChange={(e) => handleChargeChange(index, "price", e.target.value)}
                          className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                          min="0"
                          placeholder="Price"
                        />
                      </div>
                    ))}
                    <Button size="sm" variant="outline" onClick={addCharge} className="mt-2 flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900">
                      <PlusIcon className="mr-2 h-4 w-4" /> Add Charge
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Documents and Images</h3>
                  <div className="mb-6">
                    <Label>Upload Requirements</Label>
                    <div
                      {...getRootProps()}
                      className={`w-1/2 mx-auto h-52 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center ${
                        isDragActive
                          ? "border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-900"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-700"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isDragActive
                          ? "Drop the files here ..."
                          : "Drag and drop images or PDFs here, or click to select files"}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        (Accepted formats: PNG, JPG, JPEG, GIF, PDF)
                      </p>
                    </div>
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
          )}
        </div>

        <div className="flex items-center justify-end w-full gap-4 mt-8">
          <Button size="sm" variant="outline" onClick={handleBack} className="text-gray-600 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            Back
          </Button>
          <Button size="sm" onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}