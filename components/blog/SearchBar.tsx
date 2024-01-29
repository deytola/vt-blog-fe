import React, { ChangeEvent, FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { blogSelector, getBlogSuggestions } from "@/redux/features/blog.slice";

type Props = {
    query: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    fetchBlogs: () => void;
};

const SearchBar: FC<Props> = ({ query, onChange, fetchBlogs }) => {
    const dispatch = useAppDispatch();
    const { suggestions } = useAppSelector(blogSelector);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (!debouncedQuery) return;
        dispatch(getBlogSuggestions(debouncedQuery.toLowerCase()));
    }, [debouncedQuery]);

    return (
        <div className="flex justify-center bg-primary py-10 md:py-16">
            <div>
                <h1 className="text-4xl lg:text-5xl text-center text-white font-bold mb-8">
                    Looking for a particular story?
                </h1>
                <div className="flex w-full max-w-2xl mx-auto items-center space-x-2 text-black">
                    <div className="relative w-full">
                        <Input
                            type="search"
                            value={query}
                            onChange={onChange}
                            placeholder="Search by blog title..."
                            className="py-6"
                        />

                        {debouncedQuery && !!suggestions?.blogs?.length && (
                            <div className="absolute flex flex-col divide-y bg-white w-full max-h-48 rounded-b-md border z-20 shadow overflow-y-scroll">
                                {suggestions?.blogs?.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        href={`/${blog.slug}`}
                                        className="px-3 py-1">
                                        {blog.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="outline"
                        className="p-6"
                        onClick={fetchBlogs}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
