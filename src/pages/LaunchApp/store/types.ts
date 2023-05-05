export type IContractData = {
  apy: number;
  endTime: string | number | undefined;
};

export interface ITokenDetails {
  balance: number;
  symbol: string;
  tokenAddress: string;
}
