import React from "react";
const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            {children}
        </section>
    );
};

export default HomePageLayout;
