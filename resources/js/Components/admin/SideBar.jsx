import ApplicationLogo from "../ApplicationLogo";

export default function SideBar({ children }) {
    return (
        <div className="flex flex-row">
            <div className="w-2/12 h-screen shadow-md">
                <div className="w-full flex justify-center border-b">
                    <ApplicationLogo
                        className="fill-current text-gray-500"
                        width="w-28"
                    />
                </div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
