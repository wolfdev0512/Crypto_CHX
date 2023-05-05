import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import "./index.scss";
import App from "./App";
import "aos/dist/aos.css";
import Provider from "./store/Provider";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
