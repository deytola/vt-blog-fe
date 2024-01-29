import React from "react";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import axios from "axios";
import BlogLayout from "@/components/blog/BlogLayout";

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

const SingleBlog: NextPage<PageProps> = async ({ params }) => {
    const data = await getBlog(params);

    return <BlogLayout data={data} />;
};

export default SingleBlog;
