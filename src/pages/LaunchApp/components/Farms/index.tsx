import React from "react";

import "./farms.scss";
import Farm from "./Farm";

const Farms: React.FC = () => {
  return (
    <div className="pad">
      <div className="farms">
        <Farm />
      </div>
    </div>
  );
};

export default Farms;
