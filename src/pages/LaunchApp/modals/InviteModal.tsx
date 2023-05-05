import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";
import "./Modal.scss";
import { Button } from "../../../components";

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

interface IInviteModal {
  modal: boolean;
  handleClose?: () => void;
  inviter: string;
  handleBuyToken: () => Promise<void>;
}

const InviteModal: React.FC<IInviteModal> = ({
  modal,
  handleClose,
  inviter,
  handleBuyToken,
}) => {
  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            className={"invite_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="invite_modal-content">
              <div className="mb-10">
                <p className="mb-5">Invited By</p>
                <h3 style={{ wordBreak: "break-word" }}>{inviter}</h3>
              </div>
              <p className="mb-20">
                your inviter will get 2.5% of your transaction as a commission.
              </p>
              <Button onClick={() => handleBuyToken()}>Buy Token</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default InviteModal;
