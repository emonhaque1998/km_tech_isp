import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AddCategory() {
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
            onFinish: () => reset("name", "slug"),
            onSuccess: () => toast.success("Category added successfully"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Category
                </h2>
            }
        >
            <Head title="Hyperlink" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="py-6 text-gray-900">Add Category</div>
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
                                </div>
                                <div className="flex gap-3 items-center flex-row">
                                    <button
                                        type="submit"
                                        className="text-white bg-[#e67e22] hover:bg-[#d35400] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add Category
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
