import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="55664721971-n3ntm80n15473hng6d54g1s1d3s4bpu5.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
