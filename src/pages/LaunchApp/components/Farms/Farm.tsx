import React, { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { Button } from "../../../../components";
import UnlockWallet from '../UnlockWallet';
import { UserContext } from "../../store/context/UserContext";

import token from "../../../../assets/logo/token.png";
import { TransactionContext } from "../../store/context/TransactionContext";
import {
  getContractDetails,
  setApprove,
  setCompound,
  setHarvest,
  setStake,
  withdraw,
} from "../../../../utils/contractMethods";
import { IContractData } from "../../store/types";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { CHX_STAKING_ADDRESS } from "../../../../utils/address";

const Count = ({ type = 0, symbol }) => {
  if (type === 0) return null;
  return (
    <>
      {type}
      {symbol === "s" ? symbol : `${symbol} : `}
    </>
  );
};

const Farm: React.FC = () => {
  const { account, library } = useWeb3React();
  const [deposit, setDeposit] = useState("");
  const [contractData, setContractData] = useState<IContractData>({
    apy: 0,
    endTime: undefined,
  });
  
  const { userData, setUserData, refetch } = useContext(UserContext);
  const { setTransaction, loading } = useContext(TransactionContext);
  const [estimationReward,setEstimationReward] = useState(0);
  const [isMounted,setIsMounted] = useState(false);

  const handleGetApy = useCallback(async () => {
    if (account) {
      try {
        setContractData(await getContractDetails(library?.provider, account));
      } catch (error) {
        console.log(error);
      }
    }
  }, [account, library]);

  useEffect(() => {
    handleGetApy();
  }, [handleGetApy]);

  
  const handleApprove = async () => {
    if (!account) return;
    setTransaction({ loading: true, status: "pending" });
    const { data, error } = await setApprove(library?.provider, account);

    if (error) {
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
      return;
    }

    setUserData({
      ...userData,
      userAllowance: data,
      isAllowanceApproved: true,
    });
    setTransaction({ loading: true, status: "success" });
  };

  const handleDeposit = async () => {
    if (!account) return;
    try {
      if (userData.tokenBalance < Number(deposit)) {
        setTransaction({
          loading: true,
          status: "error",
          message: "Insufficient funds to deposit",
        });
        return;
      }
      setTransaction({ loading: true, status: "pending" });
      await setStake(library?.provider, account, deposit);
      setDeposit("");
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleCompound = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await setCompound(library?.provider, account, userData.totalStaked);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleHarvest = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await setHarvest(library?.provider, account, userData.totalStaked);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleWithdraw = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await withdraw(library?.provider, account);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const renderer = ({
    completed,
    days,
    minutes,
    hours,
    seconds,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <Button
          disabled={loading || !userData.totalStaked}
          onClick={() => handleWithdraw()}
        >
          Withdraw
        </Button>
      );
    } else {
      return (
        <Button disabled>
          Locked till&nbsp;
          <Count type={days} symbol="d" />
          <Count type={hours} symbol="h" />
          <Count type={minutes} symbol="m" />
          <Count type={seconds} symbol="s" />
        </Button>
      );
    }
  };

  const renderMethods = (
    <div>
      <div
        className="mb-20"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="mb-10" data-position="flex-between">
          <h5>Total Staked</h5>
          <b style={{ fontSize: "1.7rem" }}>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            }).format(userData.totalStaked)}{" "}
            CHX
          </b>
        </div>
        <>
          <Countdown date={userData.withdrawTimestamp} renderer={renderer} />
        </>
      </div>
      <div className="rewards">
        <h5>Earned rewards estimation</h5>
        <div data-position="flex-between">
          <h3>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
            }).format(userData.rewardEstimation)}{" "}
            CHX
          </h3>
          <section>
            {/* <Button
              variant="secondary"
              disabled={loading || !userData.rewards}
              onClick={() => handleCompound()}
            >
              Compound
            </Button> */}
            {/* <Button
              variant="secondary"
              disabled={loading || !userData.rewards}
              onClick={() => handleHarvest()}
            >
              Harvest
            </Button> */}
          </section>
        </div>
      </div>
      <div className="form_input">
        <label htmlFor="deposit">
          <strong>Deposit</strong>
        </label>
        <div className="mb-15">
          <input
            type="number"
            placeholder="0.0"
            min="0"
            value={deposit}
            onChange={({ target }) => setDeposit(target.value)}
          />
        </div>
        <Button
          disabled={loading || userData.isPoolEnd}
          onClick={() => handleDeposit()}
        >
          Deposit
        </Button>
          <div className="text-center"><center>Or</center></div>
        <Countdown date={userData.endPoolTimestamp} renderer={renderer} />
      </div>
    </div>
  );

  return (
    <div className="farm">
      <div className="farm_header">
        <div data-position="flex-between">
          <h3>Earn CHX</h3>
          <img src={token} alt="token" width={60} />
        </div>
      </div>
      <div data-position="flex-between">
        <p>APY:</p>
        <b>
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(contractData.apy)}
          %
        </b>
      </div>
      <div>
        <div data-position="flex-between">
          <p className="primary">Token Balance</p>
          <b>{userData.tokenBalance} CHX</b>
        </div>
        <div data-position="flex-between">
          <p className="primary">Deposit Fee</p>
          <b>0%</b>
        </div>
        <div data-position="flex-between">
          <p className="primary">Withdraw Fee</p>
          <b>{userData.withdrawFee} BNB</b>
        </div>
        <div data-position="flex-between">
          <p className="primary">Staking Address</p>
          <b>{CHX_STAKING_ADDRESS}</b>
        </div>
        <div data-position="flex-between">
          <p className="primary">Pool End</p>
          <b>{userData.endPoolLabel}</b>
        </div>
      </div>
      {!account ? (
        <UnlockWallet />
      ) : !userData.isAllowanceApproved ? (
        <Button disabled={loading} onClick={() => handleApprove()}>
          Approve
        </Button>
      ) : (
        renderMethods
      )}
    </div>
  );
};

export default Farm;
