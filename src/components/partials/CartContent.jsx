import { setInitModal, setIsModal } from "../../store/reducers/modalReducer";
import cls from "../../scss/components/partials/cartcontent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    mathTotalCount,
    mathTotalPrice,
    totalDiscountPrice,
    totalPrice,
} from "../../utils/mathTotalPrice";

const CartContent = () => {
    const { carts } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const orderHandler = () => {
        dispatch(setInitModal('order'));
        dispatch(setIsModal(true));
    };

    return (
        <div className={cls.cartContent}>
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
                <span>{totalPrice(carts)} рублей</span>
            </div>
            <div className={cls.cartContent__element}>
                <p>Скидка:</p>
                <span>
                    {mathTotalPrice(carts, "discount") > 0
                        ? totalDiscountPrice(carts)
                        : 0}{" "}
                    рублей
                </span>
            </div>

            <div className={cls.cartContent__result}>
                <div className={cls.cartContent__element}>
                    <p>Итого к оплате:</p>
                    <span>
                        {totalPrice(carts) - totalDiscountPrice(carts)} рублей
                    </span>
                </div>
                <button onClick={orderHandler}>Оформить заказ</button>
            </div>
        </div>
    );
};

export default CartContent;
