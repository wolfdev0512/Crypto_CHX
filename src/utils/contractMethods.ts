import { ethers } from "ethers";

import tokenabi from "../abis/chainedxtoken.json";
import stakeabi from "../abis/chainedxstake.json";
import buyabi from "../abis/buycontract.json";
import { CHX_STAKING_ADDRESS, CHX_TOKEN_ADDRESS, CHX_TOKEN_BUY_ADDRESS } from "./address";
import { getUserAllowance } from "./userMethods";
import { IContractData } from "../pages/LaunchApp/store/types";
import Web3 from "web3";
import { AbiItem } from 'web3-utils'

const AMOUNT = "1000000000000000000000000000000";
export const TOKEN_VALUE = 0.000033;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export const countDecimals = (value: number) => {
  if (Math.floor(value.valueOf()) === value.valueOf()) return 1;
  const decimals = value.toString().split(".")[1].length || 1;

  return Math.pow(10, decimals);
};

export const getTotalStaked = async (provider, address: string) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const chainedxStake = new ethers.Contract(
    CHX_STAKING_ADDRESS,
    stakeabi,
    signer
  );

  // const totalStaked = await chainedxStake.totalStaked();
  // const formatEther = ethers.utils.formatEther(totalStaked.toString());

  // const web3 = new Web3(provider);
  // const contract = new web3.eth.Contract(stakeabi,CHX_TOKEN_ADDRESS);
  // const balance = await contract.methods.balanceOf(web3.utils.toHex(address)).call();
  // const totalStaked = await chainedxStake.totalStaked();
  // const formatEther = ethers.utils.formatEther(totalStaked.toString());

  // return Number(formatEther);
  return Number(0);
};

export const setApprove = async (
  provider,
  address: string,
  amount = AMOUNT
) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const CHX = new ethers.Contract(CHX_TOKEN_ADDRESS, tokenabi, signer);

    const tx = await CHX.increaseAllowance(CHX_STAKING_ADDRESS, amount);
    await tx.wait();
    await sleep();

    return {
      data: await getUserAllowance(provider, address),
    };
  } catch (err: any) {
    return {
      error: {
        code: err?.code,
        message: err?.message,
      },
    };
  }
};

export const setStake = async (provider, address, amount: string) => {

  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(stakeabi as AbiItem[],CHX_STAKING_ADDRESS);
  await contract.methods.deposit(web3.utils.toWei(amount)).send({
    from: web3.utils.toHex(address)
  })
    
};

export const setCompound = async (
  provider,
  address: string,
  userStaked: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const chainedxStake = new ethers.Contract(
    CHX_STAKING_ADDRESS,
    stakeabi,
    signer
  );

  const tx = await chainedxStake.compound(address);
  await tx.wait();
};

export const setHarvest = async (
  provider,
  address: string,
  userStaked: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const chainedxStake = new ethers.Contract(
    CHX_STAKING_ADDRESS,
    stakeabi,
    signer
  );

  const tx = await chainedxStake.claimReward(address);
  await tx.wait();
};

export const getApy = async (
  provider,
  address: string
): Promise<{ apy: number; totalStaked: number; totalRewards: number }> => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const chainedxStake = new ethers.Contract(
    CHX_STAKING_ADDRESS,
    stakeabi,
    signer
  );
  const apr = await chainedxStake.getAPR();
  const totalSupply = await chainedxStake.totalSupply();


  const aprNumber = Number(ethers.utils.formatEther(apr.toString()));
  const totalSupplyNumber = Number(ethers.utils.formatEther(totalSupply.toString()))
  // const totalStaked = Number(ethers.utils.formatEther(totalSupply.toString()));

  const apyValue = (1+(aprNumber/12))**11;
  // alert(aprNumber);
  const formatedApy = isFinite(apyValue) ? apyValue : 0;
  const totalRewards = Number(0)
  return {
    apy: formatedApy,
    totalStaked: totalSupplyNumber,
    totalRewards,
  };
};

export const getRewardPerBlock = async (provider, address: string) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const chainedxStake = new ethers.Contract(
    CHX_STAKING_ADDRESS,
    stakeabi,
    signer
  );

  const rewardPerBlock = await chainedxStake.getRewardPerBlock('1000000000000000000');
  const formatted = ethers.utils
    .formatEther(rewardPerBlock.toString())
    .toString();
  console.log(formatted)
  return Number(formatted);
};

export const getContractDetails = async (
  provider,
  address: string
): Promise<IContractData> => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(stakeabi,CHX_STAKING_ADDRESS)

  const apr = await contract.methods.getAPR().call();
  const endtime = await contract.methods.timeEnd().call();

  const aprNumber = Number(ethers.utils.formatEther(apr.toString()))

  const apyValue = (1+(aprNumber/12))**11;
  const formatedApy = isFinite(apyValue) ? apyValue : 0;

  return {
    endTime: Number(endtime.toString()) * 1000,
    apy: formatedApy,
  };
};

export const withdraw = async (provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(stakeabi as AbiItem[],CHX_STAKING_ADDRESS);
  const balance = await contract.methods.withdraw().send({
    from: address,
    value: "1000000000000000"
  });
};

export const buyToken = async (provider, address: string, value: string) => {
  // console.log(provider)
  const web3 = new Web3(provider);
  const balance = await web3.eth.getBalance(address);
  const contract = new web3.eth.Contract(buyabi as AbiItem[],CHX_TOKEN_BUY_ADDRESS);
  let bnbAmount = parseFloat(Number(value) * TOKEN_VALUE);
  bnbAmount = web3.utils.toWei(bnbAmount.toFixed(18).toString())
  // alert(ethers.utils.parseEther(bnbAmount));
  const token = (value).toString();
  await contract.methods.buy(
    token,
    '0x0000000000000000000000000000000000000000'
    ).send({
    from: address,
    value: bnbAmount
  })
  // // const defaultProvider = ethers.providers.getDefaultProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
  // const jsonRpcProvider = 'https://data-seed-prebsc-2-s3.binance.org:8545'
  // const prov = new ethers.providers.JsonRpcProvider(jsonRpcProvider);
  // // // const etherProvider = new ethers.providers.Web3Provider(defaultProvider);
  // const signer = prov.getSigner(address)
  // console.log(window)
  // const chainedxtoken = new ethers.Contract(
  //   CHX_TOKEN_BUY_ADDRESS,
  //   buyabi,
  //   signer
  // );

  // const token = ethers.utils.parseEther(value).toString();
  
  // // const options = { value: ethers.utils.parseEther(amount) };

  // const tx = await chainedxtoken.buy(token, amount);
  // await tx.wait();
};

export const buyTokenByInvite = async (
  provider,
  address: string,
  inviter,
  value: string
) => {
  if (!ethers.utils.isAddress(inviter)) throw new Error("invalid_address");

  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(buyabi as AbiItem[],CHX_TOKEN_BUY_ADDRESS);
  const bnbAmount = String(Number(value) * TOKEN_VALUE);
  const token = ethers.utils.parseEther(value).toString();
  await contract.methods.buy(
    ethers.utils.parseEther(token),
    inviter
    ).send({
    from: address,
    value: ethers.utils.parseEther(bnbAmount)
  })

  // const etherProvider = new ethers.providers.Web3Provider(provider);
  // const signer = etherProvider.getSigner(address);
  // const chainedxtoken = new ethers.Contract(
  //   CHX_TOKEN_ADDRESS,
  //   tokenabi,
  //   signer
  // );

  // const token = ethers.utils.parseEther(value).toString();
  // const amount = String(Number(value) * TOKEN_VALUE);
  // const options = { value: ethers.utils.parseEther(amount) };

  // const tx = await chainedxtoken.invitedBy(inviter, token, options);
  // await tx.wait();
};

export const getTimestamp = async (provider, address: string) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const chainedxtoken = new ethers.Contract(
    CHX_STAKING_ADDRESS,
    tokenabi,
    signer
  );

  const timestamp = await chainedxtoken.getTimestamp(address);
  return Number(timestamp.toString()) * 1000;
};
