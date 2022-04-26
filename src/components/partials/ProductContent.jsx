import { useRequest } from "../../hooks/useRequest";
import ProductWrapper from "./ProductWrapper";
import { useParams } from "react-router-dom";
import ProductImages from "./ProductImages";
import Loader from "../elements/ui/Loader";
import ProductInfo from "./ProductInfo";
import React, { useEffect } from "react";
import Error from "../../pages/Error";
import { endpoints } from "../../constants/init";

const ProductContent = () => {
    const { id } = useParams();
    const { data, status, error, fetching } = useRequest(
        "get",
        `${endpoints.PRODUCTS}?title_like=${id}`
    );

    useEffect(() => {
        fetching();
    }, [id]);

    if (error) {
        return <Error status={error} />;
    } else {
        return status ? (
            <Loader />
        ) : (
            <ProductWrapper>
                <ProductImages images={data[0]?.productImages} />
                <ProductInfo data={data[0]} />
            </ProductWrapper>
        );
    }
};

export default ProductContent;
