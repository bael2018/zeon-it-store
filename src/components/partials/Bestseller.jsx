import { bestseller_saga_action } from "../../store/sagas/bestsellterSaga";
import { setBestsellerPage } from "../../store/reducers/bestsellerReducer";
import AdditionalCarousel from "./carosel/AdditionalCarousel";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DynamicList from "./list/DynamicList";
import LoadBtn from "../elements/LoadBtn";
import ProductItem from "../elements/ProductItem";
import Error from "../../pages/Error";

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

    if (body.error) {
        return <Error status={body.error} />;
    } else {
        return (
            <>
                {window.innerWidth < 600 ? (
                    <>
                        <AdditionalCarousel description='Хит продаж' data={body.data} />
                        {!body.isFinished && <LoadBtn loadData={loadData} />}
                    </>
                ) : (
                    <>
                        <DynamicList
                            empty="Ничего нет"
                            description="Хит продаж"
                            params={body}
                            element={(data) => (
                                <ProductItem key={data.id} data={data} />
                            )}
                        />
                        {!body.isFinished && <LoadBtn loadData={loadData} />}
                    </>
                )}
            </>
        );
    }
};

export default Bestseller;
