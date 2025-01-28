import { useEffect, useState } from "react";
import { Hyperlink, columns } from "./columns";
import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";

export default function Categories({
    hyperlinks,
}: PageProps<{ hyperlinks: Hyperlink[] }>) {
    const [filter, setFilter] = useState("");
    const [filteredHyperlinks, setFilteredHyperlinks] = useState(hyperlinks);

    useEffect(() => {
        setFilteredHyperlinks(
            hyperlinks.filter((hyperlink) =>
                hyperlink.url.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, hyperlinks]);

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
                        </div>
                        <div className="container mx-auto">
                            <DataTable
                                columns={columns}
                                data={filteredHyperlinks}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
