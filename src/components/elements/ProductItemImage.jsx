import cls from "../../scss/components/elements/productitemimage.module.scss";

const ProductItemImage = ({ image, count }) => {
    return (
        <div
            className={`${cls.image} ${
                count > 1 && count < 5
                    ? cls.image__double
                    : count >= 5
                    ? cls.image__triple
                    : ""
            }`}
        >
            <img src={image} alt="картинка продукта" />
        </div>
    );
};

export default ProductItemImage;
