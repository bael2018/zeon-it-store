import cls from "../../../scss/components/partials/similiar.module.scss";
import { fetch_saga_action } from "../../../store/sagas/fetchSaga";
import AdditionalCarousel from "../carosel/AdditionalCarousel";
import Description from "../../elements/custom/Description";
import { mathProducts } from "../../../utils/mathProducts";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../elements/ProductItem";
import Empty from "../../elements/custom/Empty";
import Loader from "../../elements/ui/Loader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Error from "../../../pages/Error";

const SimiliarProducts = ({
    limit,
    description,
    search,
    empty,
    url,
    similiar = false,
    recommened = false,
}) => {
    const { data, status, error } = useSelector((state) => state.fetch);
    const { title, id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetch_saga_action({ limit, search, url }));
    }, []);

    if (error) {
        return <Error status={error} />;
    } else {
        return (
            <div className={cls.similiar}>
                <Description text={description} />

                {window.innerWidth > 1000 ? (
                    <div className={cls.similiar__wrapper}>
                        {status ? (
                            <Loader />
                        ) : data?.length ? (
                            !similiar ? (
                                recommened ? (
                                    mathProducts(data)?.map((item) => (
                                        <ProductItem
                                            styles
                                            key={item.id}
                                            data={item}
                                        />
                                    ))
                                ) : (
                                    data?.map((item) => (
                                        <ProductItem
                                            styles
                                            key={item.id}
                                            data={item}
                                        />
                                    ))
                                )
                            ) : (
                                data
                                    ?.filter(
                                        (item) =>
                                            item.collection === title &&
                                            item.title !== id
                                    )
                                    .slice(0, 5)
                                    .map((item) => (
                                        <ProductItem
                                            styles
                                            key={item.id}
                                            data={item}
                                        />
                                    ))
                            )
                        ) : (
                            <Empty>{empty}</Empty>
                        )}
                    </div>
                ) : !similiar ? (
                    recommened ? (
                        <AdditionalCarousel data={mathProducts(data)} />
                    ) : (
                        <AdditionalCarousel data={data} />
                    )
                ) : (
                    <AdditionalCarousel
                        data={data
                            ?.filter(
                                (item) =>
                                    item.collection === title &&
                                    item.title !== id
                            )
                            .slice(0, 5)}
                    />
                )}
            </div>
        );
    }
};

export default SimiliarProducts;
