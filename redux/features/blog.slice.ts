import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { RootState } from "../store";
import { BlogType, CreateBlogType } from "@/types/blog.types";
import { toast } from "react-toastify";

export const getBlogs = createAsyncThunk(
    "/blogs",
    async ({ page, query }: { page: number; query?: string }) => {
        try {
            const response = await api.getBlogs({ page, query });

            return response.data;
        } catch (err: any) {
            console.log(err);
        }
    }
);

export const createBlog = createAsyncThunk(
    "/blogs/create",
    async ({
        payload,
        handleSuccess,
    }: {
        payload: CreateBlogType;
        handleSuccess: any;
    }) => {
        try {
            const response = await api.createBlog(payload);
            toast.success("Blog created successfully");
            handleSuccess();
            return response.data;
        } catch (err: any) {
            toast.error(err.response.data.message[0]);
        }
    }
);

export const getBlogSuggestions = createAsyncThunk(
    "/blogs/search",
    async (query: string) => {
        try {
            const response = await api.getBlogSuggestions(query);
            return response.data;
        } catch (err: any) {
            console.log(err);
        }
    }
);

export const getBlog = createAsyncThunk(
    "/blogs/:slug",
    async ({ slug }: { slug: string }) => {
        try {
            const response = await api.getBlog(slug);

            return response.data;
        } catch (err: any) {
            console.log(err);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "/blogs/delete",
    async ({ slug, handleSuccess }: { slug: string; handleSuccess: any }) => {
        try {
            const response = await api.deleteBlog(slug);
            toast.success("Blog deleted successfully");
            handleSuccess();
            return response.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }
);

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blog: { blog: {} as BlogType, relatedBlogs: [] as BlogType[] },
        blogs: { blogs: [] as BlogType[], totalPages: 0 as number },
        suggestions: { blogs: [] as BlogType[], totalPages: 0 as number },
        create_blog_loading: false,
        blogs_loading: false,
        blog_loading: false,
        suggestions_loading: false,
        delete_loading: false,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.blogs_loading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.blogs_loading = false;
                state.blogs = action!.payload;
            })
            .addCase(getBlogs.rejected, (state) => {
                state.blogs_loading = false;
            });

        builder
            .addCase(createBlog.pending, (state) => {
                state.create_blog_loading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.create_blog_loading = false;
            })
            .addCase(createBlog.rejected, (state) => {
                state.create_blog_loading = false;
            });

        builder
            .addCase(getBlogSuggestions.pending, (state) => {
                state.suggestions_loading = true;
            })
            .addCase(getBlogSuggestions.fulfilled, (state, action) => {
                state.suggestions_loading = false;
                state.suggestions = action!.payload;
            })
            .addCase(getBlogSuggestions.rejected, (state) => {
                state.suggestions_loading = false;
            });

        builder
            .addCase(getBlog.pending, (state) => {
                state.blog_loading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.blog_loading = false;
                state.blog = action!.payload;
            })
            .addCase(getBlog.rejected, (state) => {
                state.blog_loading = false;
            });

        builder
            .addCase(deleteBlog.pending, (state) => {
                state.delete_loading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.delete_loading = false;
            })
            .addCase(deleteBlog.rejected, (state) => {
                state.delete_loading = false;
            });
    },
});

export const blogSelector = (state: RootState) => state.blog;

export const {} = blogSlice.actions;

export default blogSlice.reducer;
