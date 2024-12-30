import { Input } from "antd";
import { translate } from "../../i18n";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./layout.css";
import { observer } from "mobx-react-lite";
import { ImageBackgroundInterface, useStores } from "../../models";
import { Outlet, useNavigate } from "react-router-dom";
import { PATHS } from "../../../config";
import { SampleSliders } from "../../constants/constants";
import { toJS } from "mobx";

interface LayoutProps {
  children: React.ReactNode;
}

const onOtherScreenData: ImageBackgroundInterface = {
  stringContent: "",
  location: "",
  name: "",
  description: "",
  isHome: false,
};

export const Layout = observer(() => {
  const navigate = useNavigate();
  const { backgroundImageStore, appStateStore } = useStores();
  const [updateKey, setUpdateKey] = useState<number>(0);
  const [onSearch, setOnSearch] = useState<boolean>(false);

  const forceReRender = () => setUpdateKey((prev) => prev + 1);

  const handleClick = () => {
    setOnSearch(true); // Update state when input is clicked
  };

  const handleNavigate = (path: string) => {
    navigate(path);
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
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `${
          backgroundImageStore.isHome
            ? `url(${backgroundImageStore?.stringContent}) center center / cover no-repeat, #132119`
            : "#132119"
        }`, // Set background image and color
        opacity: 0.95,
      }}
    >
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
            />
          </div>
        </div>
      </div>
      <div style={{ height: "85%" }}>
        <Outlet />
      </div>
    </div>
  );
});
