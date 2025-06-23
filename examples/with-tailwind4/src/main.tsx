import "./index.css"
import "./globals-v4.css";
// import "@madooei/shadcn-all-in-one/globals-v4.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
