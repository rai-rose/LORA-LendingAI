/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/form-elements/SelectInputs";
import Textarea from "@/components/form/form-elements/TextAreaInput";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { CalenderIcon, PlusIcon, ChevronDownIcon } from "@/icons";
import { useDropzone } from "react-dropzone";
import { useModal } from "@/hooks/useModal";
import WarningModal from "@/components/ui/modal/WarningModal"; // Import the new WarningModal

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
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 transition-all duration-200"
          aria-label={label || placeholder || "Date picker"}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none">
          <CalenderIcon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

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
  owned: boolean;
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
  loanId: string;
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

export default function LoanDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
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
    owned: false,
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
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    loanDetails: true,
    personalDetails: true,
    contactInfo: true,
    identification: true,
  });
  const [error, setError] = useState<string | null>(null);
  const errorModal = useModal();

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
    if (typeof id === "string") {
      const savedData = localStorage.getItem(`clientRegistrationData_${id}`);
      const savedApplicationData = localStorage.getItem(`applicationDetails_${id}`);
      if (savedData) {
        try {
          const parsedData: SavedData = JSON.parse(savedData);
          if (parsedData.loanId === id) {
            setLoanType(parsedData.loanType || "");
            setLoanSubClass(parsedData.loanSubClass || "");
            setClientData({
              ...parsedData.client,
              owned: typeof parsedData.client.owned === "string"
                ? parsedData.client.owned === "true"
                : !!parsedData.client.owned,
            });
            setCapturedImages(parsedData.capturedImages || []);
            setIncomeDetails(parsedData.incomeDetails || "");
            setCollateralDetails(parsedData.collateralDetails || "");
            setRemarks(parsedData.client.remarks || "");
          } else {
            setError("Invalid loan data.");
          }
        } catch (error) {
          console.error("Failed to parse client data from localStorage:", error);
          setError("Error loading client data. Please try again.");
        }
      } else {
        setError("Loan not found.");
      }

      if (savedApplicationData) {
        try {
          const parsedApplicationData: ApplicationDetails = JSON.parse(savedApplicationData);
          setApplicationDetails(parsedApplicationData);
        } catch (error) {
          console.error("Failed to parse application details from localStorage:", error);
        }
      }
    } else {
      setError("Invalid loan ID.");
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      errorModal.openModal();
    }
  }, [error, errorModal]);

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
      [name]: name.includes("Loan") || name.includes("Terms") || name.includes("Charges") ? Number(value) : value,
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
      const lessTotalCharges = updatedCharges.reduce((sum, charge) => sum + charge.price, 0);
      return {
        ...prev,
        charges: updatedCharges,
        lessTotalCharges,
        netRelease: prev.grantedPrincipalLoan - lessTotalCharges,
      };
    });
  };

  const addCharge = () => {
    setApplicationDetails((prev) => ({
      ...prev,
      charges: [...prev.charges, { code: "", name: "", price: 0 }],
      netRelease: prev.grantedPrincipalLoan - prev.lessTotalCharges,
    }));
  };

  const handleSubmit = () => {
    if (
      !loanType ||
      !applicationDetails.appliedPrincipalLoan ||
      !applicationDetails.totalInterest ||
      !clientData.firstName ||
      !clientData.lastName ||
      !clientData.email ||
      !clientData.mobile
    ) {
      setError("Please fill in all required fields: Loan Type, First Name, Last Name, Email, Mobile, Applied Principal Loan, and Total Interest.");
      return;
    }

    const updatedData: SavedData = {
      loanId: id as string,
      loanType,
      loanSubClass,
      client: clientData,
      capturedImages,
      incomeDetails,
      collateralDetails,
    };
    localStorage.setItem(`clientRegistrationData_${id}`, JSON.stringify(updatedData));
    localStorage.setItem(`applicationDetails_${id}`, JSON.stringify(applicationDetails));

    console.log("Submitting loan application:", { updatedData, applicationDetails });
    alert("Loan application recommended for approval!");
    router.push("/loans/loan-application");
  };

  const formatFullName = (client: ClientData) => {
    const fullName = `${client.title || ""} ${client.firstName || ""} ${client.midName || ""} ${client.lastName || ""}`.trim();
    return fullName.toUpperCase();
  };

  const tabs = [
    { id: "client", label: "Client Information" },
    { id: "application", label: "Application Details" },
    { id: "documents", label: "Documents & Images" },
  ];

  const loanClassOptions = [
    { value: "personal", label: "Personal Loan" },
    { value: "business", label: "Business Loan" },
    { value: "mortgage", label: "Mortgage Loan" },
  ];

  const loanSubClassOptions: { [key: string]: { value: string; label: string }[] } = {
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
    router.push("/loans/loan-application");
  };

  const handleErrorModalClose = () => {
    errorModal.closeModal();
    handleBack();
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 lg:p-8">
        <WarningModal
          isOpen={errorModal.isOpen}
          onClose={handleErrorModalClose}
          errorMessage={error}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800 shadow-lg">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex gap-3" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-1.5 text-sm font-medium rounded-t-md transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-brand-500 text-white border-b-2 border-brand-500"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {clientData && (
        <>
          {activeTab === "client" && (
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                    {formatFullName(clientData) || "Client Name"}
                  </h2>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{loanType || "Loan Type Not Specified"}</span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {clientData.loanId || "Loan ID Not Specified"}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {clientData.status || "Pending"}
                    </span>
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-sm">
                  {capturedImages.length > 0 ? (
                    <img src={capturedImages[0]} alt="Client Selfie" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">
                      No Selfie
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => toggleSection("loanDetails")}
                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                    aria-expanded={openSections.loanDetails}
                  >
                    Loan Details
                    <ChevronDownIcon
                      className={`w-5 h-5 transform ${openSections.loanDetails ? "rotate-180" : ""} transition-transform duration-200`}
                    />
                  </button>
                  {openSections.loanDetails && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label>Loan Class</Label>
                        <Select
                          value={loanType}
                          onChange={(e) => {
                            setLoanType(e.target.value);
                            setLoanSubClass("");
                          }}
                          options={loanClassOptions}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label>Loan Subclass</Label>
                        <Select
                          value={loanSubClass}
                          onChange={(e) => setLoanSubClass(e.target.value)}
                          options={loanType in loanSubClassOptions ? loanSubClassOptions[loanType] : []}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          disabled={!loanType}
                          aria-required="true"
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
                          value={clientData.processType ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter process type"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => toggleSection("personalDetails")}
                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                    aria-expanded={openSections.personalDetails}
                  >
                    Personal Details
                    <ChevronDownIcon
                      className={`w-5 h-5 transform ${openSections.personalDetails ? "rotate-180" : ""} transition-transform duration-200`}
                    />
                  </button>
                  {openSections.personalDetails && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <Label>Title</Label>
                        <Input
                          name="title"
                          value={clientData.title}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <Label>First Name</Label>
                        <Input
                          name="firstName"
                          value={clientData.firstName}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter first name"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label>Middle Name</Label>
                        <Input
                          name="midName"
                          value={clientData.midName}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter middle name"
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          name="lastName"
                          value={clientData.lastName}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter last name"
                          aria-required="true"
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
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
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
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Select civil status"
                        />
                      </div>
                      <div>
                        <Label>Nationality</Label>
                        <Input
                          name="nationality"
                          value={clientData.nationality}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter nationality"
                        />
                      </div>
                      <div>
                        <Label>Client Age</Label>
                        <Input
                          name="clientAge"
                          type="number"
                          value={clientData.clientAge ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter client age"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label>Health Status</Label>
                        <Select
                          name="healthStatus"
                          value={clientData.healthStatus ?? ""}
                          onChange={handleClientInputChange}
                          options={healthStatusOptions}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Select health status"
                        />
                      </div>
                      <div>
                        <Label>Child Beneficiary Age</Label>
                        <Input
                          name="childBeneficiaryAge"
                          type="number"
                          value={clientData.childBeneficiaryAge ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter child beneficiary age"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label>If Living Spouse Age</Label>
                        <Input
                          name="ifLivingSpouseAge"
                          type="number"
                          value={clientData.ifLivingSpouseAge ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter living spouse age"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label>Collateral Income</Label>
                        <Input
                          name="collateralIncome"
                          type="number"
                          value={clientData.collateralIncome ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter collateral income"
                          min="0"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => toggleSection("contactInfo")}
                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                    aria-expanded={openSections.contactInfo}
                  >
                    Contact Information
                    <ChevronDownIcon
                      className={`w-5 h-5 transform ${openSections.contactInfo ? "rotate-180" : ""} transition-transform duration-200`}
                    />
                  </button>
                  {openSections.contactInfo && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label>Address Line</Label>
                        <Input
                          name="addressLine"
                          value={clientData.addressLine}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter address line"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label>Address Main</Label>
                        <Input
                          name="addressMain"
                          value={clientData.addressMain}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter address main"
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          name="city"
                          value={clientData.city}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <Label>Province</Label>
                        <Input
                          name="province"
                          value={clientData.province}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter province"
                        />
                      </div>
                      <div>
                        <Label>Country</Label>
                        <Input
                          name="country"
                          value={clientData.country}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter country"
                        />
                      </div>
                      <div>
                        <Label>Zip Code</Label>
                        <Input
                          name="zipCode"
                          value={clientData.zipCode}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter zip code"
                        />
                      </div>
                      <div>
                        <Label>Mobile</Label>
                        <Input
                          name="mobile"
                          value={clientData.mobile}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter mobile number"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label>Landline</Label>
                        <Input
                          name="landline"
                          value={clientData.landline}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter landline number"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          name="email"
                          value={clientData.email}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter email"
                          type="email"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label>Facebook</Label>
                        <Input
                          name="facebook"
                          value={clientData.facebook}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter Facebook"
                        />
                      </div>
                      <div>
                        <Label>Contact No.</Label>
                        <Input
                          name="contactNo"
                          value={clientData.contactNo ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => toggleSection("identification")}
                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                    aria-expanded={openSections.identification}
                  >
                    Identification
                    <ChevronDownIcon
                      className={`w-5 h-5 transform ${openSections.identification ? "rotate-180" : ""} transition-transform duration-200`}
                    />
                  </button>
                  {openSections.identification && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label>ID Presented</Label>
                        <Input
                          name="idPresented"
                          value={clientData.idPresented}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter ID presented"
                        />
                      </div>
                      <div>
                        <Label>SSS</Label>
                        <Input
                          name="sss"
                          value={clientData.sss}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter SSS"
                        />
                      </div>
                      <div>
                        <Label>TIN</Label>
                        <Input
                          name="tin"
                          value={clientData.tin}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter TIN"
                        />
                      </div>
                      <div>
                        <Label>Co-Maker</Label>
                        <Input
                          name="coMaker"
                          value={clientData.coMaker ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
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
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Select relationship"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Remarks</Label>
                        <Textarea
                          name="remarks"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter remarks"
                        />
                      </div>
                      <div>
                        <Label>Requested By</Label>
                        <Input
                          name="requestedBy"
                          value={clientData.requestedBy ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                          placeholder="Enter requested by"
                        />
                      </div>
                      <div>
                        <Label>Other Info MOA</Label>
                        <Input
                          name="otherInfoMOA"
                          value={clientData.otherInfoMOA ?? ""}
                          onChange={handleClientInputChange}
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
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
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Loan Application Details</h2>
              <div className="space-y-6">
                <div>
                  <Label>Schedule of Payment (Day(s) of the Month)</Label>
                  <Input
                    name="paymentSchedule"
                    value={applicationDetails.paymentSchedule}
                    onChange={handleApplicationInputChange}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="Enter payment schedule"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label>Total Terms</Label>
                    <Input
                      name="totalTerms"
                      type="number"
                      value={applicationDetails.totalTerms}
                      onChange={handleApplicationInputChange}
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                      min="0"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <Label>Remaining Terms</Label>
                    <Input
                      name="remainingTerms"
                      type="number"
                      value={applicationDetails.remainingTerms}
                      onChange={handleApplicationInputChange}
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                      min="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label>First Due</Label>
                    <DatePicker
                      id="firstDue"
                      defaultDate={applicationDetails.firstDue}
                      onChange={handleDateChange("firstDue")}
                      placeholder="Select first due date"
                    />
                  </div>
                  <div>
                    <Label>End Due</Label>
                    <DatePicker
                      id="endDue"
                      defaultDate={applicationDetails.endDue}
                      onChange={handleDateChange("endDue")}
                      placeholder="Select end due date"
                    />
                  </div>
                </div>
                <div>
                  <Label>Recommended Terms</Label>
                  <Input
                    name="recommendedTerms"
                    type="number"
                    value={applicationDetails.recommendedTerms ?? ""}
                    onChange={handleApplicationInputChange}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
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
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="font-semibold text-gray-800 dark:text-white">Applied Principal Loan</Label>
                  <Input
                    name="appliedPrincipalLoan"
                    type="number"
                    value={applicationDetails.appliedPrincipalLoan}
                    onChange={handleApplicationInputChange}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white font-semibold focus:ring-2 focus:ring-primary transition-all duration-200"
                    min="0"
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label>Granted Principal Loan</Label>
                  <Input
                    name="grantedPrincipalLoan"
                    type="number"
                    value={applicationDetails.grantedPrincipalLoan}
                    onChange={handleApplicationInputChange}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
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
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                    min="0"
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label className="text-red-600 dark:text-red-400">Less Total Charges</Label>
                  <Input
                    name="lessTotalCharges"
                    type="number"
                    value={applicationDetails.lessTotalCharges}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
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
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                    min="0"
                    disabled
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Loan Charges/Deductions</h3>
                {applicationDetails.charges.map((charge, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-end">
                    <div>
                      <Label>Charge Name</Label>
                      <Input
                        value={charge.name}
                        onChange={(e) => handleChargeChange(index, "name", e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                        placeholder="Charge Name"
                      />
                    </div>
                    <div>
                      <Label>Charge Code</Label>
                      <Input
                        value={charge.code}
                        onChange={(e) => handleChargeChange(index, "code", e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                        placeholder="Charge Code"
                      />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={charge.price}
                        onChange={(e) => handleChargeChange(index, "price", e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200"
                        min="0"
                        placeholder="Price"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addCharge}
                  className="mt-2 flex items-center text-primary border-primary hover:bg-primary/10 dark:text-primary dark:border-primary dark:hover:bg-primary/20 transition-all duration-200"
                >
                  <PlusIcon className="mr-2 h-4 w-4" /> Add Charge
                </Button>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Documents & Images</h2>
              <div className="mb-8">
                <Label>Upload Requirements</Label>
                <div
                  {...getRootProps()}
                  className={`w-full sm:w-1/2 mx-auto h-54 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-brand-500 transition bg-gray-50 dark:bg-gray-800 duration-200 ${
                    isDragActive
                      ? "border-2 border-brand-500 bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-200"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-10 w-10 items-center mt-10 justify-center rounded-full bg-brand-100 dark:bg-brand-900 text-brand-500">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289L6.70711 7.87868C6.31658 8.2692 6.31658 8.90241 6.70711 9.29293C7.09763 9.68346 7.73085 9.68346 8.12137 9.29293L11 6.41421V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V6.41421L15.8787 9.29293C16.2692 9.68346 16.9024 9.68346 17.2929 9.29293C17.6834 8.90241 17.6834 8.2692 17.2929 7.87868L12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3ZM4 15C4 14.4477 3.55228 14 3 14C2.44772 14 2 14.4477 2 15V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V15C22 14.4477 21.5523 14 21 14C20.4477 14 20 14.4477 20 15V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V15Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {isDragActive
                      ? "Drop the files here ..."
                      : "Drag and drop images or PDFs here, or click to select files"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400 mt-2">
                    (Accepted formats: PNG, JPG, JPEG, GIF, PDF)
                  </p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Uploaded Images</h3>
                {capturedImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {capturedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 group-hover:shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No images available.</p>
                )}
              </div>
              <hr className="border-gray-200 dark:border-gray-600 mb-6" />
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Uploaded Documents</h3>
                {uploadedFiles.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-800 dark:text-white">{file.name}</li>
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

      <div className="flex items-center justify-end gap-4 p-6">
        <Button
          size="md"
          variant="outline"
          onClick={handleBack}
          className="text-gray-600 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-200"
        >
          Back
        </Button>
        <Button
          size="md"
          onClick={handleSubmit}
          className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 transition-all duration-200"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}