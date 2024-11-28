import type {Metadata} from "next";
import "./globals.css";
import {Figtree} from "next/font/google";
import {Toaster} from "@/components/ui/toaster";
import {ReactNode} from "react";

const nextFont = Figtree({
    subsets: ['latin'],
    display: 'swap',
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "HFL",
    description: "HFL is a platform for requesting licenses about health facilities and services in the public domain.",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${nextFont.className}  antialiased`}
        >

        {children}

        <Toaster/>
        </body>
        </html>
    );
}
