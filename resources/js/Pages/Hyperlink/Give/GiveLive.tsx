import DailogBox from "@/Components/admin/DailogBox";
import { DialogFooter } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { Category } from "../Category/columns";
import { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputError from "@/Components/InputError";

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
        ifream: "",
        isLive: "1",
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

        post(route("add-category.store"), {
            onFinish: () => reset("name", "slug", "color", "ifream"),
            onError: (error) => {
                console.log(error);
            },
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
                            value={data.name}
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
                        <InputError message={errors.slug} className="" />
                        <input
                            type="color"
                            className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                            id="hs-color-input"
                            onChange={(e) => setData("color", e.target.value)}
                            value={data.color}
                            title="Choose your color"
                        ></input>
                        <InputError message={errors.color} className="" />

                        {data.isLive == "1" && (
                            <div>
                                <label
                                    htmlFor="ifream"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Give you Ifream
                                </label>
                                <textarea
                                    id="ifream"
                                    rows={4}
                                    cols={50}
                                    onChange={(e) => {
                                        setData("ifream", e.target.value);
                                    }}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                                <InputError
                                    message={errors.ifream}
                                    className=""
                                />
                            </div>
                        )}
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
