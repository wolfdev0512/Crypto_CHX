import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import "./Trade.scss";
import Swap from "./Swap";
import Liquidity from "./Liquidity";

const Trade: React.FC = () => {
  return (
    <div className="trade_route">
      <div className="trade_route-header">
        <div>
          <NavLink to="/trade/swap">Swap</NavLink>
          <NavLink to="/trade/liquidity">Liquidity</NavLink>
        </div>
      </div>
      <div className="trade_route-content">
        <Routes>
          <Route path="/swap" element={<Swap />} />
          <Route path="/liquidity" element={<Liquidity />} />
        </Routes>
      </div>
    </div>
  );
};

export default Trade;
