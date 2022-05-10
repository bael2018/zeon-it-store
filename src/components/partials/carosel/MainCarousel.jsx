import SwiperCore, { Pagination, Autoplay } from "swiper";
import "../../../scss/components/partials/carousel.scss";
import { useRequest } from "../../../hooks/useRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import Empty from "../../elements/custom/Empty";
import { API_URL } from "../../../constants/init";
import Loader from "../../elements/ui/Loader";
import { useEffect } from "react";
import "swiper/css/pagination";
import Error from "../../../pages/Error";

SwiperCore.use([Autoplay]);

const MainCarousel = () => {
    const { data, status, error, fetching } = useRequest('get', `${API_URL}app`);

    useEffect(() => {
        fetching();
    }, []);

    const linkHandler = (url) => {
        window.open(url, "_blank" )
    }

    if(error){
        return <Error status={error}/>
    }else{
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
                        data[0]?.mainCarousel.map(({ image, id, url }) => (
                            <SwiperSlide key={id}>
                                <div onClick={() => url && linkHandler(url)} className="image">
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
    }
};

export default MainCarousel;
