/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Switch from "@/components/form/switch/Switch";
import { useDropzone } from "react-dropzone";

interface ClientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanType: string;
  onSubmit: () => void;
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
}

export default function ClientRegistrationModal({
  isOpen,
  onClose,
  loanType,
  onSubmit,
}: ClientRegistrationModalProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<ClientData>({
    type: "Customer",
    title: "",
    lastName: "",
    firstName: "",
    midName: "",
    birthDate: "",
    gender: "Male",
    civilStatus: "Married",
    nationality: "Filipino",
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
  });
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Valid IDs in the Philippines
  const validIds = [
    "Philippine Passport",
    "Driver’s License",
    "Social Security System (SSS) ID",
    "Unified Multi-Purpose ID (UMID)",
    "PhilHealth ID",
    "Philippine National ID (PhilID)",
    "Tax Identification Number (TIN) ID",
    "Voter’s ID",
    "Postal ID",
    "Professional Regulation Commission (PRC) ID",
    "Government Service Insurance System (GSIS) eCard",
    "National Bureau of Investigation (NBI) Clearance",
    "Senior Citizen ID",
    "Barangay ID",
    "Philippine National Police (PNP) ID",
    "Overseas Workers Welfare Administration (OWWA) ID",
    "Integrated Bar of the Philippines (IBP) ID",
  ];

  // Define tabs for pagination
  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "financial", label: "Financial Info" },
    { id: "address", label: "Address" },
    { id: "upload", label: "Upload Docs" },
    { id: "capture", label: "Capture Photo" },
  ];

  // Pagination navigation with event propagation fix
  const handleNextTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Next button clicked"); // Debug log
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePreviousTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Previous button clicked"); // Debug log
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  // Debug onClose trigger
  const handleClose = () => {
    console.log("Modal onClose triggered"); // Debug log
    onClose();
  };

  // Start/stop camera when tab changes
  useEffect(() => {
    let isMounted = true;

    if (activeTab === "capture" && isOpen) {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera not supported in this browser.");
        return;
      }

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          if (!isMounted) return;
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current
              .play()
              .catch((err) => {
                if (isMounted) {
                  console.error("Video play failed:", err);
                  setCameraError("Failed to play video stream.");
                }
              });
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error("Error accessing camera:", err);
            setCameraError("Unable to access camera. Please upload an image manually.");
          }
        });
    }

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [activeTab, isOpen]);

  const handleCapture = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const imageData = canvasRef.current.toDataURL("image/png");
    setCapturedImages((prev) => [...prev, imageData]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOwnedToggle = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, owned: checked }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Submit button clicked"); // Debug log
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.addressLine) {
      alert("Please fill out all required fields: First Name, Last Name, Email, Mobile, and Address Line.");
      return;
    }

    const dataToSave = {
      loanType,
      client: formData,
      capturedImages,
    };
    try {
      localStorage.setItem("clientRegistrationData", JSON.stringify(dataToSave));
      console.log("Saved to localStorage:", dataToSave);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
      alert("Failed to save client data. Please try again.");
      return;
    }

    onSubmit();
    handleClose();
  };

  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
  };

  const onDropImage = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onDropImage,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSkipUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTab("capture");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-2xl w-full mx-auto my-4">
      <div
        className="no-scrollbar relative w-full overflow-y-auto rounded-xl bg-white dark:bg-gray-900 p-6 lg:p-8 shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Client Registration - {loanType}
          </h4>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Fill out the details below to register a client for the selected loan type.
        </p>

        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`flex-1 text-center text-xs font-medium ${
                  index <= tabs.findIndex((t) => t.id === activeTab)
                    ? "text-brand-500"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                Step {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${((tabs.findIndex((t) => t.id === activeTab) + 1) / tabs.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Tab Navigation */}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log(`Tab ${tab.id} clicked`); // Debug log
                  setActiveTab(tab.id);
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form className="flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="custom-scrollbar max-h-[400px] overflow-y-auto px-4 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {activeTab === "personal" && (
              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Type *</Label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    >
                      <option>Customer</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">First Name *</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Last Name *</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Middle Name</Label>
                    <Input
                      type="text"
                      name="midName"
                      value={formData.midName}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Birthdate</Label>
                    <Input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Gender</Label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Civil Status</Label>
                    <select
                      name="civilStatus"
                      value={formData.civilStatus}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    >
                      <option>Married</option>
                      <option>Single</option>
                      <option>Widowed</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Nationality</Label>
                    <Input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Facebook</Label>
                    <Input
                      type="text"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">ID Presented</Label>
                    <select
                      name="idPresented"
                      value={formData.idPresented}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    >
                      <option value="">Select ID</option>
                      {validIds.map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "financial" && (
              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Financial Information
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">SSS</Label>
                    <Input
                      type="text"
                      name="sss"
                      value={formData.sss}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">TIN</Label>
                    <Input
                      type="text"
                      name="tin"
                      value={formData.tin}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Landline</Label>
                    <Input
                      type="text"
                      name="landline"
                      value={formData.landline}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Mobile *</Label>
                    <Input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Remarks</Label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "address" && (
              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Address
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Address Line *</Label>
                    <Input
                      type="text"
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Main</Label>
                    <Input
                      type="text"
                      name="addressMain"
                      value={formData.addressMain}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Type</Label>
                    <Input
                      type="text"
                      name="addressType"
                      value={formData.addressType}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Country</Label>
                    <Input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Province</Label>
                    <Input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Barangay</Label>
                    <Input
                      type="text"
                      name="barangay"
                      value={formData.barangay}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Sitio</Label>
                    <Input
                      type="text"
                      name="sitio"
                      value={formData.sitio}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Street</Label>
                    <Input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Home No.</Label>
                    <Input
                      type="text"
                      name="homeNo"
                      value={formData.homeNo}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Owned</Label>
                    <Switch
                      label="Property Owned"
                      defaultChecked={formData.owned}
                      onChange={handleOwnedToggle}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 dark:text-gray-200">Value</Label>
                    <Input
                      type="text"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "upload" && (
              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Upload Documents
                </h5>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-brand-500 transition bg-gray-50 dark:bg-gray-800">
                  <div
                    {...getRootProps()}
                    className={`p-6 rounded-md text-center ${
                      isDragActive
                        ? "border-2 border-brand-500 bg-gray-100 dark:bg-gray-700"
                        : "bg-white dark:bg-gray-600"
                    } transition`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900 text-brand-500">
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
                      <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                        {isDragActive ? "Drop Files Here" : "Drag & Drop Documents"}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                        Upload signatures or ID with signature (PNG, JPG, WebP, SVG)
                      </p>
                      <span className="font-medium text-xs text-brand-500 hover:underline cursor-pointer">
                        Browse Files
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSkipUpload}
                    className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition text-sm"
                  >
                    Skip to Photo Capture
                  </Button>
                </div>
              </div>
            )}
            {activeTab === "capture" && (
              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Capture Photo
                </h5>
                <div className="flex flex-col items-center">
                  {cameraError ? (
                    <p className="text-red-500 text-xs mb-4 text-center bg-red-50 dark:bg-red-900/50 p-3 rounded-md">
                      {cameraError}
                    </p>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full max-w-md h-64 object-cover rounded-lg mb-4 border border-gray-300 dark:border-gray-600 shadow-sm"
                      />
                      <canvas
                        ref={canvasRef}
                        width={640}
                        height={480}
                        className="hidden"
                      />
                      <Button
                        size="sm"
                        onClick={handleCapture}
                        className="mb-4 px-4 py-1.5 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition shadow-sm text-sm"
                        disabled={!!cameraError}
                      >
                        Capture Photo
                      </Button>
                    </>
                  )}
                  {capturedImages.length > 0 && (
                    <div className="mb-4 w-full">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">
                        Captured/Uploaded Images
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {capturedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md border border-gray-300 dark:border-gray-600 shadow-sm transition-transform group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pagination and Action Buttons */}
          <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handlePreviousTab}
                disabled={tabs.findIndex((tab) => tab.id === activeTab) === 0}
                className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition disabled:opacity-50 shadow-sm text-sm"
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleNextTab}
                disabled={tabs.findIndex((tab) => tab.id === activeTab) === tabs.length - 1}
                className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition disabled:opacity-50 shadow-sm text-sm"
              >
                Next
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handleClose}
                className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition shadow-sm text-sm"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.mobile ||
                  !formData.addressLine
                }
                className="px-4 py-1.5 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition disabled:opacity-50 shadow-sm text-sm"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}