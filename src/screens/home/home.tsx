import { observer } from "mobx-react-lite";
import { useStores } from "../../common/models";
import { Button } from "antd";
import { translate } from "../../common/i18n";
import "./home.css";
import { InfiniteSlider } from "../../common/components";
import { useEffect } from "react";

export const HomePage = observer(() => {
  const { backgroundImageStore, appStateStore } = useStores();
  useEffect(() => {
    appStateStore.setLoading(true);
  }, []);
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="left-container">
          <div className="location-text-style ">
            {translate("home.location", {
              location: backgroundImageStore.location,
            })}
          </div>
          <div className="name-text-style ">
            {translate("home.name", {
              name: backgroundImageStore.name,
            })}
          </div>
          <div className="desc-text-style">
            {translate("home.description", {
              description: backgroundImageStore.description,
            })}
          </div>
          <div className="explore-flex-style">
            <Button className="explore">
              <span className="explore-text">{translate("home.explore")}</span>
            </Button>
          </div>
        </div>
        <div className="right-container ">
          <InfiniteSlider />
        </div>
      </div>
    </div>
  );
});
