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
};

type BackgroundImageType = Instance<typeof BackgroundImageModel>;
export interface Image extends BackgroundImageType {}
type ImageSnapshotType = SnapshotOut<typeof BackgroundImageModel>;
export interface ImageSnapshot extends ImageSnapshotType {}
export const createImageDefaultModel = () =>
  types.optional(BackgroundImageModel, DEFAULT_STATE_IMAGE);
export const getDefaultBackgroundImageStoreModel = () => DEFAULT_STATE_IMAGE;
