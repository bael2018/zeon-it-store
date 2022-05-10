import ContentLayout from "../components/layouts/ContentLayout";
import OrderList from "../components/partials/list/OrderList";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";

const Orders = () => {
    const { dispatcher } = useBreads([{ title: appLinks.ORDERS }]);

    useEffect(() => {
        dispatcher()
        document.title = `ZEON STORE | ${appLinks.ORDERS}`
    }, [])

    return (
        <ContentLayout>
            <OrderList />
        </ContentLayout>
    );
};

export default Orders;
