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
import { Input } from "@/Components/ui/input";

export default function Dashboard({
    categories,
    hyperlinks,
}: PageProps<{
    categories: [
        {
            id: number;
            name: string;
            slug: string;
            color: string;
            isLive: string;
            ifream: string;
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
    hyperlinks: Hyperlink[];
}>) {
    console.log(categories);
    const [filter, setFilter] = useState("");
    const [filteredHyperlinks, setFilteredHyperlinks] = useState(hyperlinks);
    const [showLive, setLive] = useState(false);
    const [liveUrl, setLiveUrl] = useState("");

    useEffect(() => {
        setFilteredHyperlinks(
            hyperlinks.filter((hyperlink) =>
                hyperlink.alternative
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            )
        );
    }, [filter, hyperlinks]);
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
                                    if (category.isLive == "1") {
                                        return (
                                            <div
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setLive(true);
                                                    setLiveUrl(category.ifream);
                                                }}
                                                style={{
                                                    backgroundColor:
                                                        category.color,
                                                }}
                                                className={`hover:bg-[#d35400] cursor-pointer py-10 px-5 rounded-lg`}
                                            >
                                                <Link
                                                    href=""
                                                    className=""
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <input
                                                        type="hidden"
                                                        value={category.id}
                                                    />
                                                    <div className="flex justify-center items-center h-full">
                                                        <div className="text-white  text-center">
                                                            <p className="text-md">
                                                                {category.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <DropdownMenu key={category.id}>
                                                <DropdownMenuTrigger
                                                    style={{
                                                        backgroundColor:
                                                            category.color,
                                                    }}
                                                    className={`hover:bg-[#d35400] cursor-pointer py-10 px-5 rounded-lg`}
                                                    onClick={(e) =>
                                                        setLive(false)
                                                    }
                                                >
                                                    <Link href="" className="">
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
                                                                    href={
                                                                        hyper.url
                                                                    }
                                                                    target="_blank"
                                                                    className="cursor-pointer"
                                                                    key={
                                                                        hyper.id
                                                                    }
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
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                    {showLive ? (
                        liveUrl ? (
                            <div
                                className="content"
                                dangerouslySetInnerHTML={{
                                    __html: liveUrl,
                                }}
                            ></div>
                        ) : (
                            ""
                        )
                    ) : (
                        <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 flex flex-col gap-4">
                                <div className="flex justify-end">
                                    <div className="w-52">
                                        <Input
                                            value={filter}
                                            placeholder="Filter Users"
                                            onChange={(e) =>
                                                setFilter(e.target.value)
                                            }
                                        />
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
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
