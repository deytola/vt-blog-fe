"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { authSelector, login } from "@/redux/features/auth.slice";

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const { login_loading } = useAppSelector(authSelector);

    const FormSchema = z.object({
        email: z.string().email().min(1, { message: "Please enter email address" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSuccess = () => form.reset();

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        dispatch(login({ payload: data, handleSuccess }));
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-3xl space-y-4 py-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter email address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg">
                        {login_loading ? "Loggin in" : "Login"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default LoginForm;
