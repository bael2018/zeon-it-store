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

const NavbarContent = ({ logo }) => {
    const { wishes } = useSelector((state) => state.wishes);
    const { carts } = useSelector((state) => state.cart);
    const { dispatcher } = useBreads([]);
    const navigate = useNavigate();
    
    const navLogoHandler = () => {
        dispatcher();
        navigate(paths.MAIN);
    };
    
    return (
        <div className={cls.navbarContent}>
            <img onClick={navLogoHandler} src={logo} alt="ZEON IT HUB LOGO" />
            <SearchNavList />
            <div
                className={`${cls.navbarContent__links} ${
                    carts.length > 0 && cls.navbarContent__links_cart
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
