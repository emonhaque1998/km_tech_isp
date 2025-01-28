import { SVGAttributes } from "react";
import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props: any) {
    return (
        <Link href={route("dashboard")}>
            <img
                src="/assets/image/logo.png"
                alt=""
                className={props.width ? props.width : "w-36"}
            />
        </Link>
    );
}
