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
import abi from '../assets/abi/stakeContract.abi.json';
import { useLoginInfo } from '../hooks/auth/useLoginInfo';
import Menu from '../components/ui/Menu';

const Staking = () => {
  const [isStakeSelected, setIsStakeSelected] = useAtom(isStakeSelectedAtom);
  const [stakeAmountsParsed, setStakeAmountsParsed] = useState<any>([]);
  const { loginMethod, expires, loginToken, signature } = useLoginInfo();

  const { data: stakeAmounts } = useScQuery<any>({
    type: SCQueryType.COMPLEX,
    payload: {
      scAddress: CONTRACT_ADDRESS,
      funcName: 'getStakeAmounts',
    },
    abiJSON: abi,
    autoInit: true,
  });

  const { data: rewardsAmount } = useScQuery<any>({
    type: SCQueryType.COMPLEX,
    payload: {
      scAddress: CONTRACT_ADDRESS,
      funcName: 'getRewardsAmounts',
    },
    abiJSON: abi,
    autoInit: true,
  });

  const { data: stakeAmountsFiltered } = useScQuery<any>({
    type: SCQueryType.COMPLEX, // can be int or string
    payload: {
      scAddress: CONTRACT_ADDRESS,
      funcName: 'getFilteredStakeAmounts',
    },
    abiJSON: abi,
    autoInit: true,
  });

  // useEffect(() => {
  //   if (stakeAmounts?.firstValue?.items && stakeAmountsParsed.length === 0) {
  //     const parsed = stakeAmounts?.firstValue?.items.map((item: any) => {
  //       return {
  //         epoch: item.fields[0].value.value.valueOf(),
  //         amount: item.fields[1].value.value.valueOf() / 10 ** 18,
  //       };
  //     });
  //     setStakeAmountsParsed(parsed);
  //   }
  // }, [stakeAmounts]);

  // console.log(
  //   'stakeAmounts',
  //   stakeAmounts,
  //   stakeAmounts?.firstValue?.items[0].items[1].value.valueOf(),
  //   stakeAmountsParsed,
  //   rewardsAmount
  // );
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
        <div className="flex gap-10">
          <HeaderMenuButtons enabled={['auth']} />
          <Menu />
        </div>
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
        {/* <InfoPannel /> */}
      </div>
    </MainLayout>
  );
};

export default Staking;
