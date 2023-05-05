import React, { useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import token from "../../../../assets/logo/token.png";
import { Button } from '../../../../components'
import UnlockWallet from '../UnlockWallet'
import { TransactionContext } from "../../store/context/TransactionContext";
import {
  buyToken,
  buyTokenByInvite,
  TOKEN_VALUE,
} from "../../../../utils/contractMethods";
import InviteModal from "../../modals/InviteModal";

const BuyToken: React.FC<{ invitedBy: string | null }> = ({ invitedBy }) => {
  const [buyValue, setBuyValue] = useState("");
  const { account, library } = useWeb3React();
  const [inviteModal, setInviteModal] = useState(false);
  const { setTransaction } = useContext(TransactionContext);

  const handleClose = () => setInviteModal(false);

  const handleBuyToken = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await buyToken(library?.provider, account, buyValue);
      setBuyValue("");
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      console.log(error);
      setTransaction({ loading: true, status: "error" });
    }
  };

  const handleBuyTokenByInvited = async () => {
    handleClose();

    if (!account) return;
    if (account.toLocaleLowerCase() === invitedBy?.toLocaleLowerCase()) {
      return setTransaction({
        loading: true,
        status: "error",
        message: "You can't invited by yourself.",
      });
    }
    try {
      setTransaction({ loading: true, status: "pending" });
      await buyTokenByInvite(library?.provider, account, invitedBy, buyValue);
      setBuyValue("");
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      if (error.message === "invalid_address") {
        return setTransaction({
          loading: true,
          status: "error",
          message: "Invalid inviter address",
        });
      }
      setTransaction({ loading: true, status: "error" });
    }
  };

  const renderBuyTokenForm = (
    <div className="home_form_input">
      <label htmlFor="deposit">
        <strong>You want to buy</strong>
      </label>
      <div className="mb-10 input">
        <input
          type="number"
          placeholder="0.0"
          min="0"
          value={buyValue}
          onChange={({ target }) => setBuyValue(target.value)}
        />
        <strong>CHX</strong>
      </div>
      <div className="mb-20" data-position="flex-between">
        <p>Total BNB </p>
        <strong>{Number(buyValue) * TOKEN_VALUE}</strong>
      </div>
      {!account ? (
        <UnlockWallet />
      ) : (
        <Button
          disabled={!buyValue || Number(buyValue) <= 0}
          onClick={
            invitedBy ? () => setInviteModal(true) : () => handleBuyToken()
          }
        >
          Buy
        </Button>
      )}
    </div>
  );
  return (
    <>
      <div className="farm">
        <div className="farm_header">
          <div data-position="flex-between">
            <h3>Buy CHX</h3>
            <img src={token} alt="token" width={60} />
          </div>
        </div>
        {renderBuyTokenForm}
      </div>
      <InviteModal
        modal={inviteModal}
        handleBuyToken={handleBuyTokenByInvited}
        handleClose={handleClose}
        inviter={String(invitedBy)}
      />
    </>
  );
};

export default BuyToken;
