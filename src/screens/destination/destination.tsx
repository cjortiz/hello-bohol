import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import { ImageBackgroundInterface, useStores } from "../../common/models";
import { translate } from "../../common/i18n";
import { SampleSliders } from "../../common/constants/constants";
import "./destination.css";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config";
import { Popover } from "antd";

export const Destination = observer(() => {
  const { backgroundImageStore } = useStores();
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  const isElementVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const checkVisibility = () => {
    const items = containerRef.current.querySelectorAll(".slider-item");
    const visibleItemIndexes = new Set();

    items.forEach((item, index) => {
      if (isElementVisible(item)) {
        visibleItemIndexes.add(index);
      }
    });

    setVisibleItems(
      (prevItems) => new Set([...prevItems, ...visibleItemIndexes])
    );
  };

  // Scroll event listener
  useEffect(() => {
    const onScroll = () => {
      checkVisibility();
    };

    const scrollContainer = containerRef.current;
    scrollContainer.addEventListener("scroll", onScroll);

    requestAnimationFrame(() => {
      checkVisibility();
    });

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleInnerPage = (data: ImageBackgroundInterface) => {
    backgroundImageStore.setStringContent(data);

    navigate(`${PATHS.INNER.path}/${backgroundImageStore.name}`);
  };

  return (
    <div className="dest-main-container">
      <span
        style={{
          fontSize: 45,
          color: "#FFFFFF",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {translate("destination.title")}
      </span>
      <span
        style={{
          fontSize: 16,
          marginTop: 20,
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          whiteSpace: "pre-line",
        }}
      >
        {translate("destination.titleDesc")}
      </span>

      <div className="custom-scrollbar" ref={containerRef}>
        {SampleSliders.map((slides, index) => {
          const isVisible = visibleItems.has(index);

          return (
            <Popover
              title={translate("destination.explore", {
                location: slides.name,
              })}
            >
              <div
                key={index}
                className={`slider-item ${isVisible ? "visible" : "hidden"}`}
                data-index={index}
                onClick={() => handleInnerPage(slides)}
              >
                <div
                  className="custom-slider-item"
                  style={{ backgroundImage: `url(${slides.stringContent})` }}
                >
                  <div className="custom-container">
                    <span className="location-text">
                      {translate("home.location", {
                        location: slides.location,
                      })}
                    </span>
                    <span className="name-text">
                      {translate("home.name", { name: slides.name })}
                    </span>
                  </div>
                </div>
              </div>
            </Popover>
          );
        })}
      </div>
    </div>
  );
});
