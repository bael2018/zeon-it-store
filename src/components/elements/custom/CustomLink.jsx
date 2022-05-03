import cls from "../../../scss/components/elements/customlink.module.scss";
import { Link, useMatch } from "react-router-dom";
import { useEffect } from "react";

const CustomLink = ({ to, children, ...props }) => {
    const match = useMatch(to);

    useEffect(() => {
        window.scrollTo(window.scrollX, 0);
    }, [match])

    return (
        <Link
            to={to}
            {...props}
            className={`${cls.navlink} ${match && cls.navlink_active}`}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
