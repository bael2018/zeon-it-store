import cls from "../../scss/components/partials/navbarlinks.module.scss";
import { setAuthUser } from "../../store/reducers/userReducer";
import CustomLink from "../elements/custom/CustomLink";
import { useDispatch, useSelector } from "react-redux";
import { navbar_target } from "../../constants/init";
import { appLinks } from "../../constants/appLinks";
import { paths } from "../../constants/paths";
import { BiPurchaseTag } from 'react-icons/bi'
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const NavbarLinks = ({ number }) => {
    const { isAuth } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem("uid");
        dispatch(setAuthUser({ auth: false }));
        navigate(paths.MAIN);
    };

    return (
        <div id={navbar_target} className={cls.navLinks}>
            <div className={cls.navLinks__container}>
                <div className={cls.navLinks__links}>
                    <CustomLink to={paths.ABOUT_US}>
                        {appLinks.ABOUT_US}
                    </CustomLink>
                    <CustomLink to={paths.COLLECTIONS}>
                        {appLinks.COLLECTIONS}
                    </CustomLink>
                    <CustomLink to={paths.NEWS}>{appLinks.NEWS}</CustomLink>
                </div>
                <div className={cls.navLinks__contact}>
                    <span>
                        Тел: <a href={`tel:${number}`}>{number}</a>
                    </span>
                    <div>
                        {isAuth ? (
                            <>
                                <span onClick={() => navigate(paths.ORDERS)}>
                                    <BiPurchaseTag />
                                </span>
                                <span onClick={logoutHandler}>
                                    <FiLogOut />
                                </span>
                            </>
                        ) : (
                            <CustomLink to={paths.AUTH}>
                                <AiOutlineUser />
                            </CustomLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarLinks;
