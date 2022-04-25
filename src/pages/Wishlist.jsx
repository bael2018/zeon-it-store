import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import WishlistProducts from "../components/partials/list/WishlistProducts";
import ContentLayout from "../components/layouts/ContentLayout";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Wishlist = () => {
    const { dispatcher } = useBreads([{ title: appLinks.WISHLIST }]);
    const { wishes } = useSelector((state) => state.wishes);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.WISHLIST}`;
    }, []);

    return (
        <ContentLayout>
            <WishlistProducts />
            {wishes.length === 0 && (
                <SimiliarProducts
                    url="products"
                    limit={5}
                    description="Возможно Вас заинтересует"
                    empty="На данный момент товаров нет!"
                />
            )}
        </ContentLayout>
    );
};

export default Wishlist;
