// "use client";
// import React, { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Select from "../Select";
// import MultiSelect from "../MultiSelect";
// import { ChevronDownIcon } from "@/icons";

// export default function SelectInputs() {
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];

//   const [selectedValues, setSelectedValues] = useState<string[]>([]);

//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };

//   const multiOptions = [
//     { value: "1", text: "Option 1", selected: false },
//     { value: "2", text: "Option 2", selected: false },
//     { value: "3", text: "Option 3", selected: false },
//     { value: "4", text: "Option 4", selected: false },
//     { value: "5", text: "Option 5", selected: false },
//   ];

//   return (
//     <ComponentCard title="Select Inputs">
//       <div className="space-y-6">
//         <div>
//           <Label>Select Input</Label>
//          <div className="relative">
//            <Select
//             options={options}
//             placeholder="Select Option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//           <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//               <ChevronDownIcon/>
//             </span>
//          </div>
//         </div>
//         <div className="relative">
//           <MultiSelect
//             label="Multiple Select Options"
//             options={multiOptions}
//             defaultSelected={["1", "3"]}
//             onChange={(values) => setSelectedValues(values)}
//           />
//           <p className="sr-only">
//             Selected Values: {selectedValues.join(", ")}
//           </p>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }
"use client";
import React from "react";
import { ChevronDownIcon } from "@/icons";

interface SelectProps {
  name?: string; // Add name to the interface
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
  disabled = false,
  placeholder = "Select Option",
}) => {
  return (
    <div className="relative">
      <select
        name={name} // Pass the name prop to the select element
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 pr-10 ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <ChevronDownIcon className="size-5" />
      </span>
    </div>
  );
};

export default Select;