import cls from "../../../scss/components/partials/similiar.module.scss";
import { fetch_saga_action } from "../../../store/sagas/fetchSaga";
import Description from "../../elements/custom/Description";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../elements/ProductItem";
import Empty from "../../elements/custom/Empty";
import Loader from "../../elements/ui/Loader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SimiliarProducts = ({
    limit,
    description,
    search,
    empty,
    url,
    similiar = false,
}) => {
    const { data, status, error } = useSelector((state) => state.fetch);
    const { title, id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetch_saga_action({ limit, search, url }));
    }, []);


    return (
        <div className={cls.similiar}>
            <Description text={description} />

            <div className={cls.similiar__wrapper}>
                {status ? (
                    <Loader />
                ) : data?.length ? (
                    !similiar ? (
                        data?.map((item) => (
                            <ProductItem styles key={item.id} data={item} />
                        ))
                    ) : (
                        data
                            ?.filter(
                                (item) =>
                                    item.collection === title &&
                                    item.title !== id
                            )
                            .slice(0,5)
                            .map((item) => (
                                <ProductItem styles key={item.id} data={item} />
                            ))
                    )
                ) : (
                    <Empty>{empty}</Empty>
                )}
            </div>
        </div>
    );
};

export default SimiliarProducts;
