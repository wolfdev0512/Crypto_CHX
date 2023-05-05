import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Header, Home, Farms, Account, Calculator, Trade } from './components';
import { Web3ReactProvider } from "@web3-react/core";

import { Web3Provider } from "@ethersproject/providers";
import Provider from "./store/Provider";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  console.log('library -->', library);
  return library;
};

const LaunchApp = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/trade/*" element={<Trade />} />
            <Route path="/account" element={<Account />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </div>
      </Provider>
    </Web3ReactProvider>
  )
};

export default LaunchApp;
