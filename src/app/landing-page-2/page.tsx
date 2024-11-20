"use client"
import LandingPage2Component from "@/components/Landing-page-2";
import { useGetLandingPageKey } from "@/services/landing-page";

import React from "react";
export default function LandingPage2() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_LANDING_PAGE_2 ?? '';


  const { landingPageDetail } = useGetLandingPageKey(apiKey);
  return (
    <div className="w-full h-full">
      {!!landingPageDetail ? <LandingPage2Component website={landingPageDetail} /> : <div className="flex justify-center">Not found Landing page</div>}

    </div>
  );
}
