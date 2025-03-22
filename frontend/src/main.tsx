
// import { createRoot } from 'react-dom/client'
// import App from './App'

import './index.css'

// createRoot(document.getElementById("root")!).render(

// <App />
// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeProvider";
import DarkModeWrapper from "./DarkModeWrapper";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   
    
        <App />
  
  </React.StrictMode>
);


