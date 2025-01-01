import { observer } from "mobx-react-lite";
import { useStores } from "../../common/models";
import { useParams } from "react-router-dom";
import "./inner-page.css";
import { useState } from "react";
import { toJS } from "mobx";
import { translate } from "../../common/i18n";
import {
  CaseIcon,
  FlagIcon,
  MemoIcon,
  MountainIcon,
  PinIcon,
  RoutIcon,
} from "../../common/constants/constants";
import { Button, Flex, Space } from "antd";
import { Maps } from "../../common/components";

export const InnerPage = observer(() => {
  const { backgroundImageStore } = useStores();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(backgroundImageStore.location);
  const [desc, setDesc] = useState<string>(backgroundImageStore.description);
  const [showIconDesc, setShowIconDesc] = useState<boolean>(true);
  const [openMaps, setOpenMaps] = useState<boolean>(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleTitle = () => {};

  const buttonContainer = (icon: string, stringContent: string) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <img src={icon} />
        <span>{stringContent}</span>
      </div>
    );
  };

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
        <span className="title-text">{title}</span>
        <span className="name-location-text">
          {translate("inner.location", {
            location: backgroundImageStore.name,
          })}
        </span>
        <span className="description-text">
          {translate("inner.description", {
            description: desc,
          })}
        </span>
        {showIconDesc && (
          <div className="icon-desc-container">
            <div className="geological-parent">
              <div className="geological-container">
                <img src={MountainIcon} alt="Mountain Icon" />
              </div>
              <div className="geological-text">
                {translate("inner.geological")}
              </div>
            </div>
            <div className="geological-parent">
              <div className="geological-container">
                <img src={PinIcon} alt="Mountain Icon" />
              </div>
              <div className="geological-text">
                {translate("inner.distance", {
                  distance: backgroundImageStore.distance,
                })}
              </div>
            </div>
          </div>
        )}
        <div className="inner-button-container">
          <Button className="inner-button" iconPosition="start">
            {buttonContainer(FlagIcon, translate("inner.history"))}
          </Button>
          <Button className="inner-button" onClick={() => setOpenMaps(true)}>
            {buttonContainer(RoutIcon, translate("inner.howto"))}
          </Button>
          <Button className="inner-button">
            {buttonContainer(MemoIcon, translate("inner.todo"))}
          </Button>
          <Button className="inner-button">
            {buttonContainer(CaseIcon, translate("inner.book"))}
          </Button>
        </div>
      </div>
      <Maps open={openMaps} onClose={() => setOpenMaps(false)} />
    </div>
  );
});
