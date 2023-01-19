import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../../config';
import { SCQueryType, useScQuery } from '../../hooks/core/useScQuery';
import { exchangeRateAtom } from '../../store/atom';
import { useAtom } from 'jotai';
import { Item } from './StatsPannel';
import abi from '../../assets/abi/stakeContract.abi.json';
import { Address } from '@elrondnetwork/erdjs/out';

const StatsCard = () => {
  const [validators, setValidators] = useState([]);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);

  return (
    <div className="flex flex-col items-start my-8 text-left">
      <Item
        name="Exchange Rate:"
        value={`1 stEGLD = ${Number(Number(1 / exchangeRate).toFixed(4))} EGLD`}
      />
      <Item name="APR" value={`50%`} />
      <Item name="Deposit fee:" value={`0`} />
      <Item name="Rewards fee:" value={`7.5%`} />
    </div>
  );
};

export default StatsCard;
