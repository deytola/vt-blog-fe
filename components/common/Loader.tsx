"use client";

import { blogSelector } from "@/redux/features/blog.slice";
import { useAppSelector } from "@/redux/store";
import { FC } from "react";

const Loader: FC = () => {
    const { delete_loading, blog_loading, blogs_loading, suggestions_loading } =
        useAppSelector(blogSelector);

    return (
        (delete_loading || blog_loading || blogs_loading || suggestions_loading) && (
            <div className="loader">
                <div className="load-line"></div>
            </div>
        )
    );
};

export default Loader;
