import { BlogType } from "@/types/blog.types";
import React, { FC } from "react";
import BlogCard from "./BlogCard";

type Props = {
    data: BlogType[];
};

const RelatedBlogs: FC<Props> = ({ data }) => {
    if (data?.length === 0) return;

    return (
        <div className="bg-[#f8f8f8]">
            <div className="container p-12">
                <h2 className="font-bold text-2xl mb-8">Related Blogs</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                    {data
                        ?.slice(0, 4)
                        .map((blog) => <BlogCard key={blog.id} data={blog} />)}
                </div>
            </div>
        </div>
    );
};

export default RelatedBlogs;
