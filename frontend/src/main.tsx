import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ Yaha hona chahiye!
import App from "./App";
import "./index.css";
import 'react-toastify/ReactToastify.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ Router is only here! */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
