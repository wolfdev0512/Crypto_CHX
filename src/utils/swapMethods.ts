import { ethers } from "ethers";
import router_abi from "../abis/router.json";
import ERC20_abi from "../abis/chainedxtoken.json";
import factory_abi from "../abis/factory.json";
import pair_abi from "../abis/pair.json";
import { Router_Address, CHX_TOKEN_ADDRESS } from "./address";

const approveAmount = "10000000000000000000000000000";

function getRouterContract(provider, chainId) {
  return new ethers.Contract(Router_Address[chainId], router_abi, provider);
}

function getERC20Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, ERC20_abi, provider);
}

async function getFactoryContract(provider, chainId) {
  const router = getRouterContract(provider, chainId);
  const factoryAddress = await router.factory();
  return new ethers.Contract(factoryAddress, factory_abi, provider);
}

function getPairContract(provider, pairAddress) {
  return new ethers.Contract(pairAddress, pair_abi, provider);
}

export const swap = async (
  provider,
  address: string,
  chainId,
  swapAmount: string,
  slippage: number
) => {
  const chaindxERC20 = getERC20Contract(provider, CHX_TOKEN_ADDRESS);
  const allowance = ethers.utils.formatEther(
    (await chaindxERC20.allowance(address, Router_Address[chainId])).toString()
  );
  const balance = (await chaindxERC20.balanceOf(address)).toString();
  const parsedSwapAmount = ethers.utils.parseEther(swapAmount).toString();

  if (Number(allowance) < Number(swapAmount)) {
    const approveTx = await chaindxERC20.approve(
      Router_Address[chainId],
      approveAmount
    );
    await approveTx.wait();
  }

  if (Number(balance) < Number(parsedSwapAmount)) {
    return new Error("Low balance");
  }

  const router = getRouterContract(provider, chainId);
  const weth = await getWETH(provider, chainId);
  const path = [CHX_TOKEN_ADDRESS, weth];

  const amounts = await getAmountOut(provider, parsedSwapAmount, path, chainId);
  const amount1 = Number(ethers.utils.formatEther(amounts[1]));
  const minAmount = amount1 - (Number(slippage) / 100) * amount1;
  const limitMinAmount = String(minAmount).slice(0, 18);

  const swapTx = await router.swapExactTokensForETH(
    amounts[0],
    ethers.utils.parseEther(String(limitMinAmount)),
    path,
    address,
    Date.now() + 1000
  );

  await swapTx.wait();
};

export const addLiquidity = async (
  provider,
  address: string,
  chainId,
  token1Amount
) => {
  const router = getRouterContract(provider, chainId);
  const quote = await getAmountsForLiquidityERC20(
    provider,
    ethers.utils.parseEther(token1Amount),
    chainId
  );
  console.log(quote.toString());

  const erc20Token1 = getERC20Contract(provider, CHX_TOKEN_ADDRESS);

  const allowance = (
    await erc20Token1.allowance(address, Router_Address[chainId])
  ).toString();

  if (
    Number(allowance) < Number(ethers.utils.parseEther(token1Amount).toString())
  ) {
    const approveTx = await erc20Token1.approve(
      Router_Address[chainId],
      approveAmount
    );
    await approveTx.wait();
  }

  const addLiquidity = await router.addLiquidityETH(
    CHX_TOKEN_ADDRESS,
    ethers.utils.parseEther(token1Amount),
    0,
    0,
    address,
    Date.now() + 1000,
    {
      value: quote,
    }
  );
  await addLiquidity.wait();
};

export const removeLiquidity = async (provider, address, chainId, amountIn) => {
  console.log(ethers.utils.parseEther(amountIn).toString());
  const factory = await getFactoryContract(provider, chainId);
  const weth = await getWETH(provider, chainId);
  const pairAddress = await factory.getPair(CHX_TOKEN_ADDRESS, weth);
  const pair = getERC20Contract(provider, pairAddress);

  const allowance = await pair.allowance(address, Router_Address[chainId]);

  const balance = await pair.balanceOf(address);
  const parsedAmountIn = ethers.utils.parseEther(amountIn);

  if (allowance < parsedAmountIn) {
    const approveTx = await pair.approve(
      Router_Address[chainId],
      approveAmount
    );
    await approveTx.wait();
  }

  if (balance < parsedAmountIn) {
    return new Error("Low balance");
  }

  const router = getRouterContract(provider, chainId);
  const removeLiquidity = await router.removeLiquidityETH(
    CHX_TOKEN_ADDRESS,
    parsedAmountIn,
    0,
    0,
    address,
    Date.now() + 1000
  );

  await removeLiquidity.wait();
};

async function getWETH(provider, chainId) {
  const router = getRouterContract(provider, chainId);
  const weth = await router.WETH();
  return weth;
}

async function getAmountOut(provider, amountIn, path, chainId) {
  const router = getRouterContract(provider, chainId);
  const amounts = await router.getAmountsOut(amountIn, path);
  return amounts;
}

export async function getAmountsOut(provider, amountIn, chainId) {
  const weth = await getWETH(provider, chainId);
  const path = [CHX_TOKEN_ADDRESS, weth];
  const amounts = await getAmountOut(provider, amountIn, path, chainId);
  return amounts;
}

export async function getAmountsForLiquidityERC20(provider, amountIn, chainId) {
  const factory = await getFactoryContract(provider, chainId);
  const router = getRouterContract(provider, chainId);

  const weth = await getWETH(provider, chainId);

  const pairAddress = await factory.getPair(CHX_TOKEN_ADDRESS, weth);

  const pair = getPairContract(provider, pairAddress);

  const reserves = await pair.getReserves();

  const quote = await router.quote(amountIn, reserves[1], reserves[0]);

  return quote;
}

export const checkAvailableLiquidity = async (provider, chainId, address) => {
  const factory = await getFactoryContract(provider, chainId);

  const weth = await getWETH(provider, chainId);

  const pairAddress = await factory.getPair(CHX_TOKEN_ADDRESS, weth);

  const pair = getPairContract(provider, pairAddress);

  const balance = await pair.balanceOf(address);
  return Number(ethers.utils.formatEther(balance));
};
