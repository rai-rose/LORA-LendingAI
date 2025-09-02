// "use client";
// import React, { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");
//   return (
//     <ComponentCard title="Textarea input field">
//       <div className="space-y-6">
//         {/* Default TextArea */}
//         <div>
//           <Label>Description</Label>
//           <TextArea
//             value={message}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>

//         {/* Disabled TextArea */}
//         <div>
//           <Label>Description</Label>
//           <TextArea rows={6} disabled />
//         </div>

//         {/* Error TextArea */}
//         <div>
//           <Label>Description</Label>
//           <TextArea
//             rows={6}
//             value={messageTwo}
//             error
//             onChange={(value) => setMessageTwo(value)}
//             hint="Please enter a valid message."
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }
"use client";
import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  rows = 6,
  disabled = false,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`min-h-[100px] w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 ${className}`}
    />
  );
};

export default TextArea;
