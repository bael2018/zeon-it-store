import "../../../scss/components/partials/productcarousel.scss";
import CollectionsItem from "../../elements/CollectionsItem";
import Description from "../../elements/custom/Description";
import { Swiper, SwiperSlide } from "swiper/react";
import { memo } from "react";

const CollectionCarousel = ({ data, description }) => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Description text={description} />
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
                {data?.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <CollectionsItem carousel {...item} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default memo(CollectionCarousel);
