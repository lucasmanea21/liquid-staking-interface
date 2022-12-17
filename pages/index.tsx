import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InfoPannel from '../components/staking/InfoPannel';
import Input from '../components/staking/Input';
import StatsCard from '../components/staking/StatsCard';
import StatsPannel from '../components/staking/StatsPannel';
import UnstakeCard from '../components/staking/UnstakeCard';
import { HeaderMenu } from '../components/ui/HeaderMenu';
import { HeaderMenuButtons } from '../components/ui/HeaderMenuButtons';
import { MainLayout } from '../components/ui/MainLayout';
import { CONTRACT_ADDRESS } from '../config';
import { SCQueryType, useScQuery } from '../hooks/core/useScQuery';
import {
  egldValueAtom,
  exchangeRateAtom,
  isStakeSelectedAtom,
  stEgldValueAtom,
  unstakeEgldValueAtom,
} from '../store/atom';
import { useAtom } from 'jotai';
import StakeBody from '../components/staking/StakeBody/StakeBody';

const Staking = () => {
  const [isStakeSelected, setIsStakeSelected] = useAtom(isStakeSelectedAtom);

  const ChooseButton = ({ name }: any) => {
    const isStake = name === 'Stake';

    return (
      <Button
        onClick={() => setIsStakeSelected(isStake ? true : false)}
        bgColor={
          isStake
            ? isStakeSelected
              ? 'blue.500'
              : 'black'
            : !isStakeSelected
            ? 'blue.500'
            : 'black'
        }
        _hover={{
          bgColor: isStake
            ? isStakeSelected
              ? 'blue.500'
              : 'black'
            : !isStakeSelected
            ? 'blue.500'
            : 'black',
        }}
        className="w-1/2"
      >
        <span>{name}</span>
      </Button>
    );
  };

  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth']} />
      </HeaderMenu>
      <div className="flex flex-col items-center space-y-8 text-center">
        <div>
          <h1 className="text-4xl">Stake eGold</h1>
          <p>Stake EGLD and use stEGLD while earning rewards.</p>
        </div>
        <div className=" bg-stone-800 rounded-2xl">
          <ChooseButton name="Stake" />
          <ChooseButton name="Unstake" />
        </div>
        <StakeBody />
        <StatsPannel />
        <InfoPannel />
      </div>
    </MainLayout>
  );
};

export default Staking;
