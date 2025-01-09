"use client";
import BudgetTabs from "@/components/dashboard/Budgeting/BudgetTabs";
import BudgetTopbar from "@/components/dashboard/Budgeting/BudgetTopbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useRouter } from "next/router";

export default function expenses() {
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
          <BudgetTopbar />
          <BudgetTabs />
        </div>
      </div>
    </div>
  );
}
