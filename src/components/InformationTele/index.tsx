import React from 'react';
import backgroundTele from "@/assets/images/bg-tele.png"
import Image from 'next/image';
import container_tele from '@/assets/images/container-tele.png'
import text from '@/assets/images/text-korea.png'
import { IGetLandingPageResponse } from '@/types/landingPage';
const InformationTeleGram = ({ website }: { website?: IGetLandingPageResponse }) => {
    if (!website) {
        return <p>Failed to load data.</p>;
    }
    return (
        <div className='relative w-full pb-4 h-24'>
            <Image src={backgroundTele} alt='content' fill />
            <div className='relative min-h-[100px] max-w-[630px] ml-12 mr-16 sm:ml-14 sm:mr-[80px] md:ml-[70px] md:mr-[80px]'>
                <Image src={container_tele} alt='container tele' fill />
                <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex gap-10 sm:gap-10 md:gap-[60px] items-center text-white'>
                    <div className='relative w-28 h-11'>
                        <Image src={text} alt='text' fill className='object-fill' />
                    </div>
                    <p className='text-[#0EECEE] font-bold text-2xl sm:text-2xl md:text-4xl flex-1 w-full'>{website?.telegram ?? ''}</p>
                </div>
            </div>
        </div>

    );
};

export default InformationTeleGram;