"use client"
import React from 'react';
import BorderContainer from '../Bordercontainer';
import Image from 'next/image';
import BorderDomain from '../BorderDomain';
import title1 from '@/assets/images/Title1.png'
import title2 from '@/assets/images/Title2.png'
import { IGetLandingPageResponse } from '@/types/landingPage';
const Contact = ({ website }: { website: IGetLandingPageResponse }) => {
    if (!website) {
        return <p>Failed to load data.</p>;
    }
    return (
        <div className="absolute flex flex-col gap-8 left-4 right-4">
            <BorderContainer>
                <div className="relative my-4 max-w-[568px] mx-auto aspect-[9.16129]">
                    <Image
                        src={title1}
                        alt="title1"
                        fill
                        className="flex justify-center object-contain"
                    />
                </div>
                <div className="relative px-6">
                    <h2
                        style={{
                            textShadow:
                                "8px 0 10px #395193, 8px 0px 10px #395193, 0px 8px 10px #395193, 0px -8px 10px #395193, 0 0 20px #0EECEE",
                        }}
                        className="text-7xl font-bold text-[#0EECEE] text-center"
                    >
                        {website?.domain_main_website ?? ''}
                    </h2>
                    <div className="w-full bg-[#0eecee] h-[1px] mt-1" />
                    <div className="flex justify-center pt-6 pb-8 text-xs">
                        <button className="mr-4 glow-button"></button>
                        <span className="text-[#0eecee] mr-1 font-hakgyoansim">{website?.domain_main_website ?? ''}</span>
                        <span className="text-[#d4dfdf]">{website?.description ?? ''}</span>
                        <button className="ml-4 glow-button"></button>
                    </div>
                </div>
            </BorderContainer>
            {/* Domain */}
            <BorderContainer>
                <div className="relative my-4 max-w-[568px] mx-auto aspect-[9.16129]">
                    <Image
                        src={title2}
                        alt="title2"
                        fill
                        className="flex justify-center object-contain"
                    />
                </div>

                <div className="flex flex-col gap-2 px-6">
                    {website.list_domain.length > 0 && (
                        website.list_domain.map((listDomain, index) => (
                            <BorderDomain key={index}>
                                <p
                                    style={{
                                        textShadow:
                                            "0px 0 0px #395193, 0px 0px 5px #395193, 0px 0px 0px #395193, 0px -8px 10px #395193, 0 0 20px #0EECEE",
                                    }}
                                    className="py-4 text-center text-[#0eecee] font-extrabold font-pretendardjp text-[32px]"
                                >
                                    {listDomain}
                                </p>
                            </BorderDomain>
                        ))
                    )}
                </div>
                <div className="flex items-center justify-center gap-4 pt-6 pb-8 text-xs">
                    <button className="glow-button"></button>
                    <span className="text-[#e2ecec]">{website?.telegram ?? ''}</span>
                    <button className="glow-button"></button>
                </div>
            </BorderContainer>
        </div>
    );
};

export default Contact;