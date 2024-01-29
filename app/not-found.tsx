"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";

const Error404 = () => {
    const router = useRouter();

    const navigateToHomePage = () => router.push("/");
    return (
        <>
            <PageHeader title="Error 404 - Page Not Found" />

            <div className="p-12 container max-w-5xl">
                <p className="text-3xl text-center font-semibold">
                    Oops, the page you're looking for doesn't exist.
                </p>
            </div>

            <div className="flex justify-center">
                <Button type="button" size="lg" onClick={navigateToHomePage}>
                    Back Home
                </Button>
            </div>
        </>
    );
};

export default Error404;
