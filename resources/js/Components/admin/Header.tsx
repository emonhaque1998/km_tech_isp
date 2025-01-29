import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { PropsWithChildren } from "react";

export default function Header({
    user,
}: PropsWithChildren<{
    user: {
        profile_image?: string;
    };
}>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    console.log(user.profile_image);

    return (
        <div className=" w-full h-20 shadow-md flex items-center px-10">
            <div className="flex justify-end w-full">
                <Dropdown>
                    <Dropdown.Trigger>
                        <img
                            className="w-12 h-12 rounded-full object-cover object-top cursor-pointer"
                            src={`/storage/${user.profile_image}`}
                            alt=""
                        />
                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown.Trigger>
                </Dropdown>
            </div>
        </div>
    );
}
