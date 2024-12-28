import { Instance, SnapshotOut, types } from "mobx-state-tree";

export interface ImageBackgroundInterface {
  stringContent: string;
  location: string;
  name: string;
  description: string;
}

export const BackgroundImageModel = types
  .model("BackgroundImage")
  .props({
    stringContent: types.string,
    location: types.string,
    name: types.string,
    description: types.string,
  })
  .actions((self) => ({
    setStringContent: (image: ImageBackgroundInterface) => {
      self.stringContent = image.stringContent;
      self.location = image.location;
      self.name = image.name;
      self.description = image.description;
    },
  }))
  .actions((self) => ({
    reset: () => {
      self.stringContent = DEFAULT_STATE_IMAGE.stringContent;
      self.location = DEFAULT_STATE_IMAGE.location;
      self.name = DEFAULT_STATE_IMAGE.name;
      self.description = DEFAULT_STATE_IMAGE.description;
    },
  }));

export const DEFAULT_STATE_IMAGE = {
  location: "Carmen",
  name: "Chocolate Hills",
  description:
    "A geological masterpiece, enchanting visitors with its otherworldly beauty nestled in the heart of Bohol.",
  stringContent: "/src/assets/images/choco.png",
};

type BackgroundImageType = Instance<typeof BackgroundImageModel>;
export interface Image extends BackgroundImageType {}
type ImageSnapshotType = SnapshotOut<typeof BackgroundImageModel>;
export interface ImageSnapshot extends ImageSnapshotType {}
export const createImageDefaultModel = () =>
  types.optional(BackgroundImageModel, DEFAULT_STATE_IMAGE);
export const getDefaultBackgroundImageStoreModel = () => DEFAULT_STATE_IMAGE;
