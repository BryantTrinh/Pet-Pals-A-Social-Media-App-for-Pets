import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#405C96"
    },
    secondary: {
      main: "#DE4567"
    },
    background: {
      main: "#F8F5F2"
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
