import "../../../scss/components/partials/productcarousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import { memo } from "react";
import "swiper/css/scrollbar";

const ProductCarousel = ({ change, activeImage, data }) => {
    const changeHandler = (e, picture) => {
        e.stopPropagation();
        change(picture);
    };

    return (
        <div className="product-carousel">
            <Swiper
                modules={[Scrollbar]}
                spaceBetween={10}
                slidesPerView={data?.length > 3 ? 3 : 2}
                scrollbar={{ draggable: true }}
                grabCursor={true}
                loop={true}
            >
                {data?.map(({ id, image }) => {
                    return (
                        <SwiperSlide key={id}>
                            <div
                                className={`image ${
                                    image === activeImage && "active-image"
                                }`}
                            >
                                <img
                                    onClick={(e) => changeHandler(e, image)}
                                    src={image}
                                    alt="картина из карусели"
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default memo(ProductCarousel);
