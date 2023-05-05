import { useWeb3React } from "@web3-react/core";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import "./Calculator.scss";
import { formatNumber } from "../../../../helpers/formatters";
import { UserContext } from "../../store/context/UserContext";
import { getApy, getRewardPerBlock } from "../../../../utils/contractMethods";

const Calculator: React.FC = () => {
  const { account, library } = useWeb3React();
  const { userData } = useContext(UserContext);
  const [details, setDetails] = useState({
    apy: 0,
    totalStaked: 0,
    totalRewards: 0,
  });
  const [rewardPerBlock, setRewardPerBlock] = useState(0);
  const [block, setBlock] = useState("10");
  const [staked, setStaked] = useState("");

  const handleGetApy = useCallback(async () => {
    if (account) {
      try {
        setDetails(await getApy(library?.provider, account));
        setRewardPerBlock(await getRewardPerBlock(library?.provider, account));
      } catch (error) {
        console.log(error);
      }
    }
  }, [account, library]);

  useEffect(() => {
    handleGetApy();
  }, [handleGetApy]);

  const totalRewardReturns = useMemo(() => {
    const stakingAmount = staked ? Number(staked) : 0;
    const totalStakingBlock = block ? Number(block) : 0;
    return (
      (stakingAmount / details.totalStaked) * rewardPerBlock * totalStakingBlock
    );
  }, [staked, details.totalStaked, rewardPerBlock, block]);

  return (
    <div className="calculator_route">
      <div className="mx pad">
        <div className="calculator_route-form">
          <div className="calculator_route-form_header">
            <h1>Calculator</h1>
          </div>
          <div className="calculator_route-form_userinfo">
            <div>
              <p>Your Balances</p>
              <h2>{formatNumber(userData.tokenBalance)} CHX</h2>
            </div>
            <div>
              <p>Current APY</p>
              <h2>{formatNumber(details.apy, 0, 2)}%</h2>
            </div>
          </div>
          <div className="calculator_route-form_controls">
            <div className="form_input">
              <label>CHX Amount</label>
              <input
                type="number"
                value={staked}
                onChange={({ target }) => setStaked(target.value)}
                placeholder="0"
              />
            </div>
            <div className="form_input">
              <label>Total Blocks Staked</label>
              <input
                type="number"
                value={block}
                onChange={({ target }) => setBlock(target.value)}
                placeholder="0"
              />
            </div>
          </div>
          <div className="calculator_route-form_returns">
            <div className="flex-between">
              <p>Your Staking Amount</p>
              <b>{staked ? staked : 0} CHX</b>
            </div>
            <div className="flex-between">
              <p>Rewards estimation</p>
              <b>
                {isNaN(totalRewardReturns)
                  ? 0
                  : formatNumber(totalRewardReturns, 0, 15)}{" "}
                CHX
              </b>
            </div>
            <div className="flex-between">
              <p>Total returns</p>
              <b>
                {isNaN(Number(staked) + totalRewardReturns)
                  ? 0
                  : formatNumber(
                    Number(staked) + totalRewardReturns,
                    0,
                    15
                  )}{" "}
                CHX
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
