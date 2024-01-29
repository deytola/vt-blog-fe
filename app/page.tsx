"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import SearchBar from "@/components/blog/SearchBar";
import BlogList from "@/components/blog/BlogList";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { blogSelector, getBlogs } from "@/redux/features/blog.slice";

const Home: NextPage = () => {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const dispatch = useAppDispatch();
    const { blogs } = useAppSelector(blogSelector);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const fetchBlogs = () => {
        dispatch(getBlogs({ page, query }));
    };

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    return (
        <>
            <SearchBar query={query} onChange={handleChange} fetchBlogs={fetchBlogs} />
            <BlogList data={blogs} page={page} setPage={setPage} />
        </>
    );
};

export default Home;
