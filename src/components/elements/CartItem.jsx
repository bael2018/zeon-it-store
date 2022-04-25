import cls from "../../scss/components/elements/cartitem.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
    decrementCartItem,
    deleteCartItem,
    incrementCartItem,
} from "../../store/reducers/cartReducer";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CartItem = ({ data }) => {
    const {
        title,
        sizeRage,
        pickedColor,
        currentPrice,
        previousPrice,
        productImages,
        id,
        count,
    } = data;
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteCartItem({ id }));
    };

    const incrementHandler = () => {
        dispatch(incrementCartItem({ id }));
    };

    const decrementHandler = () => {
        dispatch(decrementCartItem({ id }));
    };

    useEffect(() => {
        if (count === 0) {
            deleteHandler();
        }
    }, [count]);

    return (
        <div className={cls.cartItem}>
            <div className={cls.cartItem__wrapper}>
                <div className={cls.cartItem__wrapper__image}>
                    <img src={productImages[0].image} alt="картинка товара" />
                </div>
                <div className={cls.cartItem__wrapper__content}>
                    <h4>{title}</h4>
                    <p>Размер: {sizeRage}</p>
                    <p>
                        Цвет: <span style={{ background: pickedColor }}></span>
                    </p>
                    <div className={cls.cartItem__wrapper__content__price}>
                        {currentPrice} p
                        {previousPrice && <span>{previousPrice}</span>}
                    </div>
                    <div className={cls.cartItem__wrapper__content__count}>
                        <button onClick={decrementHandler}>
                            <AiOutlineMinus />
                        </button>
                        <span>{count}</span>
                        <button onClick={incrementHandler}>
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>
            </div>
            <span onClick={deleteHandler} className={cls.cartItem__close}>
                <IoMdClose />
            </span>
        </div>
    );
};

export default CartItem;
