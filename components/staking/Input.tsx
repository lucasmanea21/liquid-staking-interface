import { Button } from '@chakra-ui/react';
import React from 'react';
import { useAccount } from '../../hooks/auth/useAccount';
import {
  egldValueAtom,
  exchangeRateAtom,
  stEgldValueAtom,
  unstakeEgldValueAtom,
} from '../../store/atom';
import { useAtom } from 'jotai';
import logo from '../../assets/images/EGLD.png';
import stEgldLogo from '../../assets/images/STEGLD.png';
import Image from 'next/image';
import { useApiCall } from '../../hooks/core/useApiCall';
import { ST_EGLD_TOKEN_ID } from '../../config';

const MaxButton = ({ handleMax }: any) => {
  return (
    <div className="absolute z-10 right-3 top-3 right-1">
      <Button onClick={() => handleMax()} bgColor="blue.500" textColor="white">
        Max
      </Button>
    </div>
  );
};

export const TokenImage = ({ token }: { token: any }) => {
  // console.log('token', token);
  return (
    <div className="absolute z-10 items-center justify-center w-10 h-10 text-black rounded-full top-3 left-3 bg-slate-400">
      <Image
        src={token != 'EGLD' ? stEgldLogo : logo}
        alt="EGLD"
        width={40}
        height={40}
      />
    </div>
  );
};

const Balance = ({ balance, token }: any) => (
  <div className="items-start justify-start w-full pl-5 my-2 text-left">
    <p className="text-sm">
      Balance: {Number(Number(balance / 10 ** 18).toFixed(4))} {token}
    </p>
  </div>
);

const Input = ({ token, value, isStake }: any) => {
  const { address, balance } = useAccount();
  const [, setEgldValue] = useAtom(egldValueAtom);
  const [, setStEgldValue] = useAtom(stEgldValueAtom);
  const [, setUnstakeEgldValue] = useAtom(unstakeEgldValueAtom);

  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);

  const handleMax = () => {
    isStake
      ? setEgldValue((Number(balance) / 10 ** 18).toFixed(4))
      : setUnstakeEgldValue((Number(balance) / 10 ** 18).toFixed(4));
  };

  const handleChangeEgldAmount = (e: any) => {
    setEgldValue(e.target.value);
    setStEgldValue((e.target.value * exchangeRate).toFixed(4));
  };

  const handleChangeStEgldAmount = (e: any) => {
    setStEgldValue(e.target.value);
    setEgldValue((e.target.value / exchangeRate).toFixed(4));
  };

  const { data, isLoading, isValidating, fetch, error } = useApiCall<any[]>({
    url: `/accounts/${address}/tokens?identifier=${ST_EGLD_TOKEN_ID}`, // can be any API endpoint without the host, because it is already handled internally
    autoInit: true, // similar to useScQuery
    type: 'get', // can be get, post, delete, put
    payload: {},
    options: {},
  });

  // console.log('data', data);

  return (
    <div className="input">
      <div className="relative items-center justify-center w-full h-16 ">
        {/* <Overlay token={token} /> */}
        <TokenImage token={token} />
        {(token == 'EGLD' || !isStake) && <MaxButton handleMax={handleMax} />}
        <input
          className="w-full h-16 pl-16 text-lg text-black rounded-md outline-none"
          type="text"
          value={value}
          onChange={
            token == 'EGLD'
              ? (e: any) => handleChangeEgldAmount(e)
              : !isStake
              ? (e: any) => setUnstakeEgldValue(e.target.value)
              : (e: any) => handleChangeStEgldAmount(e)
          }
          key={token}
          autoFocus={token == 'EGLD' || !isStake ? true : false}
        />
      </div>
      <Balance
        balance={token == 'EGLD' ? balance : data ? data[0]?.balance : 0}
        token={token}
      />
    </div>
  );
};

export default Input;
