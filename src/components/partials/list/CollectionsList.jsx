import {
    setPageEnd,
    setPageStart,
} from "../../../store/reducers/paginationReducer";
import cls from "../../../scss/components/partials/collectionslist.module.scss";
import { product_saga_action } from "../../../store/sagas/productSaga";
import CollectionsItem from "../../elements/CollectionsItem";
import Description from "../../elements/custom/Description";
import { appLinks } from "../../../constants/appLinks";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../elements/custom/Empty";
import PagePagination from "../PagePagination";
import Loader from "../../elements/ui/Loader";
import { useEffect, useState } from "react";

const CollectionsList = () => {
    const { data, status, error, totalCount } = useSelector(
        (state) => state.product
    );
    const [page, setPage] = useState(1);
    const limit = 8;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageEnd(4));
        dispatch(setPageStart(0));
    }, []);

    useEffect(() => {
        dispatch(product_saga_action({ url: "collections", limit, page }));
    }, [page]);

    const paginationQuery = () => {
        return {
            pageHandler: setPage,
            limit,
            page,
        };
    };

    return (
        <>
            <Description text={appLinks.COLLECTIONS} />
            <div className={cls.collections}>
                {status ? (
                    <Loader />
                ) : data.length ? (
                    data.map((collection) => (
                        <CollectionsItem key={collection.id} {...collection} />
                    ))
                ) : (
                    <Empty>На данный момент коллекций нет!</Empty>
                )}
            </div>
            {!status && totalCount > limit && (
                <PagePagination query={paginationQuery} />
            )}
        </>
    );
};

export default CollectionsList;
