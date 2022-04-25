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

const SingleCollection = () => {
    const { status, totalCount } = useSelector((state) => state.product);
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
            <Description text={title} />
            <ProductList
                empty="На данный момент коллекции нет!"
                params={{ url: "products", search: title, limit, page }}
            />
            {!status && totalCount > limit && (
                <PagePagination query={paginationQuery} />
            )}
            <SimiliarProducts
                limit={5}
                url='products'
                search='Новинки'
                description="Новинки"
                empty="На данный момент товаров нет!"
            />
        </ContentLayout>
    );
};

export default SingleCollection;
