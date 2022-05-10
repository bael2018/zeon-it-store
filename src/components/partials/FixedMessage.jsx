import { setInitModal, setIsModal } from "../../store/reducers/modalReducer";
import cls from "../../scss/components/partials/fixedmessage.module.scss";
import message from "../../assets/img/fixedMessage.png";
import { API_URL, navbar_target } from "../../constants/init";
import { useRequest } from "../../hooks/useRequest";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import arrow from "../../assets/img/arrowup.png";
import { useLocation } from "react-router-dom";
import { paths } from "../../constants/paths";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FixedMessage = () => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { data, fetching } = useRequest("get", `${API_URL}app`);

    useEffect(() => {
        fetching();
    }, []);

    const phoneHandler = () => {
        dispatch(setInitModal(''));
        dispatch(setIsModal(true));
        setActive(false);
    };

    return (
        <div className={cls.message}>
            <div className={cls.message__target}>
                <a href={`#${navbar_target}`}>
                    <img
                        onClick={() => setActive(false)}
                        src={arrow}
                        alt="arrowicon"
                    />
                </a>
                {!location.pathname.includes(paths.CART) && (
                    <span onClick={() => setActive(!active)}>
                        <img src={message} alt="messageicon" />
                    </span>
                )}
            </div>

            <div
                className={`${cls.message__links} ${
                    active && cls.message__links_active
                }`}
            >
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={data[0]?.contacts.socials.telegramLink}
                >
                    <FaTelegramPlane />
                </a>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={data[0]?.contacts.socials.whatsappLink}
                >
                    <AiOutlineWhatsApp />
                </a>
                <span onClick={phoneHandler}>
                    <BsTelephoneFill />
                </span>
            </div>
        </div>
    );
};

export default FixedMessage;
