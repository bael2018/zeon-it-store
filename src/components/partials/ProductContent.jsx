import { useRequest } from '../../hooks/useRequest';
import ProductWrapper from './ProductWrapper';
import { useParams } from 'react-router-dom';
import ProductImages from './ProductImages';
import Loader from '../elements/ui/Loader';
import ProductInfo from './ProductInfo';
import React, { useEffect } from 'react'

const ProductContent = () => {
    const { id } = useParams();
    const { data, status, error, fetching } = useRequest('get', `products?title_like=${id}`)

    useEffect(() => {
        fetching()
    }, [id])

    return (
        status ? <Loader/> : (
            <ProductWrapper>
                <ProductImages images={data[0]?.productImages} />
                <ProductInfo data={data[0]}/>
            </ProductWrapper>
        )
    )
}

export default ProductContent