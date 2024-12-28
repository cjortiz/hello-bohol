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
  return (
    <div
      className="custom-slider-item "
      style={{ backgroundImage: `url(${data.stringContent})` }}
    >
      <img
        src={data.stringContent}
        alt={`Slide ${index}`}
        onLoad={onImageLoad} // Trigger onLoad when the image is fully loaded
        style={{
          display: "none", // Hide the img tag
        }}
      />
      <div className="custom-container ">
        <span className="location-text">
          {translate("home.location", { location: data.location })}
        </span>
        <span className="name-text">
          {translate("home.name", { name: data.name })}
        </span>
      </div>
    </div>
  );
};
