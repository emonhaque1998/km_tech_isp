import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Category, columns } from "./columns";
import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Input } from "@/Components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import DailogBox from "@/Components/admin/DailogBox";
import { DialogFooter } from "@/Components/ui/dialog";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";

export default function Categories({
    categories,
}: PageProps<{
    categories: {
        data: Category[];
        links: any;
        prev_page_url: string;
        next_page_url: string;
    };
}>) {
    const [filter, setFilter] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(
        categories.data
    );

    useEffect(() => {
        setFilteredCategories(
            categories.data.filter((category) =>
                category.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, categories.data]);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({ col_number: "" });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("add-website-colume.store"), {
            onFinish: () => reset("col_number"),
        });
    };

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
                                Categories
                            </div>
                            <div className="text-gray-900 py-3 flex flex-row gap-2 w-2/3 items-center justify-end">
                                <div>
                                    <Input
                                        value={filter}
                                        onChange={(e) =>
                                            setFilter(e.target.value)
                                        }
                                        placeholder="Filter categories"
                                    />
                                </div>
                                <DailogBox
                                    btnName="Set Colume"
                                    description="Set Colume Hyperlink"
                                >
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Input
                                                id="name"
                                                type="number"
                                                onChange={(e) =>
                                                    setData(
                                                        "col_number",
                                                        e.target.value
                                                    )
                                                }
                                                className="col-span-12"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={submit}>
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DailogBox>
                                <Link
                                    href={route("add-category.index")}
                                    className="bg-[#e67e22] text-white py-2 max-md:py-2 max-md:px-2 max-md:text-sm rounded-lg hover:bg-[#d35400] px-3"
                                >
                                    Add Category
                                </Link>
                            </div>
                        </div>
                        <div className="container mx-auto">
                            <DataTable
                                columns={columns}
                                data={filteredCategories}
                            />
                            <div
                                className={`flex mt-5 gap-5 ${
                                    categories.prev_page_url
                                        ? "justify-between"
                                        : "justify-end"
                                }`}
                            >
                                {categories.prev_page_url && (
                                    <Link
                                        href={categories.prev_page_url}
                                        className="bg-[#e67e22] hover:bg-[#d35400] text-white py-2 px-4 rounded-lg"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {categories.next_page_url && (
                                    <Link
                                        href={categories.next_page_url}
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
