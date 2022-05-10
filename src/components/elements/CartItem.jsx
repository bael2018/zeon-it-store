import cls from "../../scss/components/elements/cartitem.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
    decrementCartItem,
    deleteCartItem,
    incrementCartItem,
    setCartToggle,
} from "../../store/reducers/cartReducer";
import { validPrice } from "../../utils/validPrice";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { FIREBASE_URL } from "../../constants/init";

const CartItem = ({ data }) => {
    const {
        title,
        sizeRage,
        pickedColor,
        currentPrice,
        previousPrice,
        productImages,
        id,
        pid,
        count,
    } = data;

    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);
    const uid = JSON.parse(localStorage.getItem("uid"));

    const { fetching } = useRequest(
        "patch",
        `${FIREBASE_URL}users/${uid}/carts/${pid}.json`
    );

    const { fetching: deleteFetching } = useRequest(
        "delete",
        `${FIREBASE_URL}users/${uid}/carts/${pid}.json`
    );

    const deleteHandler = async () => {
        if(isAuth){
            await deleteFetching()
                dispatch(setCartToggle())
        }else{
            dispatch(deleteCartItem({ id, pickedColor }));
        }
    };

    const incrementHandler = async () => {
        if(isAuth){
            const body = {
                count: count + 1
            }
            await fetching(body)
            dispatch(setCartToggle())
        }else{
            dispatch(incrementCartItem({ id, pickedColor }));
        }
    };

    const decrementHandler = async () => {
        if(isAuth){
            if(count === 1){
                await deleteFetching()
                dispatch(setCartToggle())
            }else{
                const body = {
                    count: count - 1
                }
                await fetching(body)
                dispatch(setCartToggle())
            }
        }else{
            dispatch(decrementCartItem({ id, pickedColor }));
        }
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
                    <img src={productImages[0]?.image} alt="картинка товара" />
                </div>
                <div className={cls.cartItem__wrapper__content}>
                    <h4>{title}</h4>
                    <p>Размер: {sizeRage}</p>
                    <p>
                        Цвет: <span style={{ background: pickedColor }}></span>
                    </p>
                    <div className={cls.cartItem__wrapper__content__price}>
                        {validPrice(currentPrice)} p
                        {previousPrice && <span>{validPrice(previousPrice)}</span>}
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
