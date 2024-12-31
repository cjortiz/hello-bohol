import React, { useState } from "react";
import Draggable from "react-draggable";
import { Input, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "./quick-access.css";
import { translate } from "../../i18n";

const QuickAccess = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSettingsPanel = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Draggable handle=".settings-header">
      <div className="draggable-settings-panel">
        <div className="settings-header">
          <SettingOutlined style={{ marginRight: 8 }} />
          <span>{translate("settings.title")}</span>
          <Button
            size="small"
            onClick={toggleSettingsPanel}
            style={{ marginLeft: "auto" }}
          >
            {isOpen ? "Close" : "Open"}
          </Button>
        </div>
        {isOpen && (
          <div className="settings-content">
            {/* <div className="setting-item">
              <label>Theme:</label>
              <select>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div> */}
            <div className="setting-item">
              <label>Search:</label>
              <Input placeholder="Search settings..." />
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default QuickAccess;
