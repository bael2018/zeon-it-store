import cls from "../../scss/components/elements/productitem.module.scss";
import { mathProcent } from "../../utils/mathProcent";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import {
    deleteWishlistProduct,
    setWishlistProducts,
} from "../../store/reducers/wishlistReducer";
import { useDispatch, useSelector } from "react-redux";
import { useIncluded } from "../../hooks/useIncluded";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const ProductItem = ({ data = {}, styles = false }) => {
    const { wishes } = useSelector((state) => state.wishes);
    const [colorActive, setColorActive] = useState("");
    const [activeImage, setActiveImage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        title,
        colors,
        currentPrice,
        previousPrice,
        sizeRage,
        collection,
        id,
        productImages,
        isWish,
    } = data;

    const wishlistHandler = (e) => {
        e.stopPropagation();

        dispatch(
            setWishlistProducts({
                wishes: {
                    ...data,
                    isWish: true,
                    pickedColor: colorActive,
                },
            })
        );
    };

    const deleteItemHandler = (e) => {
        e.stopPropagation();

        dispatch(deleteWishlistProduct({ id }));
    };

    const colorActiveHandler = (e, color) => {
        e.stopPropagation();
        setColorActive(color);
    };

    const navigateHandler = () => {
        navigate(`/collection/${collection}/${title}`);
    };

    const isIncluded = useIncluded(wishes, id);

    return (
        <div
            onClick={navigateHandler}
            className={`${cls.productItem} ${styles && cls.productItem_multy}`}
        >
            {previousPrice && (
                <div className={cls.productItem__discount}>
                    {mathProcent(previousPrice, currentPrice)}%
                </div>
            )}
            <div
                className={`${cls.productItem__heart} ${
                    isWish && cls.productItem__heart_visible
                }`}
            >
                {isIncluded ? (
                    <span onClick={deleteItemHandler} className={cls.active}>
                        <FaHeart />
                    </span>
                ) : (
                    <span onClick={wishlistHandler}>
                        <FiHeart />
                    </span>
                )}
            </div>
            <div
                style={{ position: "relative" }}
                className={cls.productItem__images}
            >
                {productImages?.length > 1 ? (
                    <>
                        <img
                            src={
                                productImages && activeImage === ""
                                    ? productImages[0].image
                                    : productImages[activeImage - 1]?.image
                            }
                            alt="productPic"
                        />
                        {productImages?.map((item) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveImage(item.id)}
                                onMouseLeave={() => setActiveImage(item.id)}
                                style={{
                                    width: `calc(100% / ${productImages?.length})`,
                                    left: `calc(100% / ${productImages?.length} * ${item.id} - calc(100% / ${productImages?.length})`,
                                }}
                                className={`${cls.scroller_cover} ${
                                    item.id === activeImage &&
                                    cls.scroller_cover_active
                                }`}
                            >
                                {" "}
                                <span></span>{" "}
                            </div>
                        ))}
                    </>
                ) : (
                    <img
                        src={productImages && productImages[0].image}
                        alt="картинка товара"
                    />
                )}
            </div>
            <div className={cls.productItem__info}>
                <h5>{title}</h5>
                <div>
                    {previousPrice && (
                        <p className={cls.active}>{previousPrice} p</p>
                    )}
                    <p>{currentPrice} р</p>
                </div>
                <span>Размер: {sizeRage}</span>
                <div className={cls.productItem__info__colors}>
                    {colors?.length ? (
                        colors?.map(({ color }, index) => (
                            <div
                                onClick={(e) => colorActiveHandler(e, color)}
                                key={index}
                                className={`${
                                    color === colorActive && cls.activeColor
                                }`}
                                style={{ background: color }}
                            ></div>
                        ))
                    ) : (
                        <span>Цветов нет!</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
