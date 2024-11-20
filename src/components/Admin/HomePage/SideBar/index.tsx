"use client";
import { ACCESSTOKEN } from "@/contants/common";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Sidebar() {
  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESSTOKEN);
    }
    Cookies.remove(ACCESSTOKEN);
    router.push("/admin/login");
  };
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg flex flex-col py-[11px]">
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold">My Dashboard</h2>
      </div>
      <div className="flex flex-col items-center mt-4">
        <Avatar name="Admin" color="primary" className="mb-4" />
        <h3 className="text-lg font-semibold">Admin</h3>
      </div>
      <div className="mt-6 space-y-4 px-4">
        <Link
          href="/admin/settings"
          className="block p-3 rounded-lg hover:bg-gray-700"
        >
          Manage Landing page
        </Link>
      </div>
      <div className="mt-auto mb-4 px-4">
        <Button className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
