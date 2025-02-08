import { SVGAttributes } from "react";
import { Link } from "@inertiajs/react";

export default function ApplicationLogo({
    width,
    user,
}: {
    width?: string | undefined;
    user?: {
        profile_image?: string;
        id: number;
        name: string;
        email: string;
        role: "admin" | "user";
    };
}) {
    return (
        <Link href={route("dashboard")}>
            {user && (
                <img
                    src={`/storage/${user.profile_image}`}
                    alt=""
                    className={width ? width : "w-36"}
                />
            )}
            {!user && (
                <img
                    src="/assets/image/logo.png"
                    alt=""
                    className={width ? width : "w-36"}
                />
            )}
        </Link>
    );
}
