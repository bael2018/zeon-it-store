import cls from "../../scss/components/elements/productitemimage.module.scss";
import { setInitModal, setIsModal } from "../../store/reducers/modalReducer";
import { setZoomImage } from "../../store/reducers/productReducer";
import { useDispatch } from "react-redux";

const ProductItemImage = ({ image, count }) => {
    const dispatch = useDispatch();

    const zoomImageHandler = () => {
        dispatch(setInitModal('zoom'));
        dispatch(setIsModal(true));
        dispatch(setZoomImage({ image }))
    }

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
            <img
                onClick={zoomImageHandler}
                src={image}
                alt="картинка продукта"
            />
        </div>
    );
};

export default ProductItemImage;
