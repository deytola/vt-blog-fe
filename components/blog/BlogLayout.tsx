"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogType } from "@/types/blog.types";
import RelatedBlogs from "./RelatedBlogs";
import PageHeader from "../navigation/PageHeader";
import TimeAgo from "@/components/blog/TimeAgo";
import { Button } from "@/components/ui/button";
import { authenticatedUser } from "@/redux/features/auth.slice";
import { UserType } from "@/types/auth.types";
import { useAppDispatch } from "@/redux/store";

type Props = {
    data: {
        blog: BlogType;
        relatedBlogs: BlogType[];
    };
};

const BlogLayout: FC<Props> = ({ data }) => {
    const auth = authenticatedUser();
    const [user, setUser] = useState<UserType | null>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (auth) {
            setUser(auth);
        } else {
            setUser(null);
        }
    }, [dispatch]);
    const router = useRouter();

    const handleDelete = (): void => {
        router.push(`/delete/${data?.blog?.slug}`);
    };

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
                        <TimeAgo timestamp={data?.blog?.created_at} />
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
                <>
                    {user ? (
                        <Button
                            type="button"
                            size="lg"
                            variant="destructive"
                            onClick={handleDelete}>
                            Delete
                        </Button>
                    ) : (
                        ""
                    )}
                </>
            </div>

            <RelatedBlogs data={data?.relatedBlogs} />
        </>
    );
};

export default BlogLayout;
