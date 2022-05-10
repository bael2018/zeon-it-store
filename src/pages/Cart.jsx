import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import ContentLayout from "../components/layouts/ContentLayout";
import CartList from "../components/partials/list/CartList";
import Modal from "../components/elements/custom/Modal";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { endpoints, FIREBASE_URL } from "../constants/init";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRequest } from "../hooks/useRequest";
import { toArray } from "../utils/toArray";
import Loader from "../components/elements/ui/Loader";

const Cart = () => {
    const { dispatcher } = useBreads([{ title: appLinks.CART }]);
    const { carts, cartToggle } = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.user);
    const uid = JSON.parse(localStorage.getItem("uid"));

    const { data, status, fetching } = useRequest(
        "get",
        `${FIREBASE_URL}users/${uid}/carts.json`
    );

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.CART}`;
    }, []);

    useEffect(() => {
        if (isAuth) {
            fetching();
        }
    }, [cartToggle])

    return (
        <ContentLayout>
            <Modal />
            {status ? <Loader /> : <CartList data={toArray(data)} />}
            {carts.length === 0 && (
                <SimiliarProducts
                    recommened={true}
                    limit={5}
                    url={endpoints.PRODUCTS}
                    description="Возможно Вас заинтересует"
                    empty="На данный момент товаров нет!"
                />
            )}
        </ContentLayout>
    );
};

export default Cart;
