import React from 'react';

const BorderContainer = ({ children }: { children: React.ReactNode }) => {
    return (

        <div style={{
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
            // background: "linear-gradient(90deg, #0f1c2d 0%, #2d4767 100%)"
            // background: "linear-gradient(180deg, #435DBB 0%, #222B35 100%)"
            background: "linear-gradient(180deg, #222B35 30%, #435DBB 100%)"
        }} className='bg-[#1C232C] border-[4px] border-solid border-[#eef0f0] rounded-[8px] w-full'>
            {children}

        </div>

    );
};

export default BorderContainer;