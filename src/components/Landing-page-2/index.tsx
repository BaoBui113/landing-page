"use client";

import landingpage2 from "@/assets/images/landing-page-2.jpg";
import ipad_reponsive from "@/assets/images/ipad-responsive.jpg";
import reponsive from "@/assets/images/landingpage2-responsive.jpg";
import Image from "next/image";
import React from "react";

export default function LandingPage2Component({
  website,
}: {
  website: { telegram: string; domain_main_website: string, list_domain: string[] };
}) {
  const handleNavigateMainWebsite = () => {
    if (website?.list_domain.length > 0) {
      window.open(website?.list_domain[0], "_blank");
      return;
    }
    return
  };

  return (
    <div onClick={handleNavigateMainWebsite}>
      {/* Desktop (md and above) */}
      <div className="hidden md:block relative w-full h-screen cursor-pointer bg-black">
        <Image
          src={landingpage2}
          alt="landingpage2"
          fill
          className="object-contain"
        />
      </div>

      {/* Tablet (sm and above, but below md) */}
      <div className="hidden sm:block md:hidden relative w-full h-screen cursor-pointer bg-black">
        <Image
          src={ipad_reponsive}
          alt="ipad_reponsive"
          fill

          className="object-contain"
        />
      </div>


      <div className="block sm:hidden relative w-full h-screen cursor-pointer bg-black">
        <Image src={reponsive} alt="reponsive" loading="lazy" fill className="object-contain" />
      </div>
    </div>
  );
}
