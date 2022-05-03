import { deleteWishlistProduct, setWishlistProducts } from "../../store/reducers/wishlistReducer";
import cls from "../../scss/components/partials/productinfo.module.scss";
import { setCartProducts } from "../../store/reducers/cartReducer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useIncluded } from "../../hooks/useIncluded";
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import { useState } from "react";
import { validPrice } from "../../utils/validPrice";

const ProductInfo = ({ data = {} }) => {
    const { wishes } = useSelector((state) => state.wishes);
    const { carts } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        title,
        article,
        previousPrice,
        currentPrice,
        colors,
        description,
        sizeRage,
        amountOfLines,
        structure,
        material,
        id,
    } = data;

    const [activeColor, setActiveColor] = useState(colors && colors[0]?.color);
    const isIncludedCart = useIncluded(carts, id, activeColor);
    const isIncludedWishes = useIncluded(wishes, id);

    const cartHandler = () => {
        if (activeColor !== "") {
            dispatch(
                setCartProducts({
                    cart: {
                        ...data,
                        pickedColor: activeColor,
                        discount: previousPrice
                            ? previousPrice - currentPrice
                            : 0,
                        count: 1,
                    },
                })
            );
        }
    };

    const wishlistHandler = () => {
        dispatch(
            setWishlistProducts({
                wishes: {
                    ...data,
                    isWish: true,
                    pickedColor: activeColor,
                },
            })
        );
    };

    return (
        <div className={`${cls.productInfo} ${data?.productImages?.length === 1 && cls.productInfo_active}`}>
            <h4>{title}</h4>
            <div className={cls.productInfo__wrapper}>
                <h5 className={cls.productInfo__element}>Артикул:</h5>
                <span>{article}</span>
            </div>
            <div className={cls.productInfo__wrapper}>
                <h5 className={cls.productInfo__element}>Цвет:</h5>
                <div className={cls.productInfo__wrapper__colors}>
                    {colors?.map(({ color }, index) => (
                        <span
                            onClick={() => setActiveColor(color)}
                            className={`${
                                activeColor === color &&
                                cls.productInfo__wrapper__colors_active
                            }`}
                            style={{ background: color }}
                            key={index}
                        ></span>
                    ))}
                </div>
            </div>
            <div className={cls.productInfo__price}>
                <p>{validPrice(currentPrice)} p</p>
                {previousPrice && <span>{validPrice(previousPrice)} p</span>}
            </div>
            <div className={cls.productInfo__content}>
                <h5 className={cls.productInfo__element}>О товаре:</h5>
                <p>{description}</p>
            </div>
            <div className={cls.productInfo__compound}>
                <p>
                    <span>Размерный ряд:</span> {sizeRage}
                </p>
                <p>
                    <span>Количество в линейке:</span> {amountOfLines}
                </p>
                <p>
                    <span>Состав ткани:</span> {structure}
                </p>
                <p>
                    <span>Материал:</span> {material}
                </p>
            </div>
            <div className={cls.productInfo__links}>
                {isIncludedCart ? (
                    <button onClick={() => navigate(paths.CART)}>
                        Перейти в корзину
                    </button>
                ) : (
                    <button onClick={cartHandler}>
                        <IoBagOutline /> Добавить в корзину
                    </button>
                )}

                {isIncludedWishes ? (
                    <button className={cls.heart} onClick={() => dispatch(deleteWishlistProduct({ id }))}>
                        <AiFillHeart />
                    </button>
                ) : (
                    <button onClick={wishlistHandler}>
                        <AiOutlineHeart />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
