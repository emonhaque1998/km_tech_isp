import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import SideBar from "@/Components/admin/SideBar";
import Header from "@/Components/admin/Header";
import { ToastContainer, toast } from "react-toastify";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <SidebarProvider>
            <SideBar user={user} />
            <div className="flex flex-col w-full">
                <Header />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </div>
            <ToastContainer />
        </SidebarProvider>
    );
}
