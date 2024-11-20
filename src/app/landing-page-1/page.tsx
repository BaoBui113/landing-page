"use client";
import Image from "next/image";
import header from "@/assets/images/header.png";
import content from "@/assets/images/content.png";
import footer from "@/assets/images/background.png";
import Contact from "@/components/Contact";
import InformationTeleGram from "@/components/InformationTele";
import { useGetLandingPageKey } from "@/services/landing-page";
const Homepage = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_LANDING_PAGE_1 ?? "";
  const { landingPageDetail } = useGetLandingPageKey(apiKey);

  return (
    <section className="bg-black">
      <div className="max-w-[800px] mx-auto">
        <div className="relative w-full aspect-[1.0738]">
          <Image src={header} alt="header" fill />
        </div>
        {!!landingPageDetail && <InformationTeleGram website={landingPageDetail} />}
        <div className="relative w-full aspect-[0.3052]">
          <Image src={content} alt="content" fill />
        </div>

        <div
          className="relative w-full bg-center bg-no-repeat z-10"
          style={{
            backgroundImage: `url(${footer.src})`,
            backgroundSize: "cover",
            minHeight: "750px",
          }}
        >
          {/* Contact */}
          {!!landingPageDetail && <Contact website={landingPageDetail} />}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
