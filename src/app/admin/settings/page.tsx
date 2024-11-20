"use client";
import LayoutAdmin from "@/components/Admin/HomePage/LayoutAdmin";
import TableLandingPage from "@/components/Admin/HomePage/TableLandingPage";
import React from "react";

import { Button, useDisclosure } from "@nextui-org/react";
import ModalLandingPage from "@/components/Admin/HomePage/ModalLandingPage";
import { useGetLandingPageList } from "@/services/landing-page";
export default function LandingPage() {
  const { landingPageList, isLoading } = useGetLandingPageList();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleOpenModel = () => {
    onOpen();
  };
  return (
    <LayoutAdmin>
      <h3 className="text-center font-semibold text-2xl mb-6">
        Manage Landing Page
      </h3>
      <div className="flex justify-end mb-6">
        <Button onClick={handleOpenModel} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Page</Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!!landingPageList && <TableLandingPage landingPageList={landingPageList} />}
      <ModalLandingPage isOpen={isOpen} onOpenChange={onOpenChange} />
    </LayoutAdmin>
  );
}
