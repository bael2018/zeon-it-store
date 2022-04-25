import { setInitModal, setIsModal } from "../../store/reducers/modalReducer";
import cls from "../../scss/components/partials/fixedmessage.module.scss";
import message from "../../assets/img/fixedMessage.png";
import { navbar_target } from "../../constants/init";
import { useRequest } from "../../hooks/useRequest";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { memo, useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import arrow from "../../assets/img/arrowup.png";
import { useDispatch } from "react-redux";

const FixedMessage = () => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();

    const { data, status, error, fetching } = useRequest('get', "app");

    useEffect(() => {
        fetching();
    }, []);

    const phoneHandler = () => {
        dispatch(setInitModal(false));
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
                <span onClick={() => setActive(!active)}>
                    <img src={message} alt="messageicon" />
                </span>
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

export default memo(FixedMessage);
