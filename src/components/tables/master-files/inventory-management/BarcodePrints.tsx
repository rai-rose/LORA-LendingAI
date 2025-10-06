"use client";

import React from "react";

export type BarcodeInfo = {
    img: string;
    title: string;
};

type BarcodePrintsProps = {
    barcodes: BarcodeInfo[];
};

const BarcodePrints: React.FC<BarcodePrintsProps> = ({ barcodes }) => {
    return (
        <div className="overflow-x-auto w-full rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
            <div className="flex flex-row justify-center items-center gap-4 min-w-[600px]">
                {barcodes.map((barcode, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center m-2 min-w-[180px] rounded-xl border border-gray-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.05] p-4">
                        <img src={barcode.img} alt="Barcode" className="w-32 h-auto bg-white mb-2" />
                        <div className="font-semibold text-gray-700 dark:text-white text-center">{barcode.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarcodePrints;