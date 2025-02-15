import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PageProps } from "@/types";
import { Category } from "./columns";

export default function EditCategory({
    category,
}: PageProps<{ category: Category }>) {
    const {
        data,
        setData,
        patch,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: category.name,
        slug: category.slug,
        color: category.color,
        isLive: category.isLive,
        ifream: category.ifream,
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

        patch(route("categories.update", category.id), {
            onSuccess: (respons) => toast.success("Update successfully"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Category
                </h2>
            }
        >
            <Head title="Hyperlink" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="py-6 text-gray-900">Edit Category</div>
                        <div className="px-6">
                            <form onSubmit={submit}>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            name="name"
                                            onChange={handleNameChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Router"
                                            required
                                        />
                                        <InputError
                                            message={errors.name}
                                            className=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="slug"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            id="slug"
                                            value={data.slug}
                                            name="slug"
                                            onChange={(e) =>
                                                setData("slug", e.target.value)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="router"
                                            required
                                        />
                                        <InputError
                                            message={errors.slug}
                                            className=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="hs-color-input"
                                            className="block text-sm font-medium mb-2 dark:text-white"
                                        >
                                            Color picker
                                        </label>
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
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <input
                                                id="isLive"
                                                checked={
                                                    data.isLive == "1"
                                                        ? true
                                                        : false
                                                }
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
                                                value={data.ifream}
                                                onChange={(e) => {
                                                    setData(
                                                        "ifream",
                                                        e.target.value
                                                    );
                                                }}
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write your thoughts here..."
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 items-center flex-row">
                                    <button
                                        type="submit"
                                        className="text-white bg-[#e67e22] hover:bg-[#d35400] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Update Category
                                    </button>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
