import React, { Fragment, useContext, useEffect, useState } from "react";

import "./Header.scss";

import { Button } from '../../../../components'
import UnlockWallet from '../UnlockWallet'
import logo from "../../../../assets/logo/logo_text.png";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { UserContext } from "../../store/context/UserContext";
import { useUpdateEffect } from "../../../../hooks";
import { switchNetwork } from "../../../../utils/connectors";
import { NavLink, useNavigate } from "react-router-dom";
import AccountModal from "../../modals/AccountModal";
import { getDashboardApi } from "../../../../api";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const { account, error } = useWeb3React();
  const [hasStartSale, setHasStartSale] = useState(false);
  const {
    userData: { tokenBalance },
  } = useContext(UserContext);

  useEffect(() => {
    getDashboardApi()
      .then(res => {
        const { token_sale_countdown } = res?.data?.data;
        if (token_sale_countdown && Date.now() > new Date(token_sale_countdown).getTime()) {
          setHasStartSale(true);
        }
      })
  }, []);

  useUpdateEffect(() => {
    if (error && error instanceof UnsupportedChainIdError) switchNetwork();
  }, [error]);

  return (
    <Fragment>
      <header className="header pad mx">
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" />
        </div>
        <div className="nav_links">
          <NavLink to="/app">Home</NavLink>
          <NavLink to="/app/account">Account</NavLink>
          <NavLink to="/app/calculator">Calculator</NavLink>
          <NavLink to="/app/farms">Farms</NavLink>
          {hasStartSale && <NavLink to="/app/trade/swap">Swap</NavLink>}
          {hasStartSale && <NavLink to="/app/trade/liquidity">Liquidity</NavLink>}
          {/* <NavLink to="/app/trade/swap">Swap</NavLink>
          <NavLink to="/app/trade/liquidity">Liquidity</NavLink> */}
        </div>
        <div className="block_right">
          {account ? (
            <div>
              <Button onClick={() => setDropdown(true)}>
                Get Referral Link
              </Button>
              <Button variant="secondary">
                <span className="pr-5 ">
                  {`${account.slice(0, 6)}...${account.slice(
                    account.length - 6
                  )}`}{" "}
                </span>
                <strong className=" pl-5">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 4,
                  }).format(tokenBalance)}
                  &nbsp; CHX
                </strong>
              </Button>
            </div>
          ) : (
            <UnlockWallet />
          )}
        </div>
      </header>
      <AccountModal modal={dropdown} handleClose={() => setDropdown(false)} />
    </Fragment>
  );
};

export default Header;
