import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const AppStateStoreModel = types
  .model("AppState")
  .props({
    loading: types.optional(types.boolean, false),
    locale: types.optional(types.string, ""),
    openDrawer: types.optional(types.boolean, false),
    isCollapsible: types.optional(types.boolean, false),
    isDarkMode: types.optional(types.boolean, false),
    currentChartOrder: types.optional(types.array(types.number), []),
    currentChart: types.optional(types.array(types.number), []),
    // ADD isPrevDarkMode TO DETERMINE THE PREV DAKMODE STATUS DUE (For fields purposes once Darmode)
    isPrevDarkMode: types.optional(types.boolean, false),
  })
  .views((self) => ({
    isLoading: () => self.loading,
  }))
  .actions((self) => ({
    setLoading: (loading: boolean) => {
      self.loading = loading;
    },
    setLocale: (lang: string) => {
      self.locale = lang;
    },
    setOpenDrawer: (open: boolean) => {
      self.openDrawer = open;
    },
    setIsCollapsible: (isCollapsible: boolean) => {
      self.isCollapsible = isCollapsible;
    },
    setIsDarkMode: (isDarkMode: boolean) => {
      self.isDarkMode = isDarkMode;
    },
    setCurrentChartOrder: (currentChartOrder: number[]) => {
      self.currentChartOrder.replace(currentChartOrder);
    },
    setCurrentChart: (currentChart: number[]) => {
      self.currentChart.replace(currentChart);
    },
    setIsPrevDark: (isPrevDarkMode: boolean) => {
      self.isPrevDarkMode = isPrevDarkMode;
    },
    reset: () => {
      Object.keys(DEFAULT_STATE).forEach((key) => {
        const objKey = key as keyof typeof DEFAULT_STATE;
        if (
          objKey === "currentChartOrder" ||
          objKey === "currentChart" ||
          objKey === "isPrevDarkMode" ||
          objKey === "locale"
        ) {
          // Skip resetting these currentChartOrder and currentChart
          return;
        }
        self[objKey] = DEFAULT_STATE[objKey];
      });
    },
  }));

const DEFAULT_STATE = {
  loading: false,
  openDrawer: false,
  isCollapsible: false,
  isDarkMode: false,
  isPrevDarkMode: false,
  currentChartOrder: [1, 2, 3],
  currentChart: [1],
  locale: "",
};

type AppStateType = Instance<typeof AppStateStoreModel>;
export type AppState = AppStateType;
type AppStateSnapshotType = SnapshotOut<typeof AppStateStoreModel>;
export type AppStateSnapshot = AppStateSnapshotType;
export const createAppStateDefaultModel = () =>
  types.optional(AppStateStoreModel, DEFAULT_STATE);
export const getDefaultAppStateStoreModel = () => DEFAULT_STATE;
