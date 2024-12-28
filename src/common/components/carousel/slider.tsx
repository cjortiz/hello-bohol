import { translate } from "../../i18n";
import { ImageBackgroundInterface } from "../../models";

interface SliderProps {
  index: number;
  data: ImageBackgroundInterface;
}

export const SliderView = (props: SliderProps) => {
  const { data, index } = props;
  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        backgroundImage: `url(${data.stringContent})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 20,
        zIndex: -1,
        display: "flex",
        alignItems: "end",
        boxShadow: "10px 5px 15px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "35%",
          paddingLeft: "10%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            height: "20%",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "17px",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {translate("home.location", { location: data.location })}
        </span>
        <span
          style={{
            height: "80%",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "28px",
            color: "rgba(255, 255, 255)",
            whiteSpace: "pre-line",
          }}
        >
          {translate("home.name", { name: data.name })}
        </span>
      </div>
    </div>
  );
};
