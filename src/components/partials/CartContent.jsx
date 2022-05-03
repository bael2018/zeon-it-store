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

const CartContent = () => {
    const { carts } = useSelector((state) => state.cart);
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
                                {mathTotalCount(carts)} линеек (
                                {mathTotalCount(carts) * 5} шт.)
                            </span>
                        </div>
                        <div className={cls.cartContent__element}>
                            <p>Стоимость:</p>
                            <span>{validPrice(totalPrice(carts))} рублей</span>
                        </div>
                    </>
                )
            ) : (
                <>
                    <h4>Сумма заказа</h4>
                    <div className={cls.cartContent__element}>
                        <p>Количество линеек:</p>
                        <span>{mathTotalCount(carts)} шт</span>
                    </div>
                    <div className={cls.cartContent__element}>
                        <p>Количество товаров:</p>
                        <span>{mathTotalCount(carts) * 5} шт</span>
                    </div>
                    <div className={cls.cartContent__element}>
                        <p>Стоимость:</p>
                        <span>{validPrice(totalPrice(carts))} рублей</span>
                    </div>

                    {mathTotalPrice(carts, "discount") > 0 && (
                        <div className={cls.cartContent__element}>
                            <p>Скидка:</p>
                            <span>
                                {validPrice(totalDiscountPrice(carts))}{" "}
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
                        {validPrice(`${totalPrice(carts) - totalDiscountPrice(carts)}`)} рублей
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
