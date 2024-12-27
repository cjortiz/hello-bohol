import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import { StrictMode } from "react";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container is missing in the DOM.");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
