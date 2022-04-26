import cls from "../../scss/components/partials/productimageslist.module.scss";
import ProductItemImage from "../elements/ProductItemImage";

const ProductImages = ({ images }) => {
    return (
        <div className={cls.productImages}>
            {images?.map((image) => (
                <ProductItemImage
                    count={images?.length}
                    key={image.id}
                    {...image}
                />
            ))}
        </div>
    );
};

export default ProductImages;
