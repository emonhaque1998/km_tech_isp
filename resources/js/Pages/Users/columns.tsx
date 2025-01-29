"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2, SendHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: number;
    role: "admin" | "user";
    // status: "pending" | "processing" | "success" | "failed";
    name: string;
    email: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-4 items-center">
                <Link href={route("add-hyperlink.index", row.original.id)}>
                    <span>
                        <SendHorizontal className="text-green-700" />
                    </span>
                </Link>
                <Link
                    href={route("users.destroy", row.original.id)}
                    method="delete"
                    onSuccess={() => toast.success("User deleted successfully")}
                >
                    <span className="flex">
                        <Trash2 className="text-red-600" />
                    </span>
                </Link>
            </div>
        ),
    },
];
