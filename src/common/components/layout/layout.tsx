import { Input } from "antd";
import { i18n, translate } from "../../i18n";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./layout.css";
import { observer } from "mobx-react-lite";
import { ImageBackgroundInterface, useStores } from "../../models";
import { Outlet, useNavigate } from "react-router-dom";
import { PATHS } from "../../../config";
import { SampleSliders } from "../../constants/constants";
import { toJS } from "mobx";
import QuickAccess from "../quickaccess/quick-access";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = observer(() => {
  const navigate = useNavigate();
  const { backgroundImageStore, appStateStore } = useStores();
  const [_, setUpdateKey] = useState<number>(0);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const forceReRender = () => setUpdateKey((prev) => prev + 1);

  const handleClick = () => {
    setOnSearch(true); // Update state when input is clicked
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handlerChange = () => {
    i18n.locale = "ja";
    forceReRender();
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (location.pathname === PATHS.HOME.path) {
      backgroundImageStore.setStringContent(
        SampleSliders[SampleSliders.length - 1]
      );
    } else {
      backgroundImageStore.onOtherScreen();
    }
  }, [location.pathname]);

  return (
    <div
      className={`layout-main-container ${loaded ? "loaded" : ""}`}
      style={{
        background: `${
          backgroundImageStore.isHome
            ? `url(${backgroundImageStore?.stringContent}) center center / cover no-repeat, #132119`
            : "#132119"
        }`,
      }}
    >
      <img
        src={backgroundImageStore?.stringContent}
        alt={backgroundImageStore.name}
        onLoad={handleLoad} // Trigger onLoad when the image is fully loaded
        style={{
          display: "none", // Hide the img tag
        }}
      />
      <div className="header-container">
        <div className="headerfont">{translate("header.title")}</div>

        <div className="header-content">
          <div
            className="headerfont"
            onClick={() => handleNavigate(PATHS.HOME.path)}
          >
            {translate("header.home")}
          </div>
          <div
            className="headerfont"
            onClick={() => handleNavigate(PATHS.DESTINATION.path)}
          >
            {translate("header.destination")}
          </div>
          <div
            className="headerfont"
            onClick={() => handleNavigate(PATHS.ABOUT.path)}
          >
            {translate("header.about")}
          </div>
          <div style={{ marginLeft: 10 }}>
            <Input
              className={`search ${onSearch ? "on" : ""}`}
              prefix={<SearchOutlined style={{ color: "#ffffff" }} />}
              onFocus={handleClick}
              onBlur={() => setOnSearch(false)}
              placeholder={translate("header.destination")}
            />
          </div>
        </div>
      </div>
      {/* <QuickAccess /> */}
      <div style={{ height: "85%" }}>
        <Outlet key={_} />
      </div>
    </div>
  );
});
