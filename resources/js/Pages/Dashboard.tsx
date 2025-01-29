import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Category } from "./Hyperlink/Category/columns";
import { useEffect, useState } from "react";
import { DataTable } from "@/Components/DataTable";
import { Hyperlink, columns } from "./columns";

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
    const [showTable, setTable] = useState(false);
    const [categoryId, setCategoryId] = useState(null as number | null);

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
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                setTable(true);
                                                setCategoryId(category.id);
                                            }}
                                            className="bg-[#e67e22] hover:bg-[#d35400] cursor-pointer py-10 px-5 rounded-lg"
                                        >
                                            <input
                                                type="hidden"
                                                value={category.id}
                                            />
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
                    {showTable && categoryId !== null && (
                        <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="container mx-auto">
                                    <DataTable
                                        columns={columns}
                                        data={
                                            categories.find(
                                                (category) =>
                                                    category.id === categoryId
                                            )?.hyperlink || []
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
