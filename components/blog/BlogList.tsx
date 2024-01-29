import { BlogType } from "@/types/blog.types";
import React, { FC } from "react";
import BlogCard from "./BlogCard";
import ReactPaginate from "react-paginate";

type Props = {
    data: { blogs: BlogType[]; totalPages: number };
    setPage: (e: number) => void;
    page: number;
};

const BlogList: FC<Props> = ({ data, setPage, page }) => {
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 container p-6 md:p-8 lg:p-12">
                {data?.blogs
                    ?.slice(0, 6)
                    .map((blog) => <BlogCard key={blog.id} data={blog} />)}
            </div>

            {data?.totalPages > 1 && (
                <div className="flex justify-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(data) => setPage(data.selected)}
                        pageRangeDisplayed={3}
                        pageCount={data?.totalPages}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        forcePage={page}
                        containerClassName="flex items-center gap-4 justify-center pt-2 pb-5 lg:pb-10"
                        activeLinkClassName="font-bold text-blue-500"
                    />
                </div>
            )}
        </>
    );
};

export default BlogList;
