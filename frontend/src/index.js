import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RoleProvider } from "./store/RoleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RoleProvider>
      <App />
    </RoleProvider>
  </BrowserRouter>
);
