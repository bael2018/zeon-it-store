import "../../../scss/components/partials/productimages.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { memo } from "react";
import { setZoomImage } from "../../../store/reducers/productReducer";
import { setInitModal, setIsModal } from "../../../store/reducers/modalReducer";

const ImagesCarousel = ({ data }) => {
    const dispatch = useDispatch();

    const zoomHandler = (image) => {
        dispatch(setInitModal('zoom'));
        dispatch(setIsModal(true));
        dispatch(setZoomImage({ image }));
    };

    return (
        <div
            className={`image-carousel ${data?.length === 1 && "single-image"}`}
        >
            {data?.length > 1 ? (
                <Swiper
                    spaceBetween={10}
                    loop={true}
                    grabCursor={true}
                    breakpoints={{
                        300: {
                            slidesPerView: 1.5,
                        },
                        700: {
                            slidesPerView: 2.5,
                        },
                        1250: {
                            slidesPerView: 3.5,
                        },
                    }}
                >
                    {data?.map(({ image, id }) => {
                        return (
                            <SwiperSlide key={id}>
                                <img
                                    src={image}
                                    onClick={() => zoomHandler(image)}
                                    alt="картинка товара"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <img
                    src={data?.length === 1 && data[0].image}
                    alt="картинка товара"
                />
            )}
        </div>
    );
};

export default memo(ImagesCarousel);
