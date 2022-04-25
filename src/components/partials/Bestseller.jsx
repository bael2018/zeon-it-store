import { bestseller_saga_action } from "../../store/sagas/bestsellterSaga";
import { setBestsellerPage } from "../../store/reducers/bestsellerReducer";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DynamicList from "./list/DynamicList";
import LoadBtn from "../elements/LoadBtn";
import ProductItem from "../elements/ProductItem";

const Bestseller = () => {
    const body = useSelector((state) => state.best);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBestsellerPage({ page: 1 }));
        dispatch(bestseller_saga_action(location.pathname));
    }, []);

    const loadData = useCallback(() => {
        dispatch(setBestsellerPage({ page: body.page + 1 }));
        dispatch(bestseller_saga_action(location.pathname));
    }, [body.page]);

    return (
        <>
            <DynamicList
                empty="Ничего нет"
                description="Хит продаж"
                params={body}
                element={(data) => <ProductItem key={data.id} data={data} />}
            />
            {!body.isFinished && <LoadBtn loadData={loadData} />}
        </>
    );
};

export default Bestseller;
