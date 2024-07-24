import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@teishi/bulma_theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider initialTheme={{ primary: "primary", secondary: "dark" }}>
        <App />
    </ThemeProvider>
);
