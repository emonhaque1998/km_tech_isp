import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Category } from "./Hyperlink/Category/columns";
import { useState } from "react";

export default function Dashboard({
    categories,
}: PageProps<{
    categories: [
        {
            id: number;
            name: string;
            slug: string;
            hyperlink: [
                {
                    id: number;
                    url: string;
                    slug: string;
                    category_count: number;
                    category: { id: number; name: string };
                }
            ];
        }
    ];
}>) {
    // const [filter, setFilter] = useState("");

    // const filteredCategories = categories.filter((category) =>
    //     category.name.toLowerCase().includes(filter.toLowerCase())
    // );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-4 gap-5">
                                {categories.map((category) => {
                                    return (
                                        <Link
                                            key={category.id}
                                            href=""
                                            className="bg-[#e67e22] hover:bg-[#d35400] cursor-pointer py-10 px-5 rounded-lg"
                                        >
                                            <div className="text-white  text-center">
                                                <h2 className="text-3xl">
                                                    {category.hyperlink.length}
                                                </h2>
                                                <p className="text-md">
                                                    {category.name}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
