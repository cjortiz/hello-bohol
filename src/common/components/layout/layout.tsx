import { Input } from "antd";
import { translate } from "../../i18n";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./layout.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../models";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = observer((props: LayoutProps) => {
  const { children } = props;
  const { backgroundImageStore, appStateStore } = useStores();

  const [onSearch, setOnSearch] = useState<boolean>(false);

  const handleClick = () => {
    setOnSearch(true); // Update state when input is clicked
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: `url(${backgroundImageStore?.stringContent}) center center / cover no-repeat`, // Set background image
          opacity: 0.95,
        }}
      >
        <div
          style={{
            height: "15%",
            paddingLeft: "2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="headerfont">{translate("header.title")}</div>

          <div
            style={{
              width: "35%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: "15%",
            }}
          >
            <div className="headerfont">{translate("header.home")}</div>
            <div className="headerfont">{translate("header.destination")}</div>
            <div className="headerfont">{translate("header.about")}</div>
            <div>
              <Input
                className={`search ${onSearch ? "on" : ""}`}
                prefix={<SearchOutlined style={{ color: "#ffffff" }} />}
                onFocus={handleClick}
                onBlur={() => setOnSearch(false)}
              />
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
});
