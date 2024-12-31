import { useState } from "react";
import { translate } from "../../i18n";
import { ImageBackgroundInterface } from "../../models";
import "./carousel.css";

interface SliderProps {
  index: number;
  data: ImageBackgroundInterface;
  onImageLoad?: () => void; // Optional callback for image load
}

export const SliderView = (props: SliderProps) => {
  const { data, index, onImageLoad } = props;
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <div
      className={`home-custom-slider-item ${loaded ? "loaded" : ""}`}
      style={{ backgroundImage: `url(${data?.stringContent})` }}
    >
      <img
        src={data?.stringContent}
        alt={`Slide ${index}`}
        onLoad={handleLoad} // Trigger onLoad when the image is fully loaded
        style={{
          display: "none", // Hide the img tag
        }}
      />
      <div className="home-custom-container">
        <span className="home-location-text">
          {translate("home.location", { location: data?.location })}
        </span>
        <span className="home-name-text">
          {translate("home.name", { name: data?.name })}
        </span>
      </div>
    </div>
  );
};
