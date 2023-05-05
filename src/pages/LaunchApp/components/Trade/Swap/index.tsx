import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { useDebounce } from "../../../../../hooks";
import { Button } from "../../../../../components";
import ChxLogo from "../../../../../assets/logo/token.png";
import BnbLogo from "../../../../../assets/icons/bnb_logo.svg";
import closeIcon from "../../../../../assets/icons/close.png";
import { ReactComponent as SettingsIcon } from "../../../../../assets/icons/settings.svg";
import { getAmountsOut, swap } from "../../../../../utils/swapMethods";
import { TransactionContext } from "../../../store/context/TransactionContext";
import { UserContext } from "../../../store/context/UserContext";
import Modal from "../../../../../components/Modals/Modal";

const Swap: React.FC<{}> = () => {
  const { library, chainId, account } = useWeb3React();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const debouncedValue = useDebounce<string>(from, 500);
  const { setTransaction, loading } = useContext(TransactionContext);
  const { userData } = useContext(UserContext);
  const [settings, setSettings] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [error, setError] = useState<string | null>(null);

  const handleGetUserData = useCallback(async () => {
    if (account) {
    }
  }, [account]);

  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);

  useMemo(async () => {
    if (account && library && debouncedValue) {
      try {
        if (Number(debouncedValue) <= 0) return;
        const amountsOut = await getAmountsOut(
          library?.getSigner(),
          ethers.utils.parseEther(debouncedValue),
          chainId
        );
        const formattedAmount = Number(ethers.utils.formatEther(amountsOut[1]));
        setTo(formattedAmount.toString());
      } catch (error) {
        console.log(error);
        setTo("0");
      }
    }
  }, [debouncedValue, library, chainId, account]);

  const handleSwap = async () => {
    try {
      if (!account) return alert("connect wallet to proceed");
      setTransaction({ loading: true, status: "pending" });
      await swap(
        library?.getSigner(),
        account,
        chainId,
        from,
        Number(slippage)
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
    <div className="swap pad">
      <div className="swap_wrapper">
        <div className="swap_wrapper-header mb-20">
          <h3 style={{ textAlign: "center" }}>Swap</h3>
          <div style={{ cursor: "pointer" }} onClick={() => setSettings(true)}>
            <SettingsIcon width={24} height={24} />
          </div>
        </div>
        <div className="form">
          <div className="form_input">
            <div className="form_input-header">
              <div className="form_input-header_title">
                <label htmlFor="from">From</label>
                <div className="logo">
                  <img src={ChxLogo} alt="chainedx logo" />
                  <span>CHX</span>
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
          <div className="form_input">
            <div className="form_input-header">
              <div className="form_input-header_title">
                <label htmlFor="from">To</label>
                <div className="logo">
                  <img src={BnbLogo} alt="chainedx logo" />
                  <span>BNB</span>
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
              onClick={() => handleSwap()}
            >
              Swap
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={settings} handleClose={() => setSettings(false)}>
        <div className="settings_modal">
          <div className="settings_modal-header">
            <h1>Settings</h1>
            <img src={closeIcon} alt="" onClick={() => setSettings(false)} />
          </div>
          <div className="slippage">
            <b>Slippage tolerance</b>
            <div>
              <p
                onClick={() => setSlippage("0.1")}
                className={slippage === "0.1" ? "active" : undefined}
              >
                0.1%
              </p>
              <p
                onClick={() => setSlippage("0.5")}
                className={slippage === "0.5" ? "active" : undefined}
              >
                0.5%
              </p>
              <p
                onClick={() => setSlippage("1")}
                className={slippage === "1" ? "active" : undefined}
              >
                1%
              </p>
              <div>
                <input
                  type="number"
                  min="0"
                  placeholder="0%"
                  value={slippage}
                  onChange={({ target }) => {
                    const val = target.value;
                    if (Number(val) > 25) {
                      return setError("slippage can't be more than 25%");
                    }
                    setError(null);
                    setSlippage(target.value);
                  }}
                />
                {error && (
                  <span style={{ color: "tomato", fontSize: "12px" }}>
                    {error}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Swap;
