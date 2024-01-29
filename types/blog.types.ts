import { UserType } from "./auth.types";

export type BlogType = {
    id: number | string;
    title: string;
    slug: string;
    image: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    content: string;
    author?: UserType;
};

export type CreateBlogType = {
    title: string;
    image: string;
    content: string;
    category?: string;
};
