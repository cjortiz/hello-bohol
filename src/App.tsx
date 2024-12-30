import { useEffect, useState } from "react";

import "./App.css";
import { RootStore, RootStoreProvider, setupRootStore } from "./common/models";
import { AppRoutes } from "./routes";
import { Layout } from "./common/components";

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  // Setup root store asynchronously
  useEffect(() => {
    (async () => {
      const store = await setupRootStore();
      setRootStore(store);
    })();
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
        <AppRoutes />
    </RootStoreProvider>
  );
}

export default App;
