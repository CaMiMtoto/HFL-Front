"use client"
import {ReactNode, Suspense, useState} from "react";
import Loading from "@/app/loading";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar"
import {ChevronDown, Loader, SquareChevronLeft, User} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: ReactNode
}) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'GET',
            });

            if (res.ok) {
                // Redirect to login after successful logout
                router.push('/login');
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className={' w-full'}>
                <div className={'flex justify-between items-center mb-5 w-full px-5 border-b'}>
                    <SidebarTrigger
                        type="button" variant={"outline"}
                        className={'flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200'}>
                        <SquareChevronLeft/>
                    </SidebarTrigger>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={'flex items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'}>
                            <div className={'flex items-start px-2 py-1 gap-2'}>
                                <div
                                    className={'h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center'}>
                                    <User/>
                                </div>
                                <div>
                                    <div>Jean Paul</div>
                                    <div className={'text-xs text-gray-500'}>@j.doe</div>
                                </div>

                                <ChevronDown/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem className={'cursor-pointer'} onClick={handleLogout}>
                                Logout {loading && <Loader className={"w-16 h-16 text-gray-500 animate-spin"}/>}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <Suspense fallback={<Loading/>}>
                    <div className={'m-5'}>
                        {children}
                    </div>
                </Suspense>
            </main>
        </SidebarProvider>
    );
}