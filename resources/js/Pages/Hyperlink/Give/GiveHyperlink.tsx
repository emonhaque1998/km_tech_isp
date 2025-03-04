import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PageProps } from "@/types";
import { columns, Payment } from "@/Pages/Users/columns";
import { Category } from "./../Category/columns";
import GiveLive from "./GiveLive";

export default function GiveHyperlink({
    user,
    categories,
}: PageProps<{ user: Payment; categories: Category[] }>) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        url: "",
        user_id: user.id,
        category_id: "",
        alternative: "",
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData("url", e.target.value);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData("category_id", e.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("hyperlink.store"), {
            onFinish: () => reset("url", "url", "alternative"),
            onSuccess: () =>
                toast.success("Hyperlink added this user successfully"),
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
                        <div className="flex flex-row justify-between">
                            <div className="text-gray-900 py-3 w-1/3">
                                Hyperlinks
                            </div>
                            <GiveLive user={user} categories={categories} />
                        </div>
                        <div className="px-6">
                            <form onSubmit={submit}>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={user.name}
                                            disabled
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Router"
                                            required
                                        />
                                        <InputError
                                            message={errors.user_id}
                                            className=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="url"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Hyperlink
                                        </label>
                                        <input
                                            type="text"
                                            id="url"
                                            name="url"
                                            value={data.url}
                                            onChange={(e) => {
                                                setData("url", e.target.value);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="URL"
                                            required
                                        />
                                        <InputError
                                            message={errors.url}
                                            className=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="alternative"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Link Alternative Link
                                        </label>
                                        <input
                                            type="text"
                                            id="alternative"
                                            name="alternative"
                                            value={data.alternative}
                                            onChange={(e) => {
                                                setData(
                                                    "alternative",
                                                    e.target.value
                                                );
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Router"
                                            required
                                        />
                                        <InputError
                                            message={errors.alternative}
                                            className=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="countries"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Select a Category
                                        </label>
                                        <select
                                            id="countries"
                                            value={data.category_id}
                                            onChange={onChangeHandler}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {categories.map((category) => {
                                                if (category.isLive == "0") {
                                                    return (
                                                        <option
                                                            value={category.id}
                                                            key={category.id}
                                                        >
                                                            {category.name}
                                                        </option>
                                                    );
                                                }
                                            })}
                                        </select>
                                        <InputError
                                            message={errors.category_id}
                                            className=""
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center flex-row">
                                    <button
                                        type="submit"
                                        className="text-white bg-[#e67e22] hover:bg-[#d35400] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Give Hyperlink
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
