import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-row justify-between">
                               <Link href="" className="bg-[#e67e22] hover:bg-[#d35400] cursor-pointer w-1/5 py-10 px-5">
                                    <div className="text-white  text-center">
                                        <h2 className="text-3xl">10</h2>
                                        <p className="text-md">Hyperlinks</p>
                                    </div>
                               </Link>
                               <Link href="" className="bg-[#e67e22] hover:bg-[#d35400] cursor-pointer w-1/5 py-10 px-5">
                                    <div className="text-white  text-center">
                                        <h2 className="text-3xl">10</h2>
                                        <p className="text-md">Hyperlinks</p>
                                    </div>
                               </Link>
                               <Link href="" className="bg-[#e67e22] hover:bg-[#d35400] cursor-pointer w-1/5 py-10 px-5">
                                    <div className="text-white  text-center">
                                        <h2 className="text-3xl">10</h2>
                                        <p className="text-md">Hyperlinks</p>
                                    </div>
                               </Link>
                               <Link href="" className="bg-[#e67e22] hover:bg-[#d35400] cursor-pointer w-1/5 py-10 px-5">
                                    <div className="text-white  text-center">
                                        <h2 className="text-3xl">10</h2>
                                        <p className="text-md">Hyperlinks</p>
                                    </div>
                               </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
