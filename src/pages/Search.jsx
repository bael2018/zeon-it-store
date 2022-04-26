import { setPageEnd, setPageStart } from "../store/reducers/paginationReducer";
import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import ContentLayout from "../components/layouts/ContentLayout";
import SearchResult from "../components/partials/SearchResult";
import { useDispatch, useSelector } from "react-redux";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Error from "./Error";
import { endpoints } from "../constants/init";

const Search = () => {
    const { dispatcher } = useBreads([{ title: "Результаты поиска" }]);
    const { data, error } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(setPageEnd(4));
        dispatch(setPageStart(0));
        document.title = `ZEON STORE | ${appLinks.SEARCH}`;
        dispatcher();
    }, []);

    if (error) {
        return <Error status={error} />;
    } else {
        return (
            <ContentLayout>
                <SearchResult result={id} />
                {data?.length === 0 && (
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
    }
};

export default Search;
