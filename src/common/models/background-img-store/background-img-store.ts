import { toJS } from "mobx";
import { Instance, SnapshotOut, types } from "mobx-state-tree";

export interface ImageBackgroundInterface {
  stringContent: string;
  location: string;
  name: string;
  description: string;
  isHome: boolean;
  innerDescription: string;
  distance: number;
  coordinates: CoordinatesInterface;
  origin: CoordinatesInterface;
}

export interface CoordinatesInterface {
  lat: number;
  lng: number;
}

export const BackgroundImageModel = types
  .model("BackgroundImage")
  .props({
    stringContent: types.string,
    location: types.string,
    name: types.string,
    description: types.string,
    innerDescription: types.string,
    isHome: types.boolean,
    distance: types.number,
    coordinates: types.model("Coordinates", {
      lat: types.number,
      lng: types.number,
    }),
    origin: types.model("OriginCoordinates", {
      lat: types.number,
      lng: types.number,
    }),
  })
  .actions((self) => ({
    setStringContent: (image: ImageBackgroundInterface) => {
      if (image) {
        self.stringContent = image.stringContent;
        self.location = image.location;
        self.name = image.name;
        self.description = image.description;
        self.isHome = image.isHome;
        self.innerDescription = image.innerDescription;
        self.distance = image.distance;
        self.coordinates = image.coordinates;
        self.origin = image.origin;
      }
    },
    onOtherScreen: () => {
      self.isHome = false;
    },
  }))

  .actions((self) => ({
    reset: () => {
      self.stringContent = DEFAULT_STATE_IMAGE.stringContent;
      self.location = DEFAULT_STATE_IMAGE.location;
      self.name = DEFAULT_STATE_IMAGE.name;
      self.description = DEFAULT_STATE_IMAGE.description;
      self.isHome = DEFAULT_STATE_IMAGE.isHome;
    },
  }));

export const DEFAULT_STATE_IMAGE = {
  location: "",
  name: "",
  description: "",
  stringContent: "",
  innerDescription: "",
  isHome: true,
  distance: 0,
  coordinates: { lat: 0, lng: 0 },
  origin: { lat: 0, lng: 0 },
};

type BackgroundImageType = Instance<typeof BackgroundImageModel>;
export interface Image extends BackgroundImageType {}
type ImageSnapshotType = SnapshotOut<typeof BackgroundImageModel>;
export interface ImageSnapshot extends ImageSnapshotType {}
export const createImageDefaultModel = () =>
  types.optional(BackgroundImageModel, DEFAULT_STATE_IMAGE);
export const getDefaultBackgroundImageStoreModel = () => DEFAULT_STATE_IMAGE;
