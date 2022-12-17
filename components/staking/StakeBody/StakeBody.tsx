import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import StatsCard from '../StatsCard';
import UnstakeCard from '../UnstakeCard';
import {
  exchangeRateAtom,
  isStakeSelectedAtom,
  unstakeEgldValueAtom,
} from '../../../store/atom';
import { SCQueryType, useScQuery } from '../../../hooks/core/useScQuery';
import { CONTRACT_ADDRESS } from '../../../config';
import Stake from './Stake';
import Unstake from './Unstake';

const StakeBody = () => {
  const [isStakeSelected, setIsStakeSelected] = useAtom(isStakeSelectedAtom);

  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);

  const { data: exchangeRateData, error } = useScQuery<number>({
    type: SCQueryType.NUMBER, // can be number, string or boolean
    payload: {
      scAddress: CONTRACT_ADDRESS,
      funcName: 'getExchangeRate',
    },
    autoInit: true,
  });

  useEffect(() => {
    setExchangeRate(!exchangeRateData ? 1 : exchangeRateData);
  }, [exchangeRateData]);

  return (
    <div className="card">{isStakeSelected ? <Stake /> : <Unstake />}</div>
  );
};

export default StakeBody;
