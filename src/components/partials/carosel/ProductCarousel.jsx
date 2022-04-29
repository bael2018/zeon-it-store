// import "../../../scss/components/partials/productcarousel.scss";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Scrollbar } from "swiper";
// import "swiper/css/scrollbar";
// import { memo } from "react";

// const ProductCarousel = ({ data }) => {
//     return (
//         <div className="product-carousel">
//             <Swiper
//                 modules={[Scrollbar]}
//                 spaceBetween={10}
//                 slidesPerView={1}
//                 scrollbar={{ draggable: true }}
//                 grabCursor={true}
//                 loop={true}
//             >
//                 {data?.map(({ id, image }) => {
//                     return (
//                         <SwiperSlide key={id}>
//                             <div
//                                 className='image'
//                             >
//                                 <img
//                                     src={image}
//                                     alt="картина из карусели"
//                                 />
//                             </div>
//                         </SwiperSlide>
//                     );
//                 })}
//             </Swiper>
//         </div>
//     );
// };

// export default memo(ProductCarousel);
