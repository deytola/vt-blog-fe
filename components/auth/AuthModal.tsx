import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <Dialog>
            <DialogTrigger>Login</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-4 text-lg">
                        <p
                            className={clsx(
                                "cursor-pointer",
                                isLogin ? "font-bold underline" : "font-normal"
                            )}
                            onClick={() => setIsLogin(true)}>
                            Login
                        </p>{" "}
                        |{" "}
                        <p
                            className={clsx(
                                "cursor-pointer",
                                !isLogin ? "font-bold underline" : "font-normal"
                            )}
                            onClick={() => setIsLogin(false)}>
                            Register
                        </p>
                    </DialogTitle>
                    {isLogin ? <LoginForm /> : <SignupForm />}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
