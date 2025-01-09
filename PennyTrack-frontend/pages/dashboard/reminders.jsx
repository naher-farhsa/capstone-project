"use client";
import ReminderTabs from "@/components/dashboard/Reminders/ReminderTabs";
import ReminderTopbar from "@/components/dashboard/Reminders/ReminderTopbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useRouter } from "next/router";

export default function reminders() {
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
          <ReminderTopbar />
          <ReminderTabs />
        </div>
      </div>
    </div>
  );
}
