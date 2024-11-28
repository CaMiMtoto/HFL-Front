import {Calendar, Home, Search, Settings} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    {
        title: "My Applications",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Licenses",
        url: "#",
        icon: Search,
    },
    {
        title: "My Licenses",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar variant={"sidebar"} collapsible={'icon'}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={'my-5'}>
                        <img src={"https://licensing.moh.gov.rw/assets/logo-762df436.png"} alt={"Logo"}
                             width={"50"}
                             height={"10"}/>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className={'my-2 0'}>
                                    <SidebarMenuButton asChild >
                                        <a href={item.url} className={'text-lg font-medium text-gray-900 hover:text-gray-700 hover:bg-primary/10'}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
