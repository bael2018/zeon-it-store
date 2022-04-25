import cls from "../../../scss/components/elements/customlink.module.scss";
import { Link, useMatch } from "react-router-dom";

const CustomLink = ({ to, children, ...props }) => {
    const match = useMatch(to);

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
