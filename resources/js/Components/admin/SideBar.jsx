import ApplicationLogo from "../ApplicationLogo";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function SideBar({ children }) {
    const [navDropdown, setNavDropdown] = useState(false);

    const navDropdownHandler = (event) => {
        event.preventDefault();
        setNavDropdown(!navDropdown);
    };

    return (
        <div className="flex flex-row">
            <div className="w-2/12 h-screen shadow-md sticky top-0 flex flex-col gap-3">
                <div className="w-full flex justify-center border-b">
                    <ApplicationLogo
                        className="fill-current text-gray-500"
                        width="w-28"
                    />
                </div>
                <div>
                    <ul className="flex flex-col px-3">
                        <li className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center gap-2 justify-start">
                                <AiOutlineDashboard className="text-xl" />
                                <Link
                                    href=""
                                    onClick={navDropdownHandler}
                                    className="text-md"
                                >
                                    Dashboard
                                </Link>
                            </div>
                            {navDropdown ? (
                                <IoIosArrowDown className="font-thin" />
                            ) : (
                                <IoIosArrowForward className="font-thin" />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
