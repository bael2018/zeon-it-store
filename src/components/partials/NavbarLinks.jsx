import cls from "../../scss/components/partials/navbarlinks.module.scss";
import CustomLink from "../elements/custom/CustomLink";
import { appLinks } from "../../constants/appLinks";
import { navbar_target } from "../../constants/init";
import { paths } from "../../constants/paths";

const NavbarLinks = ({ number }) => {
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
                </div>
            </div>
        </div>
    );
};

export default NavbarLinks;
