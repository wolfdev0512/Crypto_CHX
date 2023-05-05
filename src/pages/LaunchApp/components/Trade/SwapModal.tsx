import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useMemo, useState } from "react";

import { ReactComponent as Mark } from "../../assets/icons/question-mark.svg";
import Modal from "../../../../components/Modals/Modal";
import { useDebounce } from "../../../../hooks";
import { ITokenDetails } from "../../store/types";
import { getTokenDetailsByAddress } from "../../../../utils/userMethods";

interface ISwapModal {
  isOpen: boolean;
  handleClose: () => void;
  setTokenDetails: React.Dispatch<React.SetStateAction<ITokenDetails>>;
}

const SwapModal: React.FC<ISwapModal> = ({
  isOpen,
  handleClose,
  setTokenDetails,
}) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const debouncedValue = useDebounce<string>(tokenAddress, 500);
  const { account, library } = useWeb3React();
  const [list, setList] = useState<ITokenDetails | null>(null);

  useMemo(async () => {
    if (account && debouncedValue) {
      const isValidAddress = ethers.utils.isAddress(debouncedValue);
      if (!isValidAddress) {
        if (list) setList(null);
      }
      setList(
        await getTokenDetailsByAddress(
          library?.provider,
          account,
          debouncedValue
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, account, library]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className="trade_modal">
        <h2 className="mb-20">Select a Token</h2>
        <div className="form_input">
          <input
            type="text"
            onChange={({ target }) => setTokenAddress(target.value)}
            placeholder=" paste address "
          />
        </div>
        {list && (
          <div
            className="list"
            onClick={() => {
              setTokenDetails(list);
              if (handleClose) handleClose();
            }}
          >
            <Mark />
            <p>{list.symbol}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SwapModal;
