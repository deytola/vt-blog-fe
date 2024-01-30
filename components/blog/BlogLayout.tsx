"use client";

import React, { FC } from "react";
import { BlogType } from "@/types/blog.types";
import dayjs from "dayjs";
import Image from "next/image";
import RelatedBlogs from "./RelatedBlogs";
import PageHeader from "../navigation/PageHeader";

type Props = {
    data: {
        blog: BlogType;
        relatedBlogs: BlogType[];
    };
};

const BlogLayout: FC<Props> = ({ data }) => {
    return (
        <>
            <PageHeader
                title={data?.blog?.title}
                subtitle={
                    <>
                        <p className="text-lg">
                            By{" "}
                            {`${data?.blog?.author?.firstName} ${data?.blog?.author?.lastName}`}
                        </p>
                        <p>{dayjs(data?.blog?.created_at).format("MMMM DD, YYYY")}</p>
                    </>
                }
            />

            <div className="py-12 container max-w-5xl">
                <figure className="w-full relative h-48 md:h-96 overflow-hidden rounded-md mb-8">
                    <Image
                        src={data?.blog?.image}
                        alt={data?.blog?.title}
                        fill
                        priority
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1000px"
                        className="object-cover rounded-md hover:scale-105 duration-300"
                    />
                </figure>

                <p className="leading-8">{data?.blog?.content}</p>
            </div>

            <RelatedBlogs data={data?.relatedBlogs} />
        </>
    );
};

export default BlogLayout;
