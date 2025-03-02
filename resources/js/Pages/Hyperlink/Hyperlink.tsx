import { useEffect, useState } from "react";
import { Hyperlink, columns } from "./columns";
import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Input } from "@/Components/ui/input";
import { ToastContainer, toast } from "react-toastify";

export default function Categories({
    hyperlinks,
}: PageProps<{
    hyperlinks: {
        data: Hyperlink[];
        links: any;
        prev_page_url: string;
        next_page_url: string;
    };
}>) {
    const [filter, setFilter] = useState("");
    const [filteredHyperlinks, setFilteredHyperlinks] = useState(
        hyperlinks.data
    );

    useEffect(() => {
        setFilteredHyperlinks(
            hyperlinks.data.filter((hyperlink) =>
                hyperlink.url.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, hyperlinks.data]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 max-md:px-2 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="flex flex-row justify-between">
                            <div className="text-gray-900 py-3 w-1/3">
                                Hyperlinks
                            </div>
                            <div className="text-gray-900 py-3 flex flex-row gap-2 w-2/3 items-center justify-end">
                                <div className="text-gray-900 py-3 flex flex-row gap-2 w-2/3 items-center justify-end">
                                    <div>
                                        <Input
                                            value={filter}
                                            onChange={(e) =>
                                                setFilter(e.target.value)
                                            }
                                            placeholder="Filter Hyperlinks"
                                        />
                                    </div>
                                </div>
                                <Link
                                    href={route("add-category.index")}
                                    className="bg-[#e67e22] text-white py-2 max-md:py-2 max-md:px-2 max-md:text-sm rounded-lg hover:bg-[#d35400] px-3"
                                >
                                    Add Global Hyperlink
                                </Link>
                            </div>
                        </div>
                        <div className="container mx-auto">
                            <DataTable
                                columns={columns}
                                data={filteredHyperlinks}
                            />
                            <div
                                className={`flex mt-5 gap-5 ${
                                    hyperlinks.prev_page_url
                                        ? "justify-between"
                                        : "justify-end"
                                }`}
                            >
                                {hyperlinks.prev_page_url && (
                                    <Link
                                        href={hyperlinks.prev_page_url}
                                        className="bg-[#e67e22] hover:bg-[#d35400] text-white py-2 px-4 rounded-lg"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {hyperlinks.next_page_url && (
                                    <Link
                                        href={hyperlinks.next_page_url}
                                        className="bg-[#e67e22] hover:bg-[#d35400] text-white py-2 px-4 rounded-lg"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
