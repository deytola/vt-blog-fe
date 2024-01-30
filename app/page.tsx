"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import SearchBar from "@/components/blog/SearchBar";
import BlogList from "@/components/blog/BlogList";
import { useAppDispatch } from "@/redux/store";
import { getBlogs } from "@/redux/features/blog.slice";

const Home: NextPage = () => {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const dispatch = useAppDispatch();

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
            <BlogList page={page} setPage={setPage} />
        </>
    );
};

export default Home;
