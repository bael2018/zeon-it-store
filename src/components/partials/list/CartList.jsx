import cls from "../../../scss/components/partials/list/cartlist.module.scss";
import Description from "../../elements/custom/Description";
import { appLinks } from "../../../constants/appLinks";
import Empty from "../../elements/custom/Empty";
import CartItem from "../../elements/CartItem";
import { useSelector } from "react-redux";
import CartContent from "../CartContent";

const CartList = ({ data }) => {
    const { carts } = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.user);

    return (
        <div className={cls.cartList}>
            <Description text={appLinks.CART} />
            <div className={cls.cartList__wrapper}>
                <div className={cls.cartList__wrapper__content}>
                    {
                        isAuth ? (
                            data?.length ? (
                                data?.map((item) => (
                                    <CartItem key={item.id} data={item} />
                                ))
                            ) : (
                                <Empty>У вас нет товаров в корзине</Empty>
                            )
                        ) : (
                            carts.length ? (
                                carts.map((item) => (
                                    <CartItem key={item.pickedColor} data={item} />
                                ))
                            ) : (
                                <Empty>У вас нет товаров в корзине</Empty>
                            )
                        )
                    }
                </div>
                {
                    isAuth ? (
                        data.length >= 1 && <CartContent data={data} />
                    ) : (
                        carts.length >= 1 && <CartContent />
                    )
                }
            </div>
        </div>
    );
};

export default CartList;
