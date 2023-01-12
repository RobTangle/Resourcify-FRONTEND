import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/app/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-4hixku625rb7v8m8.us.auth0.com"
      clientId="Nm0tlxPsWhiAxb3T2PLzLgynngG40PKU"
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      audience="resourcify-api"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
