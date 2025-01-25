"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
