import { setCollectionPage } from "../../store/reducers/collectionReducer";
import { collection_saga_action } from "../../store/sagas/collectionSaga";
import CollectionCarousel from "./carosel/CollectionCarousel";
import CollectionsItem from "../elements/CollectionsItem";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DynamicList from "./list/DynamicList";
import LoadBtn from "../elements/LoadBtn";

const Collection = () => {
    const body = useSelector((state) => state.collection);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCollectionPage({ page: 1 }));
        dispatch(collection_saga_action(location.pathname));
    }, []);

    const loadData = useCallback(() => {
        dispatch(setCollectionPage({ page: body.page + 1 }));
        dispatch(collection_saga_action(location.pathname));
    }, [body.page]);

    return window.innerWidth < 600 ? (
        <>
            <CollectionCarousel description="Коллекция" data={body.data} />
            {!body.isFinished && <LoadBtn loadData={loadData} />}
        </>
    ) : (
        <>
            <DynamicList
                description="Коллекция"
                params={body}
                empty="Ничего не найдено"
                element={(data) => (
                    <CollectionsItem key={data.id} {...data} />
                )}
            />
            {!body.isFinished && <LoadBtn loadData={loadData} />}
        </>
    );
};

export default Collection;
