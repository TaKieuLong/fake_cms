import React from "react";
import "./index.css";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./global/context/AuthenticationContext";
import "antd/dist/reset.css";
import NiceModal from "@ebay/nice-modal-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NiceModal.Provider>
          <App />
        </NiceModal.Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
