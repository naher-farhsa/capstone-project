"use client";
import { Sidebar } from "@/components/dashboard/Sidebar";
import IncomeTabs from "@/components/dashboard/Income/IncomeTabs";
import IncomeTopbar from "@/components/dashboard/Income/IncomeTopbar";
import React from "react";
import { useRouter } from "next/router";

export default function income() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="min-h-screen">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full space-x-6">
          <IncomeTopbar />
          <IncomeTabs />
        </div>
      </div>
    </div>
  );
}
