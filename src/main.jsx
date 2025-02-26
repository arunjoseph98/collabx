import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { apptheme } from "./apptheme.js";
import ChatContextAPI from "./ContextAPI/ChatContextAPI.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChatContextAPI><ThemeProvider theme={apptheme}><App /></ThemeProvider></ChatContextAPI>
    </BrowserRouter>
  </StrictMode>
);
