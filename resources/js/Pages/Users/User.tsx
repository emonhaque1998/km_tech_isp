import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Input } from "@/Components/ui/input";

export default function User({
    users,
}: PageProps<{
    users: {
        data: Payment[];
        links: any;
        prev_page_url: string;
        next_page_url: string;
    };
}>) {
    const user = usePage().props.auth.user;

    const [filter, setFilter] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users.data);

    useEffect(() => {
        setFilteredUsers(
            users.data.filter((user) =>
                user.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, users.data]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Hyperlink
                </h2>
            }
        >
            <Head title="Hyperlink" />

            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 max-md:px-2 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="flex flex-row justify-between">
                            <div className="text-gray-900 py-3 w-1/3">
                                Users
                            </div>
                            <div className="text-gray-900 py-3 flex flex-row gap-2 w-2/3 items-center justify-end">
                                <div>
                                    <Input
                                        value={filter}
                                        placeholder="Filter Users"
                                        onChange={(e) =>
                                            setFilter(e.target.value)
                                        }
                                    />
                                </div>
                                <Link
                                    href={route("add-user.index")}
                                    className="bg-[#e67e22] text-white py-2 max-md:py-2 max-md:px-2 max-md:text-sm rounded-lg hover:bg-[#d35400] px-3"
                                >
                                    Add User
                                </Link>
                            </div>
                        </div>
                        <div className="container mx-auto">
                            <DataTable columns={columns} data={filteredUsers} />
                        </div>
                        <div
                            className={`flex mt-5 gap-5 ${
                                users.prev_page_url
                                    ? "justify-between"
                                    : "justify-end"
                            }`}
                        >
                            {users.prev_page_url && (
                                <Link
                                    href={users.prev_page_url}
                                    className="bg-[#e67e22] hover:bg-[#d35400] text-white py-2 px-4 rounded-lg"
                                >
                                    Previous
                                </Link>
                            )}
                            {users.next_page_url && (
                                <Link
                                    href={users.next_page_url}
                                    className="bg-[#e67e22] hover:bg-[#d35400] text-white py-2 px-4 rounded-lg"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
