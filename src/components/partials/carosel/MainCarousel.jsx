import SwiperCore, { Pagination, Autoplay } from "swiper";
import "../../../scss/components/partials/carousel.scss";
import { useRequest } from "../../../hooks/useRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import Empty from "../../elements/custom/Empty";
import Loader from "../../elements/ui/Loader";
import { useEffect } from "react";
import "swiper/css/pagination";

SwiperCore.use([Autoplay]);

const MainCarousel = () => {
    const { data, status, error, fetching } = useRequest('get', "app");

    useEffect(() => {
        fetching();
    }, []);

    return (
        <div className="main-carousel">
            <Swiper
                style={{ height: "auto" }}
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                grabCursor={true}
                pagination={{ clickable: true }}
                speed={1000}
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
            >
                {status ? (
                    <Loader />
                ) : data[0]?.mainCarousel.length ? (
                    data[0]?.mainCarousel.map(({ image, id }) => (
                        <SwiperSlide key={id}>
                            <div className="image">
                                <img src={image} alt="картина из карусели" />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <Empty>На данный момент нет картинок</Empty>
                )}
            </Swiper>
        </div>
    );
};

export default MainCarousel;
