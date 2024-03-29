"use client";

// import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";
import { store } from "@/redux/store";
import Loader from "@/components/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

// export const metadata: Metadata = {
//     title: "Vivid Blog",
//     description: "Leading Blogging Platform",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Provider store={store}>
                <body
                    className={`${poppins.className} flex flex-col justify-between min-h-screen`}>
                    <div>
                        <Loader />
                        <NavBar />
                        {children}
                    </div>
                    <ToastContainer
                        theme="light"
                        position="top-right"
                        autoClose={800}
                        draggable={false}
                        closeOnClick
                    />
                    <Footer />
                </body>
            </Provider>
        </html>
    );
}
