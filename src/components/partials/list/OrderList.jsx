import cls from "../../../scss/components/partials/list/orderlist.module.scss";
import { FIREBASE_URL } from "../../../constants/init";
import { useRequest } from "../../../hooks/useRequest";
import { toArray } from "../../../utils/toArray";
import OrderItem from "../../elements/OrderItem";
import Loader from "../../elements/ui/Loader";
import Error from "../../../pages/Error";
import { useEffect } from "react";
import { lastItem } from "../../../utils/lastItem";

const OrderList = () => {
    const uid = JSON.parse(localStorage.getItem("uid"));

    const { data, status, error, fetching } = useRequest(
        "get",
        `${FIREBASE_URL}users/${uid}/orders.json`
    );

    useEffect(() => {
        fetching();
    }, []);

    // const result = toArray(toArray(data));
    // const orderList = result.slice(0, [result.length - 1]);

    if (error) {
        return <Error status={error} />;
    } else {
        return status ? (
            <Loader />
        ) : (
            toArray(data).map((item, index) => (
                <div key={index} className={cls.order}>
                    <h4>Заказ под номером {index + 1}</h4>
                    {lastItem(toArray(item)).map((order) => (
                        <OrderItem key={item.id} data={order} />
                    ))}
                </div>
            ))
        );
    }
};

export default OrderList;
