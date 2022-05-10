import cls from "../../scss/components/partials/navbarcontent.module.scss";
import CustomLink from "../elements/custom/CustomLink";
import { appLinks } from "../../constants/appLinks";
import { useBreads } from "../../hooks/useBreads";
import SearchNavList from "./list/SearchNavList";
import { AiOutlineHeart } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { FIREBASE_URL } from "../../constants/init";
import { toArray } from "../../utils/toArray";

const NavbarContent = ({ logo }) => {
    const { wishes } = useSelector((state) => state.wishes);
    const { carts , cartToggle} = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.user);
    const uid = JSON.parse(localStorage.getItem("uid"));
    const { dispatcher } = useBreads([]);
    const navigate = useNavigate();

    const { data, fetching } = useRequest(
        "get",
        `${FIREBASE_URL}users/${uid}/carts.json`
    );

    const navLogoHandler = () => {
        dispatcher();
        navigate(paths.MAIN);
    };

    useEffect(() => {
        fetching();
    }, [cartToggle]);

    return (
        <div className={cls.navbarContent}>
            <img onClick={navLogoHandler} src={logo} alt="ZEON IT HUB LOGO" />
            <SearchNavList />
            <div
                className={`${cls.navbarContent__links} ${
                    isAuth
                        ? toArray(data).length > 0 && cls.navbarContent__links_cart
                        : carts.length > 0 && cls.navbarContent__links_cart
                } ${wishes.length > 0 && cls.navbarContent__links_heart}`}
            >
                <CustomLink to={paths.WISHLIST}>
                    <AiOutlineHeart />
                    {appLinks.WISHLIST}
                </CustomLink>
                <CustomLink to={paths.CART}>
                    <IoBagOutline />
                    {appLinks.CART}
                </CustomLink>
            </div>
        </div>
    );
};

export default NavbarContent;
