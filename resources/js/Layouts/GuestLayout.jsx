import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-row">
            <div className="h-screen w-1/2">
                <div className="container">
                    <div className="flex px-36 h-screen justify-center items-center">
                        <div className="flex flex-col justify-center gap-5 w-full">
                            <div className="flex justify-center">
                                <Link href="/" className="">
                                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                                </Link>
                            </div>
                            <h2 className="text-left text-[#0C1421] text-xl font-extrabold">
                                Welcome Back 👋
                            </h2>
                            <p className="text-[#313957]">
                                Today is a new day. It's your day. You shape it.
                                Sign in to start managing your projects.
                            </p>

                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-screen rounded-l-3xl w-1/2 bg-[url('assets/image/login_art.png')] bg-cover bg-no-repeat"></div>
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div> */}
        </div>
    );
}
