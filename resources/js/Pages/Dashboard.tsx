import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Category } from "./Hyperlink/Category/columns";
import { useEffect, useState } from "react";
import { DataTable } from "@/Components/DataTable";
import { Hyperlink, columns } from "./columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function Dashboard({
    categories,
}: PageProps<{
    categories: [
        {
            id: number;
            name: string;
            slug: string;
            color: string;
            hyperlink: [
                {
                    id: number;
                    url: string;
                    slug: string;
                    category_count: number;
                    category: { id: number; name: string };
                    alternative: string;
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
                                        <DropdownMenu key={category.id}>
                                            <DropdownMenuTrigger
                                                style={{
                                                    backgroundColor:
                                                        category.color,
                                                }}
                                                className={`hover:bg-[#d35400] cursor-pointer py-10 px-5 rounded-lg`}
                                            >
                                                <Link
                                                    href=""
                                                    onClick={(e: any) => {
                                                        e.preventDefault();
                                                        setTable(true);
                                                        setCategoryId(
                                                            category.id
                                                        );
                                                    }}
                                                    className=""
                                                >
                                                    <input
                                                        type="hidden"
                                                        value={category.id}
                                                    />
                                                    <div className="text-white  text-center">
                                                        <h2 className="text-3xl">
                                                            {
                                                                category
                                                                    .hyperlink
                                                                    .length
                                                            }
                                                        </h2>
                                                        <p className="text-md">
                                                            {category.name}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    {category.name}
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {category.hyperlink.map(
                                                    (hyper) => {
                                                        return (
                                                            <a
                                                                href={hyper.url}
                                                                target="_blank"
                                                                className="cursor-pointer"
                                                                key={hyper.id}
                                                            >
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    {
                                                                        hyper.alternative
                                                                    }
                                                                </DropdownMenuItem>
                                                            </a>
                                                        );
                                                    }
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
