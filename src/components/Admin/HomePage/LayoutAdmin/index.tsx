import React from "react";
import Sidebar from "../SideBar";
import Header from "@/components/Admin/HomePage/Header";
export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full p-6">{children}</div>
      </div>
    </>
  );
}
