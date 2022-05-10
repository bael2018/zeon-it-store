import ImagesCarousel from '../partials/carosel/ImagesCarousel'
import { useRequest } from "../../hooks/useRequest";
import { API_URL, endpoints } from "../../constants/init";
import ProductWrapper from "./ProductWrapper";
import { useParams } from "react-router-dom";
import ProductImages from "./ProductImages";
import Loader from "../elements/ui/Loader";
import ProductInfo from "./ProductInfo";
import React, { useEffect } from "react";
import Error from "../../pages/Error";

const ProductContent = () => {
    const { id } = useParams();
    const { data, status, error, fetching } = useRequest(
        "get",
        `${API_URL}${endpoints.PRODUCTS}?title_like=${id}`
    );

    useEffect(() => {
        window.scrollTo(window.scrollX, 0);
        fetching();
    }, [id]);

    if (error) {
        return <Error status={error} />;
    } else {
        return status ? (
            <Loader />
        ) : (
            <ProductWrapper>
                {window.innerWidth < 950 ? (
                    <ImagesCarousel data={data[0]?.productImages} />
                ) : (
                    <ProductImages images={data[0]?.productImages} />
                )}
                <ProductInfo data={data[0]} />
            </ProductWrapper>
        );
    }
};

export default ProductContent;
