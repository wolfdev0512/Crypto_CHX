import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";
import "./Modal.scss";
import { Button } from "../../../components";
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UserContext } from "../store/context/UserContext";
import { TransactionContext } from "../store/context/TransactionContext";

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

// const getBaseUrl = () => {
//   let url: string;
//   if (window.location.href.includes("http"))
//     url = window.location.href.replace("http://", "");
//   else url = window.location.href.replace("https://", "");

//   const baseUrl = url.split("/")[0];
//   return baseUrl;
// };

interface IAccountModal {
  modal: boolean;
  handleClose: () => void;
}

const AccountModal: React.FC<IAccountModal> = ({ modal, handleClose }) => {
  const { deactivate, account } = useWeb3React();
  const [copied, setCopied] = useState(false);
  const {
    userData: { tokenBalance },
  } = useContext(UserContext);
  const { setTransaction } = useContext(TransactionContext);

  const handleWithdraw = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      // withdraw function here
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            className={"account_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="account_modal-content">
              <div>
                <p>Ethereum Address</p>
                <h3>{`${account?.slice(0, 6)}...${account?.slice(
                  account.length - 6
                )}`}</h3>
              </div>
              <div data-position="flex-between">
                <p>
                  <strong>
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 6,
                    }).format(tokenBalance)}
                  </strong>{" "}
                  CHX
                </p>
                <Button onClick={() => handleWithdraw()}>Withdraw</Button>
              </div>
              <CopyToClipboard
                text={`https://chainedx.netlify.app/?invitedBy=${account}`}
                onCopy={() => setCopied(true)}
              >
                <Button variant="secondary">
                  {copied ? "Invite Link Copied" : "Get Invite Link"}
                </Button>
              </CopyToClipboard>
              <Button
                onClick={() => {
                  deactivate();
                  handleClose();
                }}
              >
                Disconnect
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default AccountModal;
