import { setInitModal, setIsModal } from "../../store/reducers/modalReducer";
import cls from "../../scss/components/partials/cartcontent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    mathTotalCount,
    mathTotalPrice,
    totalDiscountPrice,
    totalPrice,
} from "../../utils/mathTotalPrice";
import { useState } from "react";
import { validPrice } from "../../utils/validPrice";

const CartContent = ({ data }) => {
    const { carts } = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.user);
    const base = isAuth ? data : carts
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    const orderHandler = () => {
        dispatch(setInitModal("order"));
        dispatch(setIsModal(true));
    };

    return (
        <div className={cls.cartContent}>
            {window.innerWidth < 850 ? (
                isVisible && (
                    <>
                        <h4>Сумма заказа</h4>
                        <div className={cls.cartContent__element}>
                            <p>Общее количество:</p>
                            <span>
                                {mathTotalCount(base)} линеек (
                                {mathTotalCount(base) * 5} шт.)
                            </span>
                        </div>
                        <div className={cls.cartContent__element}>
                            <p>Стоимость:</p>
                            <span>{validPrice(totalPrice(base))} рублей</span>
                        </div>
                    </>
                )
            ) : (
                <>
                    <h4>Сумма заказа</h4>
                    <div className={cls.cartContent__element}>
                        <p>Количество линеек:</p>
                        <span>{mathTotalCount(base)} шт</span>
                    </div>
                    <div className={cls.cartContent__element}>
                        <p>Количество товаров:</p>
                        <span>{mathTotalCount(base) * 5} шт</span>
                    </div>
                    <div className={cls.cartContent__element}>
                        <p>Стоимость:</p>
                        <span>{validPrice(totalPrice(base))} рублей</span>
                    </div>

                    {mathTotalPrice(base, "discount") > 0 && (
                        <div className={cls.cartContent__element}>
                            <p>Скидка:</p>
                            <span>
                                {validPrice(totalDiscountPrice(base))}{" "}
                                рублей
                            </span>
                        </div>
                    )}
                </>
            )}

            <div
                className={`${cls.cartContent__result} ${
                    !isVisible &&
                    window.innerWidth < 850 &&
                    cls.cartContent__result_active
                }`}
            >
                <div className={cls.cartContent__element}>
                    <p>Итого к оплате:</p>
                    <span>
                        {validPrice(`${totalPrice(base) - totalDiscountPrice(base)}`)} рублей
                    </span>
                </div>
                {window.innerWidth < 850 && (
                    <div
                        onClick={() => setIsVisible(!isVisible)}
                        className={cls.visible}
                    >
                        {isVisible ? "Скрыть" : "Информация о заказе"}
                    </div>
                )}
                <button onClick={orderHandler}>
                    {window.innerWidth < 850
                        ? "Оформление заказа"
                        : "Оформить заказ"}
                </button>
            </div>
        </div>
    );
};

export default CartContent;
