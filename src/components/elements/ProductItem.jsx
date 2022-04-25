import cls from "../../scss/components/elements/productitem.module.scss";
import ProductCarousel from "../partials/carosel/ProductCarousel";
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
    const [imageActive, setImageActive] = useState("");
    const [view, setView] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        title,
        colors,
        currentPrice,
        previousPrice,
        collection,
        id,
        productImages,
        isWish
    } = data;

    const imageData = [
        {
            id: 1,
            picture:
                "https://www.freddy.com/media/catalog/product/cache/22d8158d6986fded198295ee6d841327/P/P/PPANT247F0A_Z101_-_021615827137000.jpg",
        },
        {
            id: 2,
            picture:
                "https://luxuryoutletonline.eu/9953-large_default_new/gianni-kavanagh-khaki-regular-fit-cargo-pants.jpg",
        },
    ];

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
            onMouseLeave={() => setView(false)}
            onMouseEnter={() => setView(true)}
            className={`${cls.productItem} ${styles && cls.productItem_multy}`}
        >
            {previousPrice && (
                <div className={cls.productItem__discount}>
                    {mathProcent(previousPrice, currentPrice)}%
                </div>
            )}
            <div className={`${cls.productItem__heart} ${isWish && cls.productItem__heart_visible}`}>
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
                <img
                    src={
                        imageActive === ""
                            ? productImages && productImages[0].image
                            : imageActive
                    }
                    alt="productPic"
                />
                {view && productImages?.length > 1 && (
                    <ProductCarousel
                        data={productImages}
                        activeImage={imageActive}
                        change={setImageActive}
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
                <span>Размер: 42-50</span>
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
                        <h4>empty colors</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
