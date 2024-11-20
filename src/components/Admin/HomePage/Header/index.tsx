"use client";
import { Avatar } from "@nextui-org/react";
import React from "react";
import logo from "@/assets/images/landing-page.png";
import Image from "next/image";

export default function Header() {
  const Logo = () => {
    return (
      <div className="relative w-[35px] h-[35px]">
        <Image src={logo} alt="logo" fill />
      </div>
    );
  };
  return (
    <div className="bg-black flex justify-end p-6 text-white">
      <Avatar className="cursor-pointer" icon={<Logo />} />
    </div>
  );
}
