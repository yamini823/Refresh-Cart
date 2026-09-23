import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  BrowserRouter
} from "react-router-dom";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <GoogleOAuthProvider

      clientId="126047128000-o5usa6c36ggi058gtj9n35pung9ggaan.apps.googleusercontent.com"

    >

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>

);