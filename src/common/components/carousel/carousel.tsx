import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SliderView } from "./slider";
import { SampleSliders } from "../../constants/constants";

const InfiniteSlider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Swiper
        slidesPerView={3.5}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        centeredSlides={false}
        navigation={true}
        modules={[Autoplay, Navigation]}
        style={{
          height: "100%",
        }}
      >
        {SampleSliders.map((data, index) => (
          <SwiperSlide key={index}>
            <SliderView data={data} index={index} />
          </SwiperSlide>
        ))}
        {SampleSliders.map((data, index) => (
          <SwiperSlide key={`duplicate-${index}`}>
            <SliderView data={data} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfiniteSlider;
