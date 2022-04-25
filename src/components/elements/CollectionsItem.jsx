import cls from "../../scss/components/elements/collectionsitem.module.scss";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CollectionsItem = ({ title, image }) => {
    const navigate = useNavigate();

    return (
        <div className={cls.collectionItem}>
            <div className={cls.collectionItem__image}>
                <img src={image} alt="картина коллекций" />
                <p>{title}</p>
            </div>
            <div
                onClick={() => navigate(`/collection/${title}`)}
                className={cls.collectionItem__link}
            >
                <span>Смотреть все</span> <AiOutlineRight />
            </div>
        </div>
    );
};

export default CollectionsItem;
