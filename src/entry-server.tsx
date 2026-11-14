// Wejście dla buildu SSR: scripts/prerender.mjs wstawia ten HTML do dist/index.html.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export const html = renderToString(
  <StrictMode>
    <App />
  </StrictMode>,
);
