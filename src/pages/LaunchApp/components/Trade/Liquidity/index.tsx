import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";

import { Button } from "../../../../../components";
import BnbLogo from "../../../../../assets/icons/bnb_logo.svg";
import ChxLogo from "../../../../../assets/logo/token.png";
import {
  checkAvailableLiquidity, 
  getAmountsForLiquidityERC20,
} from "../../../../../utils/swapMethods";
import { useDebounce } from "../../../../../hooks";
import { TransactionContext } from "../../../store/context/TransactionContext";
import { UserContext } from "../../../store/context/UserContext";
import { ethers } from "ethers";

const Liquidity: React.FC<{}> = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { account, library, chainId } = useWeb3React();
  const [userLiquidity, setUserLiquidity] = useState(0);
  const debouncedValue = useDebounce<string>(from, 500);
  const { setTransaction, loading } = useContext(TransactionContext);
  const { userData } = useContext(UserContext);

  useMemo(async () => {
    if (account && library && debouncedValue) {
      try {
        if (Number(debouncedValue) <= 0) return;
        const liquidity = await getAmountsForLiquidityERC20(
          library?.getSigner(),
          ethers.utils.parseEther(debouncedValue),
          chainId
        );
        setTo(ethers.utils.formatEther(liquidity.toString()));
      } catch (error) {
        console.log(error);
        setTo("0");
      }
    }
  }, [debouncedValue, library, chainId, account]);

  const handleGetLiquidityData = useCallback(async () => {
    if (account && chainId) {
      try {
        setUserLiquidity(
          await checkAvailableLiquidity(library?.getSigner(), chainId, account)
        );
        //setUserLiquidity(0);
      } catch (error) {
        setUserLiquidity(0);
      }
    }
  }, [library, chainId, account]);

  useEffect(() => {
    handleGetLiquidityData();
  }, [handleGetLiquidityData]);

  const handleAddLiquidity = async () => {
    try {
      if (!account) return alert("connect wallet to proceed");
      setTransaction({ loading: true, status: "pending" });
      const { addLiquidity } = await import("../../../../../utils/swapMethods");
      await addLiquidity(library?.getSigner(), account, chainId, from);
      setTransaction({ loading: true, status: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  const handleRemoveLiquidity = async () => {
    try {
      if (!account) return alert("connect wallet to proceed");
      setTransaction({ loading: true, status: "pending" });
      const { removeLiquidity } = await import("../../../../../utils/swapMethods");
      await removeLiquidity(
        library?.getSigner(),
        account,
        chainId,
        withdrawAmount
      );
      setTransaction({ loading: true, status: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <div className="liquidity pad">
      <div className="liquidity_wrapper mb-30">
        <div className="liquidity_wrapper-header mb-20">
          <h3 style={{ textAlign: "center" }}>Add Liquidity</h3>
        </div>
        <div className="form">
          <div className="form_input">
            <div className="form_input-header">
              <div className="form_input-header_title">
                <div className="logo">
                  <img src={ChxLogo} alt="chainedx logo" />
                  <span>{"CHX"}</span>
                </div>
              </div>
              <div className="form_input-header_details">
                <p>
                  Balance:{" "}
                  <strong>
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    }).format(userData.tokenBalance)}
                  </strong>
                </p>
              </div>
            </div>
            <div className="form_input-content">
              <input
                type={"number"}
                min="0"
                value={from}
                onChange={({ target }) => setFrom(target.value)}
                placeholder="0.0"
              />
              <Button>Max</Button>
            </div>
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: "1.5em" }}>+</p>
          </div>
          <div className="form_input">
            <div className="form_input-header">
              <div className="form_input-header_title">
                <div className="logo">
                  <img src={BnbLogo} alt="chainedx logo" />
                  <span>{"BNB"}</span>
                </div>
              </div>
              <div className="form_input-header_details">
                <p>
                  Balance:{" "}
                  <strong>
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    }).format(userData.nativeBalance)}
                  </strong>
                </p>
              </div>
            </div>
            <div className="form_input-content">
              <input
                type={"number"}
                min="0"
                value={to}
                onChange={({ target }) => setTo(target.value)}
                placeholder="0.0"
              />
            </div>
          </div>
          <div className="controls">
            <Button
              disabled={
                loading ||
                !Number(from) ||
                Number(from) > Number(userData.tokenBalance)
              }
              onClick={() => handleAddLiquidity()}
            >
              Add Liquidity
            </Button>
          </div>
        </div>
      </div>
      <div className="liquidity_wrapper">
        <div className="liquidity_wrapper-header mb-20">
          <h3 style={{ textAlign: "center" }}>Remove Liquidity</h3>
          <div className="coins">
            <div>
              <img src={ChxLogo} alt="chainedx logo" />
              <img src={BnbLogo} alt="chainedx logo" />
            </div>
            <span>CHX-BNB</span>
          </div>
        </div>
        <div className="form">
          <div className="form_input">
            <div className="form_input-header">
              <div className="form_input-header_title">
                <label style={{ width: "fit-content" }} htmlFor="from">
                  Withdraw
                </label>
              </div>
              <div className="form_input-header_details">
                <p>
                  Balance <strong>{userLiquidity}</strong>
                </p>
              </div>
            </div>
            <div className="form_input-content">
              <input
                type={"number"}
                value={withdrawAmount}
                onChange={({ target }) => setWithdrawAmount(target.value)}
                placeholder="0.0"
              />
              <Button
                onClick={() => setWithdrawAmount(userLiquidity.toString())}
              >
                Max
              </Button>
            </div>
          </div>
          <div className="controls">
            <Button
              disabled={
                loading ||
                !Number(userLiquidity) ||
                !Number(withdrawAmount) ||
                Number(withdrawAmount) > Number(userLiquidity)
              }
              onClick={() => handleRemoveLiquidity()}
            >
              Remove Liquidity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;
