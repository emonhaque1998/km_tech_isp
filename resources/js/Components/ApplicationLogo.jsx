export default function ApplicationLogo(props) {
    return (
        <>
            <img
                src="assets/image/logo.png"
                alt=""
                className={props.width ? props.width : "w-36"}
            />
        </>
    );
}
