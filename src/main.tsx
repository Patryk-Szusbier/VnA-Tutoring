import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/instrument-sans/wght.css";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Build wstawia do #root gotowy HTML (scripts/prerender.mjs); w trybie dev #root jest pusty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
