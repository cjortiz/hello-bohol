import { useJsApiLoader } from "@react-google-maps/api";
import { Modal, Skeleton } from "antd";
import { observer } from "mobx-react-lite";
import { MAPS_API } from "../../../config/properties";
import { useState, useEffect, useRef } from "react";
import { CoordinatesInterface, useStores } from "../../models";
import { translate } from "../../i18n";
import { toJS } from "mobx";

export const Maps = observer(
  (props: { open: boolean; onClose: () => void }) => {
    const { open, onClose } = props;
    const { backgroundImageStore } = useStores();
    const [destLoc, _] = useState<CoordinatesInterface>(
      backgroundImageStore.coordinates
    );
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: MAPS_API,
      libraries: ["geometry"],
    });
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (isLoaded && open && mapContainerRef.current) {
        console.log(toJS(backgroundImageStore.coordinates));
        const map = new google.maps.Map(mapContainerRef.current, {
          center: backgroundImageStore.coordinates,
          zoom: 15,
        });

        // Create a DirectionsService instance
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        // Get directions using the coordinates
        const request = {
          origin: backgroundImageStore.origin, // Origin coordinates (latitude, longitude)
          destination: backgroundImageStore.coordinates, // Destination coordinates (latitude, longitude)
          travelMode: google.maps.TravelMode.WALKING, // Travel mode (DRIVING, WALKING, BICYCLING, TRANSIT)
        };

        directionsService.route(request, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
            // Calculate the heading (rotation) based on the route
          } else {
            console.error("Directions request failed due to " + status);
          }
        });
        // Create the AdvancedMarkerElement using the new API
        const marker = new google.maps.Marker({
          position: backgroundImageStore.coordinates,
          map: map,
          title: "My Marker", // Optional title for the marker
        });

        marker.addListener("click", () => {
          alert("Marker clicked!");
        });
      }
    }, [isLoaded, open]);

    return (
      <Modal
        centered
        title={translate("inner.mapLoc", {
          location: backgroundImageStore.name,
        })}
        open={open}
        onCancel={onClose}
      >
        <div>
          {isLoaded ? (
            <div
              ref={mapContainerRef}
              style={{ width: "100%", height: "50vh" }}
            />
          ) : (
            <Skeleton active />
          )}
        </div>
      </Modal>
    );
  }
);
