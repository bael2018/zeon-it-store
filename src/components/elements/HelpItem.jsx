import cls from "../../scss/components/elements/helpitem.module.scss";
import { BsChevronDown } from "react-icons/bs";

const HelpItem = ({ id, title, content, callback, active }) => {
    const activeItem = () => {
        if (active === id) {
            callback("");
        } else {
            callback(id);
        }
    };

    return (
        <div className={cls.helpItem}>
            <div onClick={activeItem} className={cls.helpItem__title}>
                <p>{title}</p>
                <span
                    className={`${active === id && cls.helpItem__title_active}`}
                >
                    <BsChevronDown />
                </span>
            </div>
            <div
                className={`${cls.helpItem__content} ${
                    active === id && cls.helpItem__content_active
                }`}
            >
                {content}
            </div>
        </div>
    );
};

export default HelpItem;
