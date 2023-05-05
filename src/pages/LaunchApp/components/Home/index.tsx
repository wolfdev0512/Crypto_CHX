import React from "react";

import "./Home.scss";
import BuyToken from "./BuyToken";
import { useSearchParams } from "react-router-dom";

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="pad">
      <div className="home">
        <BuyToken invitedBy={searchParams.get("invitedBy")} />
      </div>
    </div>
  );
};

export default Home;
