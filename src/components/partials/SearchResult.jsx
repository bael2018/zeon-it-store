import Description from "../elements/custom/Description";
import PagePagination from "./PagePagination";
import ProductList from "./list/ProductList";
import { useSelector } from "react-redux";
import { useState } from "react";
import Error from "../../pages/Error";
import { endpoints } from "../../constants/init";

const SearchResult = ({ result }) => {
    const { status, error, totalCount } = useSelector(
        (state) => state.product
    );

    const [page, setPage] = useState(1);
    const limit = 12;

    const paginationQuery = () => {
        return {
            pageHandler: setPage,
            limit,
            page,
        };
    };

    if(error){
        return <Error status={error}/>
    }else{
        return (
            <>
                <Description text={`Результаты поиска по запросу: ${result}`} />
                <ProductList
                    empty="По Вашему запросу ничего не найдено."
                    params={{ url: endpoints.PRODUCTS, search: result, limit, page }}
                />
                {!status && totalCount > limit && (
                    <PagePagination query={paginationQuery} />
                )}
            </>
        );    
    }
};

export default SearchResult;
