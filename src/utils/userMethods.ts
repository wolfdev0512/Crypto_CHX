import { ethers } from "ethers";
import tokenabi from "../abis/chainedxtoken.json";
import  stakeabi from "../abis/chainedxstake.json";
import { AbiItem } from 'web3-utils'

import { CHX_STAKING_ADDRESS, CHX_TOKEN_ADDRESS } from "./address";
import Web3 from "web3";
import axios from "axios";
import { number } from "yup";

export const getStakingContract = async (provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(stakeabi as AbiItem[],CHX_STAKING_ADDRESS);
  return contract;
};

export const getTokenBalance = async (provider, address: any) => {
  // const etherProvider = new ethers.providers.Web3Provider(provider);
  // const signer = etherProvider.getSigner(address);
  // const CHXTokenContract = new ethers.Contract(
  //   CHX_TOKEN_ADDRESS,
  //   tokenabi,
  //   signer
  // );
  // const userBalanceInHex = await CHXTokenContract.balanceOf(address);
  // const userBalance = userBalanceInHex.toString();
  // const formatEther = ethers.utils.formatEther(userBalance);

  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(tokenabi as AbiItem[],CHX_TOKEN_ADDRESS);
  const balance = await contract.methods.balanceOf(web3.utils.toHex(address)).call();
  const userBalance = balance.toString();
  const formatEther = ethers.utils.formatEther(userBalance);
  return Number(formatEther);
};

export const getNativeBalance = async (provider, address: any) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);

  const balanceInWei = (await signer.getBalance()).toString();

  return Number(ethers.utils.formatEther(balanceInWei));
};

export const getUserAllowance = async (provider, address: string) => {
  
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(tokenabi as AbiItem[],CHX_TOKEN_ADDRESS);
  const allowance = await contract.methods.allowance(
    (address),
    (CHX_STAKING_ADDRESS)
  ).call();
  
  return Number(web3.utils.fromWei(allowance.toString()));
  // const CHXTokenContract = new ethers.Contract(
  //   CHX_TOKEN_ADDRESS,
  //   tokenabi,
  //   signer
  // );

  // const userAllowanceInHex = await CHXTokenContract.allowance(
  //   address,
  //   CHX_STAKING_ADDRESS
  // );
  // const userAllowance = userAllowanceInHex.toString();
  // const formatEther = ethers.utils.formatEther(userAllowance);
  // return Number(formatEther);
};

export const getUserDetails = async (provider, address: string) => {
  const chainedxStake = await getStakingContract(provider, address);
  const balanceStaking = await chainedxStake.methods.balanceOf(address).call();
  const timeEnd = await chainedxStake.methods.timeEnd().call();
  const withdrawFee = await chainedxStake.methods.withdrawFee().call();
  const rewardEstimation = await chainedxStake.methods.getAvailableClaimReward(address).call();
  const currentTimestamp = await chainedxStake.methods.getCurrentTimestamp().call();
  const utcTimestamp = parseInt(currentTimestamp) * 1000;
  
  const currentDate = new Date(utcTimestamp);
  const endPoolFormat = new Date(timeEnd*1000)
  const month = ["Jan","Feb","March","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
  const formatNumberZero = (_num) => {
    if(_num < 10) return "0"+_num;
    return _num;
  }
  const endPoolLabel = formatNumberZero(endPoolFormat.getDate()) + " " + month[endPoolFormat.getMonth()] +" "+ endPoolFormat.getFullYear() + " " + formatNumberZero(endPoolFormat.getHours()) + ":" + formatNumberZero(endPoolFormat.getMinutes()) + " UTC";
  const isPoolEnd = utcTimestamp >= (timeEnd * 1000);
  
  const formatTotalStaked = ethers.utils.formatEther(balanceStaking.toString());
  return {
    totalStaked: formatTotalStaked,
    endPoolLabel: endPoolLabel,
    endPoolTimestamp: Number(timeEnd*1000),
    isPoolEnd,
    withdrawFee: ethers.utils.formatEther(withdrawFee.toString()),
    rewardEstimation: ethers.utils.formatEther(rewardEstimation.toString())
  };
};

export const getRewardAmount = async (
  provider,
  address: string,
  userStaked: number
) => {
  try {
    const chainedxStake = getStakingContract(provider, address);

    // const rewards = await chainedxStake.rewardPerBlockAddress(address);
    // const formatEther = ethers.utils.formatEther(rewards.toString());

    // return Number(formatEther);
  } catch (error) {
    return 0;
  }
};

export const getTokenDetailsByAddress = async (
  provider,
  address: string,
  tokenAddress: string
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const tokenContract = new ethers.Contract(tokenAddress, tokenabi, signer);

  const userBalanceInHex = await tokenContract.balanceOf(address);
  const symbol = (await tokenContract.symbol()).toString();
  const decimals = (await tokenContract.decimals()).toString();
  const userBalance = userBalanceInHex.toString();
  const formatEther = ethers.utils.formatUnits(userBalance, decimals);

  return {
    balance: Number(formatEther),
    symbol,
    tokenAddress,
  };
};
