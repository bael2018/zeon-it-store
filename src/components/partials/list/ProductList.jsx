import cls from "../../../scss/components/partials/productlist.module.scss";
import { product_saga_action } from "../../../store/sagas/productSaga";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../elements/ProductItem";
import Empty from "../../elements/custom/Empty";
import Loader from "../../elements/ui/Loader";
import { useEffect } from "react";

const ProductList = ({ empty, params: { url, limit, page, search } }) => {
    const { data, status, error } = useSelector((state) => state.product);
    const { isSearched } = useSelector(state => state.search)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(product_saga_action({ url, limit, page, search }));
    }, [page, isSearched]);

    return (
        <div className={cls.productList}>
            {status ? (
                <Loader />
            ) : data.length ? (
                data.map((item) => <ProductItem key={item.id} data={item} />)
            ) : (
                <Empty>{empty}</Empty>
            )}
        </div>
    );
};

export default ProductList;
