import BreadCrumb from "../elements/custom/BreadCrumb";
import NavbarContent from "../partials/NavbarContent";
import { useRequest } from "../../hooks/useRequest";
import NavbarLinks from "../partials/NavbarLinks";
import { API_URL } from "../../constants/init";
import { useEffect } from "react";

const Navbar = () => {
    const { data, fetching } = useRequest("get", `${API_URL}app`);

    useEffect(() => {
        fetching();
    }, []);

    return (
        <>
            <NavbarLinks number={data[0]?.contacts.phoneNumber} />
            <NavbarContent logo={data[0]?.appLogo} />
            <BreadCrumb />
        </>
    );
};

export default Navbar;
