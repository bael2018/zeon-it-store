import { setPageEnd, setPageStart } from "../store/reducers/paginationReducer";
import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import Description from "../components/elements/custom/Description";
import PagePagination from "../components/partials/PagePagination";
import ProductList from "../components/partials/list/ProductList";
import ContentLayout from "../components/layouts/ContentLayout";
import { useDispatch, useSelector } from "react-redux";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { paths } from "../constants/paths";
import Error from "./Error";
import { endpoints } from "../constants/init";

const SingleCollection = () => {
    const { status, totalCount, error } = useSelector((state) => state.product);
    const { title } = useParams();
    const { dispatcher } = useBreads([
        { title: appLinks.COLLECTIONS, url: paths.COLLECTIONS },
        { title },
    ]);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const limit = 12;

    useEffect(() => {
        dispatch(setPageEnd(4));
        dispatch(setPageStart(0));
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.COLLECTIONS}`;
    }, []);

    const paginationQuery = () => {
        return {
            pageHandler: setPage,
            limit,
            page,
        };
    };

    return (
        <ContentLayout>
            {error ? (
                <Error status={error} />
            ) : (
                <>
                    <Description text={title} />
                    <ProductList
                        empty="На данный момент коллекции нет!"
                        params={{
                            url: endpoints.PRODUCTS,
                            search: title,
                            limit,
                            page,
                        }}
                    />
                    {!status && totalCount > limit && (
                        <PagePagination query={paginationQuery} />
                    )}
                </>
            )}
            <div className="marginTopStyle">
                <SimiliarProducts
                    limit={5}
                    url={endpoints.PRODUCTS}
                    search="Новинки"
                    description="Новинки"
                    empty="На данный момент товаров нет!"
                />
            </div>
        </ContentLayout>
    );
};

export default SingleCollection;
