"use client";

import React, { useState } from "react";
import { NextPage } from "next";
import PageHeader from "@/components/navigation/PageHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAppDispatch } from "@/redux/store";
import { createBlog } from "@/redux/features/blog.slice";

const CreateBlog: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    const router = useRouter();
    const dispatch = useAppDispatch();

    const navigateToHomePage = () => router.push("/");
    const FormSchema = z.object({
        title: z.string().min(1, { message: "Please enter title" }),
        content: z.string().min(1, { message: "Please enter content" }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        if (localStorage.getItem("user")) {
            setLoading(true);
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/upload_url`,
                    { content_type: "image/png" },
                    {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "").token}`,
                        },
                    }
                )
                .then((response) => {
                    const { fields, url } = response.data;
                    const formData = new FormData();

                    // Append each key-value pair from the object to FormData
                    for (const key in fields) {
                        formData.append(key, fields[key]);
                    }
                    formData.append("file", file);

                    axios.post(url, formData).then(() => {
                        setLoading(false);
                        setImageUrl(`${url}${fields.key}`);
                    });
                })
                .catch((error) => {
                    console.error("Error during file upload:", error);
                });
        }
    };

    const handleSuccess = () => {
        router.push("/");
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const payload = { ...data, image: imageUrl };
        dispatch(createBlog({ payload, handleSuccess }));
    };

    return (
        <>
            <PageHeader title="Create New Blog" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="container max-w-3xl space-y-8 py-8 lg:py-16">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter blog title" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                            <Input type="file" onChange={handleFileUpload} />
                        </FormControl>
                        {loading ? (
                            <span className="text-xs">Uploading...</span>
                        ) : (
                            !loading &&
                            imageUrl && <span className="text-xs">Uploaded</span>
                        )}
                        <FormMessage />
                    </FormItem>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter blog content"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={navigateToHomePage}>
                            Cancel
                        </Button>
                        <Button type="submit" size="lg" onClick={() => {}}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default CreateBlog;