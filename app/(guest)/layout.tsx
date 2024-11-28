import Image from "next/image";

import NavBar from "@/components/NavBar";
import {ReactNode, Suspense} from "react";
import Loading from "@/app/loading";

export default function AuthLayout({children}: { children: ReactNode }) {
    return (
        <>
            <div className={'min-h-screen flex flex-col justify-between'}>

                <div className={'flex-grow'}>
                    <NavBar/>
                    <main className={'max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4'}>
                        <Suspense fallback={<Loading/>}>
                            {children}
                        </Suspense>
                    </main>
                </div>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-3">
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/file.svg"
                            alt="File icon"
                            width={16}
                            height={16}
                        />
                        Learn
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/window.svg"
                            alt="Window icon"
                            width={16}
                            height={16}
                        />
                        Examples
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/globe.svg"
                            alt="Globe icon"
                            width={16}
                            height={16}
                        />
                        Go to nextjs.org →
                    </a>
                </footer>
            </div>
        </>
    );
}
