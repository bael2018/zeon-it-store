import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import ProductContent from "../components/partials/ProductContent";
import ContentLayout from "../components/layouts/ContentLayout";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useParams } from "react-router-dom";
import { paths } from "../constants/paths";
import { useEffect } from "react";

const SingleProduct = () => {
    const { title, id } = useParams();
    const { dispatcher } = useBreads([
        { title: appLinks.COLLECTIONS, url: paths.COLLECTIONS },
        { title, url: `/collection/${title}` },
        { title: id },
    ]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${id}`;
    }, [id]);

    return (
        <ContentLayout>
            <ProductContent/>
            <SimiliarProducts
                similiar={true}
                limit={5}
                url='products'
                description="Похожие товары"
                empty="На данный момент товаров нет!"
            />
        </ContentLayout>
    );
};

export default SingleProduct;
