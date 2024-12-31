import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { SliderView } from "./slider";
import { SampleSliders } from "../../constants/constants";
import { useEffect, useState } from "react";
import { useStores } from "../../models";
import { observer } from "mobx-react-lite";

export const InfiniteSlider = observer(() => {
  const { backgroundImageStore, appStateStore } = useStores();
  const [loadedImages, setLoadedImages] = useState<number>(0);

  useEffect(() => {
    if (!backgroundImageStore.stringContent) {
      backgroundImageStore.setStringContent(
        SampleSliders[SampleSliders.length - 1]
      );
    }
  }, []);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const handleImageChange = (swiper: any) => {
    const activeIndex = swiper.realIndex;
    let finalIndex = 0;
    if (activeIndex - 1 < 0) {
      finalIndex = SampleSliders.length - 1;
    } else {
      finalIndex = activeIndex - 1;
    }
    if (finalIndex >= 11) {
      finalIndex = activeIndex - 12;
    }

    backgroundImageStore.setStringContent(SampleSliders[finalIndex]);
  };

  useEffect(() => {
    if (loadedImages === SampleSliders.length * 2) {
      appStateStore.setLoading(false);
    }
  }, [loadedImages]);
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
        onSlideChange={handleImageChange}
        centeredSlides={false}
        navigation={true}
        modules={[Autoplay, Navigation]}
        style={{
          height: "100%",
        }}
      >
        {SampleSliders.map((data, index) => (
          <SwiperSlide key={index} >
            <SliderView
              data={data}
              index={index}
              onImageLoad={handleImageLoad}
            />
          </SwiperSlide>
        ))}
        {SampleSliders.map((data, index) => (
          <SwiperSlide key={`duplicate-${index}`} >
            <SliderView
              data={data}
              index={index}
              onImageLoad={handleImageLoad}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});
