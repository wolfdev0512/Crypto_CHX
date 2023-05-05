import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";

export const Injected = new InjectedConnector({
  supportedChainIds: [56, 97],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    97: "https://mainnet.infura.io/v3/ec03b8dcd95348149519e0be7ac5098e",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});

const switchToBSCTestNetwork = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("No ethereum object found");
    return;
  }

  const networkId = "0x61"; // BSC-Testnet chain ID

  try {
    // Send request to switch network
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networkId }],
    });

    console.log("Switched to BSC-Testnet network!");
  } catch (error) {
    console.error(error);
  }
};

// const switchRequest = (chainId = 97) => {
//   const { ethereum } = window as any;
//   return ethereum.request({
//     method: "wallet_switchEthereumChain",
//     params: [{ chainId: ethers.utils.hexlify(chainId) }],
//   });
// };

// export const switchNetwork = async () => {
//   const { ethereum } = window as any;
//   if (ethereum) {
//     try {
//       await switchRequest();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

export const addNetwork = async () => {
  const { ethereum } = window as any;
  if (!ethereum) {
    console.log("No ethereum object found");
    return;
  }

  try {
    // Define network parameters
    const chainId = "0x61";
    const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    const symbol = "TBNB";
    const name = "Binance Smart Chain Testnet";

    // Send request to add network
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId,
          rpcUrl: rpcURL,
          nativeCurrency: {
            name: name,
            symbol: symbol,
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
          iconUrls: [
            "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615",
          ],
        },
      ],
    });

    console.log("BSC-Testnet network successfully added!");
  } catch (error) {
    console.error(error);
  }
};
