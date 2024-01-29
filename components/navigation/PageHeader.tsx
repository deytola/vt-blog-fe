import React, { FC, ReactNode } from "react";

type Props = {
    title: string;
    subtitle?: ReactNode;
};

const PageHeader: FC<Props> = ({ title, subtitle }) => {
    return (
        <div className="bg-primary py-6 md:py-8">
            <div className="container text-center">
                <h1 className="text-2xl sm:text-3xl text-white font-bold mb-2">
                    {title}
                </h1>
                {subtitle && <h2 className=" text-white">{subtitle}</h2>}
            </div>
        </div>
    );
};

export default PageHeader;
