import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="bg-[url('/assets/image/servers.jpg')] h-screen bg-no-repeat bg-cover">
            <div className="flex flex-row justify-center items-center h-screen">
                <div className="bg-white w-4/5 relative py-10 rounded-lg max-md:w-11/12">
                    <div className="w-44 h-56 max-md:w-20 max-md:h-28 bg-pink-600 absolute -left-16 max-md:-left-5 top-16 max-md:top-5 flex flex-row justify-center items-center">
                        <h2 className="text-white font-bold text-3xl max-md:text-lg">
                            Sign In
                        </h2>
                    </div>
                    <div className="px-56 max-md:px-10 flex flex-col gap-1">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-center">
                                <ApplicationLogo width="w-28" />
                            </div>
                            <h2 className="text-center font-light text-lg max-md:text-sm">
                                Open your account. Start monitoring. It's that
                                easy.
                            </h2>

                            <h2 className="text-center font-bold text-xl max-md:text-sm">
                                KM Tech Solutions is currently free for up to 5
                                devices. No credit card required.
                            </h2>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
