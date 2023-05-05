import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";

import "./Modal.scss";
import Backdrop from "./Backdrop";

import { Injected, walletconnect } from "../../../utils/connectors";
import { TransactionContext } from "../store/context/TransactionContext";

import metamaskLogo from "../../../assets/images/metamask.png";
import walletconnectLogo from "../../../assets/images/walletconnect.png";
import close from "../../../assets/icons/close.png";

const modalVaraints = {
  initial: {
    opacity: 0,
    scale: 0.5,
    x: "-50%",
    y: "-50%",
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
    scale: 1,
    x: "-50%",
    y: "-50%",
  },
  exit: {
    opacity: 0,
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
};

interface IWalletModal {
  modal: boolean;
  handleClose: () => void;
}

const WalletModal: React.FC<IWalletModal> = ({ modal, handleClose }) => {
  const { activate } = useWeb3React();
  const { setTransaction } = useContext(TransactionContext);

  const handleConnect = async (connector: string) => {
    setTransaction({
      loading: true,
      status: "pending",
      message: `Connecting to ${connector} `,
    });
    try {
      if (connector === "metamask") await activate(Injected);
      else await activate(walletconnect);
      setTransaction({ loading: false, status: "pending" });
      handleClose();
    } catch (error) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: "something went wrong",
      });
      setTimeout(
        () => setTransaction({ loading: true, status: "error" }),
        4000
      );
    }
  };

  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            className={"wallet_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="wallet_modal-content">
              <div className="flex-gap">
                <p>Connect wallet</p>
                <img
                  src={close}
                  alt="close"
                  width={24}
                  height={24}
                  onClick={() => handleClose()}
                />
              </div>
              <div className="wallet_wrapper">
                <div
                  className="wallet_wrapper-card"
                  onClick={() => handleConnect("metamask")}
                >
                  <img src={metamaskLogo} alt="metamask logo" />
                </div>
                <div
                  className="wallet_wrapper-card"
                  onClick={() => handleConnect("walletconnect")}
                >
                  <img src={walletconnectLogo} alt="wallet connect logo" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default WalletModal;
