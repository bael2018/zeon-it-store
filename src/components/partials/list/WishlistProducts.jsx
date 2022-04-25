import cls from "../../../scss/components/partials/list/wishlist.module.scss";
import Description from "../../elements/custom/Description";
import { appLinks } from "../../../constants/appLinks";
import ProductItem from "../../elements/ProductItem";
import Empty from "../../elements/custom/Empty";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const WishlistProducts = () => {
    const { wishes } = useSelector((state) => state.wishes);
    const [isFetching, setIsFetching] = useState(false);
    const [offset, setOffset] = useState(12);

    useEffect(() => {
        if (isFetching && offset < wishes.length) {
            setOffset((prev) => prev + 12);
            setIsFetching(false);
        }
    }, [isFetching]);

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return function () {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    function scrollHandler(e) {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const scrollTop = e.target.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (scrollHeight - (scrollTop + windowHeight) < 300) {
            setIsFetching(true);
        }
    }

    return (
        <div className={cls.wish}>
            <Description text={appLinks.WISHLIST} />
            {wishes?.length > 0 && (
                <h5 className={cls.wish__total}>
                    Товаров в избранном: {wishes?.length}
                </h5>
            )}
            <div className={cls.wish__wrapper}>
                {wishes?.length ? (
                    wishes
                        ?.slice(0, offset)
                        .map((wish) => (
                            <ProductItem data={wish} key={wish.id} />
                        ))
                ) : (
                    <Empty>У Вас пока нет избранных товаров</Empty>
                )}
            </div>
        </div>
    );
};

export default WishlistProducts;
