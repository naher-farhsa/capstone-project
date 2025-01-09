"use client";
import ExpensesTabs from "@/components/dashboard/Expenses/ExpensesTabs";
import ExpensesTopbar from "@/components/dashboard/Expenses/ExpensesTopbar";
import Topbar from "@/components/dashboard/Homepage/Topbar";
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
          <ExpensesTopbar />
          <ExpensesTabs />
        </div>
      </div>
    </div>
  );
}
