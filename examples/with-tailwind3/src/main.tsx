// import "./index.css";
// import "@madooei/shadcn-all-in-one/globals-v3.css";
import "./globals-v3.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
