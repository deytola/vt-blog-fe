import React, { FC } from "react";
import BlogCard from "./BlogCard";
import ReactPaginate from "react-paginate";
import { useAppSelector } from "@/redux/store";
import { blogSelector } from "@/redux/features/blog.slice";
import { BeatLoader } from "react-spinners";

type Props = {
    setPage: (e: number) => void; //eslint-disable-line
    page: number;
};

const BlogList: FC<Props> = ({ setPage }) => {
    const { blogs, blogs_loading } = useAppSelector(blogSelector);

    const data = blogs;

    return blogs_loading ? (
        <div className="flex items-center justify-center h-60 sm:h-96">
            <BeatLoader loading={blogs_loading} color="#111827" size={12} />
        </div>
    ) : (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 container p-6 md:p-8 lg:p-12">
                {data?.blogs?.map((blog) => <BlogCard key={blog.id} data={blog} />)}
            </div>

            {data?.totalPages > 1 && (
                <div className="flex justify-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(data) => setPage(data.selected + 1)}
                        pageRangeDisplayed={3}
                        pageCount={data?.totalPages}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName="flex items-center gap-4 justify-center pt-2 pb-5 lg:pb-10"
                        activeLinkClassName="font-bold text-blue-500"
                        // forcePage={page}
                    />
                </div>
            )}
        </>
    );
};

export default BlogList;
