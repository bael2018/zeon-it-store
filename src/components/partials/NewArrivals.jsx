import { newArrival_saga_action } from "../../store/sagas/newArrivalSaga";
import { newArrivalPage } from "../../store/reducers/newArrivalReducer";
import AdditionalCarousel from "./carosel/AdditionalCarousel";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../elements/ProductItem";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DynamicList from "./list/DynamicList";
import LoadBtn from "../elements/LoadBtn";
import Error from "../../pages/Error";

const NewArrivals = () => {
    const body = useSelector((state) => state.new);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newArrivalPage({ page: 1 }));
        dispatch(newArrival_saga_action(location.pathname));
    }, []);

    const loadData = useCallback(() => {
        dispatch(newArrivalPage({ page: body.page + 1 }));
        dispatch(newArrival_saga_action(location.pathname));
    }, [body.page]);

    if (body.error) {
        return <Error status={body.error} />;
    } else {
        return window.innerWidth < 600 ? (
            <>
                <AdditionalCarousel description="Новинки" data={body.data} />
                {!body.isFinished && <LoadBtn loadData={loadData} />}
            </>
        ) : (
            <>
                <DynamicList
                    empty="На данный момент данных нет"
                    description="Новинки"
                    params={body}
                    element={(data) => (
                        <ProductItem key={data.id} data={data} />
                    )}
                />
                {!body.isFinished && <LoadBtn loadData={loadData} />}
            </>
        );
    }
};

export default NewArrivals;
