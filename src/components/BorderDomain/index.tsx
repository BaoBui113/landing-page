import React from 'react';

const BorderDomain = ({ children }: { children: React.ReactNode }) => {
    return (

        <div style={{
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
        }} className='bg-[#313160] border-[1px] border-solid border-[#eef0f0] rounded-3xl w-full'>
            {children}
        </div>

    );
};

export default BorderDomain;