import { observer } from "mobx-react-lite";
import { useStores } from "../../common/models";
import { Button } from "antd";
import { translate } from "../../common/i18n";
import "./home.css";
import InfiniteSlider from "../../common/components/carousel/carousel";

export const HomePage = observer(() => {
  const { backgroundImageStore } = useStores();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "50%",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
            paddingLeft: "2%",
            paddingRight: "1%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "15%",
              display: "flex",
              paddingLeft: 5,
              alignItems: "end",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontSize: "30px",
              textShadow: "2px 8px 4px rgba(0, 0, 0, 0.7)", // Add text shadow
            }}
          >
            {translate("home.location", {
              location: backgroundImageStore.location,
            })}
          </div>
          <div
            style={{
              width: "100%",
              height: "25%",
              display: "flex",
              alignItems: "end",
              color: "#ffffff",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "90px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Add text shadow
            }}
          >
            {translate("home.name", {
              name: backgroundImageStore.name,
            })}
          </div>
          <div
            style={{
              width: "100%",
              height: "15%",
              display: "flex",
              paddingLeft: 5,
              alignItems: "start",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontSize: "25px",
              textShadow: "2px 8px 4px rgba(0, 0, 0, 0.7)", // Add text shadow
            }}
          >
            {translate("home.description", {
              description: backgroundImageStore.description,
            })}
          </div>
          <div
            style={{
              width: "100%",
              height: "45%",
              display: "flex",
              paddingLeft: 5,
              alignItems: "center",
            }}
          >
            <Button className="explore">{translate("home.explore")}</Button>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "60%",
          }}
        >
          <InfiniteSlider />
        </div>
      </div>
    </div>
  );
});
