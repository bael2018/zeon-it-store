import cls from "../../scss/components/footer.module.scss";
import CustomLink from "../elements/custom/CustomLink";
import { useRequest } from "../../hooks/useRequest";
import {
    BsTelephone,
    BsEnvelope,
    BsInstagram,
    BsWhatsapp,
} from "react-icons/bs";
import { paths } from "../../constants/paths";
import { appLinks } from "../../constants/appLinks";
import { useBreads } from "../../hooks/useBreads";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {
    const navigate = useNavigate();
    const { data, fetching } = useRequest('get', "app");
    const { dispatcher } = useBreads([]);

    useEffect(() => {
        fetching();
    }, []);

    const navLogoHandler = () => {
        window.scrollTo(window.scrollX, 0);
        dispatcher();
        navigate(paths.MAIN);
    };

    return (
        <div className={cls.footer}>
            <div className={cls.footer__container}>
                <div className={cls.footer__wrapper}>
                    <div className={cls.footer__wrapper__logo}>
                        <div>
                            <img
                                onClick={navLogoHandler}
                                src={data[0]?.appFooterLogo}
                                alt="ZEON-IT-HUB-FOOTER-LOGO"
                            />
                        </div>
                        <div className={cls.footer__wrapper__list}>
                            <ul className={cls.company}>
                                <h4>Компания</h4>
                                <li>
                                    <CustomLink to={paths.ABOUT_US}>
                                        {appLinks.ABOUT_US}
                                    </CustomLink>
                                </li>
                                <li>
                                    <CustomLink to={paths.NEWS}>
                                        {appLinks.NEWS}
                                    </CustomLink>
                                </li>
                                <li>
                                    <CustomLink to={paths.HELP}>
                                        {appLinks.HELP}
                                    </CustomLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cls.footer__wrapper__links}>
                        <div className={cls.footer__wrapper__list}>
                            <ul>
                                <h4>Контакты</h4>
                                <li>
                                    <a
                                        href={`tel:${data[0]?.contacts.secondaryNumber}`}
                                    >
                                        <BsTelephone /> +996 500 123 456
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`tel:${data[0]?.contacts.secondaryNumber}`}
                                    >
                                        <BsTelephone /> +996 500 123 456
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`mailto:${data[0]?.contacts.email}`}
                                    >
                                        <BsEnvelope /> {data[0]?.contacts.email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={cls.footer__wrapper__list}>
                            <ul>
                                <h4>Мы в социальных сетях:</h4>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={
                                            data[0]?.contacts.socials.instagramLink
                                        }
                                    >
                                        <BsInstagram />
                                        {data[0]?.contacts.socials.instagramTitle}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data[0]?.contacts.socials.telegramLink}
                                    >
                                        <FaTelegramPlane />
                                        {data[0]?.contacts.socials.telegramTitle}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data[0]?.contacts.socials.whatsappLink}
                                    >
                                        <BsWhatsapp />
                                        {data[0]?.contacts.socials.whatsappTitle}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={cls.footer__lower}>
                    <p>Developed by Zeon 2022</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
