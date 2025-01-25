import { useState } from "react";
import Dropdown from "@/Components/Dropdown";

export default function Header() {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className=" w-full h-20 shadow-md flex items-center px-10">
            <div className="flex justify-end w-full">
                <Dropdown>
                    <Dropdown.Trigger>
                        <img
                            className="w-12 h-12 rounded-full object-cover object-top cursor-pointer"
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmSdkNffb_lEKR2CnI_zLNt6uc04wU8bz_5tAPn8UAnJRYhUKxtXDulRUROUBYpOYB_E4zPyRrmTH0vHNN2BQ-Cg"
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
