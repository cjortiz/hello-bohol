import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const BackgroundImageModel = types
  .model("BackgroundImage")
  .props({
    stringContent: types.string,
  })
  .actions((self) => ({
    setStringContent: (url: string) => {
      self.stringContent = url;
    },
  }))
  .actions((self) => ({
    reset: () => {
      self.stringContent = DEFAULT_STATE_IMAGE.stringContent;
    },
  }));

export const DEFAULT_STATE_IMAGE = {
  stringContent: "/src/assets/images/choco_hills.png",
};

type BackgroundImageType = Instance<typeof BackgroundImageModel>;
export interface Image extends BackgroundImageType {}
type ImageSnapshotType = SnapshotOut<typeof BackgroundImageModel>;
export interface ImageSnapshot extends ImageSnapshotType {}
export const createImageDefaultModel = () =>
  types.optional(BackgroundImageModel, DEFAULT_STATE_IMAGE);
export const getDefaultBackgroundImageStoreModel = () => DEFAULT_STATE_IMAGE;
