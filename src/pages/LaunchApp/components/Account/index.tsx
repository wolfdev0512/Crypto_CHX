import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useContext, useEffect, useState } from "react";

import "./Account.scss";
import { formatNumber } from "../../../../helpers/formatters";
import { UserContext } from "../../store/context/UserContext";
import { getApy } from "../../../../utils/contractMethods";

const Account: React.FC<{}> = () => {
  const { account, library } = useWeb3React();
  const { userData } = useContext(UserContext);
  const [apy, setApy] = useState(0);

  const handleGetApy = useCallback(async () => {
    if (account) {
      try {
        const data = await getApy(library?.provider, account);
        setApy(data.apy);
      } catch (error) {
        console.log(error);
      }
    }
  }, [account, library]);

  useEffect(() => {
    handleGetApy();
  }, [handleGetApy]);

  return (
    <div className="account_route">
      <div className="mx pad">
        <div className="account_route-header">
          <div>
            <p>Your Balance</p>
            <h2>{formatNumber(userData.tokenBalance)}</h2>
            <b>CHX</b>
          </div>
          <div>
            <p>Current APY</p>
            <h2>{formatNumber(apy, 0, 2)}%</h2>
          </div>
          <div>
            <p>Your staking</p>
            <h2>{formatNumber(userData.totalStaked)}</h2>
            <b>CHX</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
