import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Amplify } from "aws-amplify";
import config from "./api/congnito.json";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
