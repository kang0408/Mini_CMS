import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/tailwind.css";
import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
