import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useWeb3React } from "@web3-react/core";
import {
  getNativeBalance,
  getRewardAmount,
  getTokenBalance,
  getUserAllowance,
  getUserDetails,
} from "../../../../utils/userMethods";
import { getTimestamp } from "../../../../utils/contractMethods";

interface IUser {
  tokenBalance: number;
  userAllowance: number;
  withdrawTimestamp: number;
  rewards: number;
  totalStaked: number;
  isAllowanceApproved: boolean;
  nativeBalance: number;
  endPoolLabel?: string;
  endPoolTimestamp?: number,
  isPoolEnd: boolean,
  withdrawFee: number,
  rewardEstimation: number
}

interface IUserContext {
  isLoading: boolean;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  userData: IUser;
  refetch: () => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  userData: {
    tokenBalance: 0,
    userAllowance: 0,
    withdrawTimestamp: 0,
    rewards: 0,
    totalStaked: 0,
    isAllowanceApproved: false,
    nativeBalance: 0,
    endPoolLabel: '',
    endPoolTimestamp: 0,
    isPoolEnd: false,
    withdrawFee: 0,
    rewardEstimation: 0
  },
  setUserData: () => { },
  isLoading: false,
  refetch: async () => { },
});

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IUser>({
    tokenBalance: 0,
    userAllowance: 0,
    withdrawTimestamp: 0,
    rewards: 0,
    totalStaked: 0,
    isAllowanceApproved: false,
    nativeBalance: 0,
    isPoolEnd: false,
    withdrawFee: 0,
    rewardEstimation: 0
  });
  const [isMounted,setIsMounted] = useState(false);
  const [indexKey,setIndexKey] = useState(0);

  const { account, library } = useWeb3React();

  const handleGetUserData = useCallback(async () => {
    if (account) {
      const { provider } = library;
      try {
        setIsLoading(true);
        const userAllowance = await getUserAllowance(provider, account);
        const { totalStaked, endPoolLabel, endPoolTimestamp, isPoolEnd, withdrawFee, rewardEstimation } = await getUserDetails(provider, account);
        // const rewards = await getRewardAmount(provider, account, totalStaked);
        setUserData({
          ...userData,
          tokenBalance: await getTokenBalance(provider, account),
          // userAllowance,
          isAllowanceApproved: userAllowance < 1000000000 ? false : true,
          // isAllowanceApproved: true,
          // rewards,
          totalStaked,
          endPoolLabel,
          endPoolTimestamp,
          isPoolEnd,
          withdrawFee,
          rewardEstimation
          // withdrawTimestamp: await getTimestamp(provider, account),
          // nativeBalance: await getNativeBalance(provider, account),
        });
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library]);

  useEffect(() => {
    handleGetUserData();
    setIsMounted(true)
  }, [handleGetUserData]);

  useEffect(()=>{
    if(isMounted && !userData.isPoolEnd){
      setTimeout(()=>{
        setIndexKey(indexKey+1);
      },3000)
    }
  },[isMounted,userData])

  useEffect(()=>{
    if(indexKey > 0) {
      handleGetUserData();
      console.log('reload')
    }
  },[indexKey])

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoading, refetch: handleGetUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
