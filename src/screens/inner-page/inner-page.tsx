import { observer } from "mobx-react-lite";
import { useStores } from "../../common/models";
import { useParams } from "react-router-dom";
import "./inner-page.css";
import { useState } from "react";
import { toJS } from "mobx";
import { translate } from "../../common/i18n";

export const InnerPage = observer(() => {
  const { backgroundImageStore } = useStores();
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  console.log(toJS(backgroundImageStore));
  return (
    <div className="inner-main-container">
      <div
        className={`left-inner-container ${loaded ? "loaded" : ""}`}
        style={{
          backgroundImage: `url(${backgroundImageStore?.stringContent})`,
        }}
      >
        <img
          src={backgroundImageStore?.stringContent}
          alt={`${backgroundImageStore.name}`}
          onLoad={handleLoad} // Trigger onLoad when the image is fully loaded
          style={{
            display: "none", // Hide the img tag
          }}
        />
      </div>
      <div className="right-inner-container">
        <span className="title-text">{translate("inner.title")}</span>
        <span className="name-location-text">
          {translate("inner.location", {
            location: backgroundImageStore.name,
          })}
        </span>
        <p className="description-text">
          {translate("inner.description", {
            description: backgroundImageStore?.innerDescription,
          })}
        </p>
      </div>
    </div>
  );
});
