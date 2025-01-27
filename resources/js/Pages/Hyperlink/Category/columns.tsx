"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/Components/ui/checkbox";
import { Trash2, FilePenLine } from "lucide-react";
import { Link } from "@inertiajs/react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
    id: number;
    slug: string;
    name: string;
};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-4">
                <Link href={`/edit/${row.original.id}`}>
                    <span>
                        <FilePenLine className="text-green-700" />
                    </span>
                </Link>
                <Link href={`/delete/${row.original.id}`}>
                    <span className="flex">
                        <Trash2 className="text-red-600" />
                    </span>
                </Link>
            </div>
        ),
    },
];
