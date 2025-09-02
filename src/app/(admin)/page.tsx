import type { Metadata } from "next";
import React from "react";
import RecentLoanApplications from "@/components/dashboard/RecentLoanApplication";
import ThisMonth from "@/components/dashboard/ThisMonth";
import LendingAIChart from "@/components/dashboard/LendingAIChart";
import { LendingMetrics } from "@/components/dashboard/LendingMetrics";
import LendingAIGraphicCard from "@/components/dashboard/LendingAIGraphicCard";
import Statistics from "@/components/dashboard/Statistics";

export const metadata: Metadata = {
  title:
    "Lora Lending AI",
  description: "Lora is a modern and powerful admin dashboard template built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <LendingMetrics />

        <LendingAIChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <ThisMonth />
      </div>

      <div className="col-span-12">
        <Statistics />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <LendingAIGraphicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentLoanApplications />
      </div>
    </div>
  );
}
