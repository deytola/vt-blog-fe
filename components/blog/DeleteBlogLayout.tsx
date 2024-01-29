"use client";

import React, { FC } from "react";
import { BlogType } from "@/types/blog.types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import PageHeader from "../navigation/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { blogSelector, deleteBlog } from "@/redux/features/blog.slice";

type Props = {
    data: {
        blog: BlogType;
    };
};

const DeleteBlogLayout: FC<Props> = ({ data }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { delete_loading } = useAppSelector(blogSelector);

    const navigateToHomePage = () => router.replace("/");

    const handleSuccess = () => {
        navigateToHomePage();
    };

    const handleDelete = () => {
        dispatch(deleteBlog({ slug: data?.blog?.slug, handleSuccess }));
    };

    return (
        <>
            <PageHeader title={`Delete "${data?.blog?.title}"`} />

            <div className="py-12 container max-w-5xl">
                <p className="text-2xl md:text-3xl text-center">
                    Are you sure you want to delete this blog titled{" "}
                    <span className="font-semibold">"{data.blog?.title}" </span>?. Once
                    taken, this action cannot be reversed.
                </p>
            </div>

            <div className="flex justify-center">
                <div className="flex items-center gap-4">
                    <Button type="button" size="lg" onClick={navigateToHomePage}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        size="lg"
                        variant="destructive"
                        onClick={handleDelete}>
                        {delete_loading ? "Submitting" : "Submit"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default DeleteBlogLayout;
