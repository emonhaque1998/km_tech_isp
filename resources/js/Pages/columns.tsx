"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Hyperlink = {
    id: number;
    alternative: string;
    category: {
        name: string;
    };
};

export const columns: ColumnDef<Hyperlink>[] = [
    {
        accessorKey: "alternative",
        header: "Name",
    },
    {
        accessorKey: "category.name",
        header: "Category Name",
    },
];
