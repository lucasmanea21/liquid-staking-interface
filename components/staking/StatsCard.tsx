import React, { useState } from 'react';
import { CONTRACT_ADDRESS } from '../../config';
import { SCQueryType, useScQuery } from '../../hooks/core/useScQuery';
import { exchangeRateAtom } from '../../store/atom';
import { useAtom } from 'jotai';
import { Item } from './StatsPannel';

const StatsCard = () => {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);

  console.log('exchangeRate', exchangeRate);
  return (
    <div className="flex flex-col items-start my-8 text-left">
      <Item
        name="Exchange Rate:"
        value={`1 stEGLD = ${(1 / exchangeRate).toFixed(4)} EGLD`}
      />
      <Item name="APR" value={`50%`} />
      <Item name="Deposit fee:" value={`0`} />
      <Item name="Rewards fee:" value={`7.5%`} />
    </div>
  );
};

export default StatsCard;
