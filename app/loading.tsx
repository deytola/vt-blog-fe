import React, { FC } from "react";
import SkeletonCard from "@/components/SkeletonCard";

const Loading: FC = () => {
    return (
        <main>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 container p-6 md:p-8 lg:p-12">
                {"theory".split("").map((i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </main>
    );
};

export default Loading;
