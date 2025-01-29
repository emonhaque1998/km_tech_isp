import ApplicationLogo from "../ApplicationLogo";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    Unlink,
    UsersRound,
    ChartColumnStacked,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/Components/ui/sidebar";
import { PropsWithChildren } from "react";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: route("dashboard"),
        icon: Home,
        role: false,
    },
    {
        title: "Dashboard",
        url: route("dashboard"),
        icon: Home,
        role: true,
    },
    {
        title: "Users",
        url: route("users.index"),
        icon: UsersRound,
        role: true,
    },
    {
        title: "Hyperlinks",
        url: route("hyperlink.index"),
        icon: Unlink,
        role: true,
    },
    {
        title: "Categories",
        url: route("categories.index"),
        icon: ChartColumnStacked,
        role: true,
    },
];

export default function SideBar({
    children,
    user,
}: PropsWithChildren<{
    user: { id: number; name: string; email: string; role: "admin" | "user" };
}>) {
    const [navDropdown, setNavDropdown] = useState(false);
    const navDropdownHandler = (event: any) => {
        event.preventDefault();
        setNavDropdown(!navDropdown);
    };

    return (
        <div className="flex flex-row">
            <div className="w-2/12 h-screen shadow-md sticky top-0 flex flex-col gap-3">
                <div>
                    <Sidebar>
                        <SidebarHeader>
                            <div className="flex justify-center">
                                {user.role === "admin" ? (
                                    <ApplicationLogo width="w-24" user={user} />
                                ) : (
                                    <h1>User</h1>
                                )}
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    Application
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item) => {
                                            if (user.role === "admin") {
                                                if (item.role === true) {
                                                    return (
                                                        <SidebarMenuItem
                                                            key={item.title}
                                                        >
                                                            <SidebarMenuButton
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        item.url
                                                                    }
                                                                >
                                                                    <item.icon />
                                                                    <span>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    );
                                                }
                                            } else {
                                                if (item.role === false) {
                                                    return (
                                                        <SidebarMenuItem
                                                            key={item.title}
                                                        >
                                                            <SidebarMenuButton
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        item.url
                                                                    }
                                                                >
                                                                    <item.icon />
                                                                    <span>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    );
                                                }
                                            }
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                            <SidebarGroup />
                        </SidebarContent>
                        {/* <SidebarFooter /> */}
                    </Sidebar>
                </div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
