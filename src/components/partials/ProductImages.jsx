import cls from "../../scss/components/partials/productimageslist.module.scss";
import ProductItemImage from "../elements/ProductItemImage";

const ProductImages = ({ images }) => {
    const imageData = [
        {
            id: 1,
            picture:
                "https://www.freddy.com/media/catalog/product/cache/22d8158d6986fded198295ee6d841327/P/P/PPANT247F0A_Z101_-_021615827137000.jpg",
        },
        {
            id: 2,
            picture:
                "https://luxuryoutletonline.eu/9953-large_default_new/gianni-kavanagh-khaki-regular-fit-cargo-pants.jpg",
        },
        {
            id: 3,
            picture:
                "https://luxuryoutletonline.eu/9953-large_default_new/gianni-kavanagh-khaki-regular-fit-cargo-pants.jpg",
        },
        {
            id: 4,
            picture:
                "https://luxuryoutletonline.eu/9953-large_default_new/gianni-kavanagh-khaki-regular-fit-cargo-pants.jpg",
        },
        {
            id: 5,
            picture:
                "https://luxuryoutletonline.eu/9953-large_default_new/gianni-kavanagh-khaki-regular-fit-cargo-pants.jpg",
        },
    ];

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
