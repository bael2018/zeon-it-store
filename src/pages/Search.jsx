import { setPageEnd, setPageStart } from "../store/reducers/paginationReducer";
import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import ContentLayout from "../components/layouts/ContentLayout";
import SearchResult from "../components/partials/SearchResult";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
    const { dispatcher } = useBreads([{ title: "Результаты поиска" }]);
    const { data } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(setPageEnd(4));
        dispatch(setPageStart(0));
        document.title = `ZEON STORE | ${appLinks.SEARCH}`;
        dispatcher();
    }, []);

    return (
        <ContentLayout>
            <SearchResult result={id} />
            {data?.length === 0 && (
                <SimiliarProducts
                    limit={5}
                    url="products"
                    description="Возможно Вас заинтересует"
                    empty="На данный момент товаров нет!"
                />
            )}
        </ContentLayout>
    );
};

export default Search;
