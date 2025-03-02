import DailogBox from "@/Components/admin/DailogBox";
import { DialogFooter } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Head, useForm } from "@inertiajs/react";
import { Category } from "../Category/columns";
import { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function GiveLive({
    user,
    categories,
}: {
    user: { id: number };
    categories: Category[];
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: "",
        slug: "",
        color: "",
        user_id: user.id,
        category_id: "",
        alternative: "",
        isLive: "",
    });

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setData("name", name);
        setData("slug", generateSlug(name));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("hyperlink.store"), {
            onFinish: () =>
                reset("name", "slug", "category_id", "alternative", "user_id"),
            onSuccess: () =>
                toast.success("Hyperlink added this user successfully"),
        });
    };

    return (
        <div className="text-gray-900 py-3 flex flex-row gap-2 w-2/3 items-center justify-end">
            <DailogBox btnName="Add Live" description="Add Live for User">
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter Name"
                            onChange={handleNameChange}
                            className="col-span-12"
                        />
                        <Input
                            id="slug"
                            type="text"
                            value={data.slug}
                            disabled={true}
                            placeholder="Auto Generate Slug"
                            className="col-span-12"
                        />
                        <Input
                            id="alternative"
                            type="text"
                            value={data.alternative}
                            placeholder="Alternative Name"
                            className="col-span-12"
                        />
                        <div className="flex flex-row justify-between items-center gap-5">
                            <div>
                                <input
                                    type="color"
                                    className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                                    id="hs-color-input"
                                    onChange={(e) =>
                                        setData("color", e.target.value)
                                    }
                                    value={data.color}
                                    title="Choose your color"
                                ></input>
                            </div>
                            <div className="">
                                <input
                                    id="isLive"
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData("isLive", "1");
                                        } else {
                                            setData("isLive", "0");
                                        }
                                    }}
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="isLive"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Is Live
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={submit}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DailogBox>
        </div>
    );
}
