import React from "react";
import { NextPage } from "next";
import DeleteBlogLayout from "@/components/blog/DeleteBlogLayout";
import axios from "axios";
import { notFound } from "next/navigation";

type PageProps = {
    params: {
        slug: string;
    };
};

const getBlog = async (params: { slug: string }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const { data } = await axios(`${BASE_URL}/blogs/${params.slug}`);
        return data;
    } catch (error) {
        return notFound();
    }
};

const DeleteBlog: NextPage<PageProps> = async ({ params }) => {
    const data = await getBlog(params);

    return <DeleteBlogLayout data={data} />;
};

export default DeleteBlog;
