import { useState } from "react";
import cls from "../../scss/components/elements/newsitem.module.scss";

const NewsItem = ({ title, content, image }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={cls.news}>
            <img src={image} alt="картина новости" />
            <div>
                <h5>{title}</h5>
                <p className={`${isVisible && cls.news_visible}`}>{content}</p>
                <span onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? "Скрыть" : "Читать полностью"}
                </span>
            </div>
        </div>
    );
};

export default NewsItem;
