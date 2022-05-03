import cls from "../../../scss/components/partials/list/cartlist.module.scss";
import Description from "../../elements/custom/Description";
import { appLinks } from "../../../constants/appLinks";
import Empty from "../../elements/custom/Empty";
import CartItem from "../../elements/CartItem";
import { useSelector } from "react-redux";
import CartContent from "../CartContent";

const CartList = () => {
    const { carts } = useSelector((state) => state.cart);

    return (
        <div className={cls.cartList}>
            <Description text={appLinks.CART} />
            <div className={cls.cartList__wrapper}>
                <div className={cls.cartList__wrapper__content}>
                    {carts.length ? (
                        carts.map((item) => (
                            <CartItem key={item.pickedColor} data={item} />
                        ))
                    ) : (
                        <Empty>У вас нет товаров в корзине</Empty>
                    )}
                </div>
                {carts.length >= 1 && <CartContent />}
            </div>
        </div>
    );
};

export default CartList;
