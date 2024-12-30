import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { NoticeType } from "antd/es/message/interface";
import { toJS } from "mobx";

export const MessageStoreModel = types
  .model("Message")
  .props({
    open: types.boolean,
    type: types.optional(types.string, ""),
    content: types.optional(types.string, ""),
  })
  .actions((self) => ({
    showMessage: (type: string, message: string) => {
      self.type = type;
      self.content = message;
      self.open = true;
    },
  }))
  .actions((self) => ({
    success: (message: string) => {
      self.showMessage("success", message);
    },
    error: (message: string) => {
      self.showMessage("error", message);
    },
    info: (message: string) => {
      self.showMessage("info", message);
    },
    warning: (message: string) => {
      self.showMessage("warning", message);
    },
    close: () => {
      self.open = false;
    },
    reset: () => {
      Object.keys(DEFAULT_STATE).forEach((key) => {
        self[key] = DEFAULT_STATE[key];
      });
    },
  }))
  .views((self) => ({
    getContent: () => {
      const { type, content } = self;
      return {
        type: type as NoticeType,
        message: type.toUpperCase(),
        description: content,
        placement: "bottomRight",
        onClose: () => {
          self.close();
        },
        duration: 5,
        style: {
          color: "#fffff",
        },
      };
    },
  }));

export const DEFAULT_STATE = {
  type: "",
  content: "",
  open: false,
};

type MessageType = Instance<typeof MessageStoreModel>;
export interface Message extends MessageType {}
type MessageSnapshotType = SnapshotOut<typeof MessageStoreModel>;
export interface MessageSnapshot extends MessageSnapshotType {}
export const createMessageDefaultModel = () =>
  types.optional(MessageStoreModel, DEFAULT_STATE);
export const getDefaultMessageStoreModel = () => DEFAULT_STATE;
