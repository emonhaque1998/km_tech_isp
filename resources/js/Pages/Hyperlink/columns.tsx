"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/Components/ui/checkbox";
import { Trash2, FilePenLine } from "lucide-react";
import { Link } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Hyperlink = {
    id: number;
    url: string;
    user: { id: number; name: string; email: string };
    category: { id: number; name: string; slug: string };
};

export const columns: ColumnDef<Hyperlink>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.user.name}</span>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span>{row.original.user.email}</span>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
        accessorKey: "url",
        header: "Urls",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-4">
                <Link
                    href={route("add-category.destroy", row.original.id)}
                    method="delete"
                    onSuccess={() =>
                        toast.success("Category deleted successfully")
                    }
                >
                    <span className="flex">
                        <Trash2 className="text-red-600" />
                    </span>
                </Link>
            </div>
        ),
    },
];
