"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "@/helpers/constant";
import AuthModal from "../auth/AuthModal";
import { authenticatedUser, logout } from "@/redux/features/auth.slice";
import { useAppDispatch } from "@/redux/store";
import { UserType } from "@/types/auth.types";

const NavBar: FC = () => {
    const [user, setUser] = useState<UserType | null>();
    const pathName = usePathname();
    const dispatch = useAppDispatch();

    const auth = authenticatedUser();

    const handleLogout = () => dispatch(logout());

    useEffect(() => {
        if (auth) {
            setUser(auth);
        } else {
            setUser(null);
        }
    }, [dispatch]);

    return (
        <header className="bg-primary text-white border-b border-[#3e3e3e]">
            <nav className="flex items-center justify-between p-8 container">
                <Link href="/" className="text-2xl font-semibold">
                    Vivid Blog
                </Link>

                <div className="flex items-center gap-6">
                    {navLinks.map(({ path, title }) => (
                        <div key={title}>
                            <Link href={path}>{title}</Link>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: false || pathName === path ? 24 : 0 }}
                                transition={{ duration: 0.5 }}
                                className="h-0.5 bg-sky-600"
                            />
                        </div>
                    ))}
                    {user ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <AuthModal />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
