import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useScTransaction } from '../../../hooks/core/useScTransaction';
import {
  currentEpochAtom,
  exchangeRateAtom,
  unstakeEgldValueAtom,
} from '../../../store/atom';
import {
  BigUIntValue,
  BytesValue,
  ContractFunction,
  decodeBigNumber,
  TokenPayment,
} from '@elrondnetwork/erdjs/out';
import Input, { TokenImage } from '../Input';
import StatsCard from '../StatsCard';
import UnstakeCard from '../UnstakeCard';
import BigNumber from 'bignumber.js';
import {
  CONTRACT_ADDRESS,
  ST_EGLD_TOKEN_ID,
  U_EGLD_TOKEN_ID,
} from '../../../config';
import { claim, unstake } from '../../../api/transactions';
import { useApiCall } from '../../../hooks/core/useApiCall';
import { useAccount } from '../../../hooks/auth/useAccount';
import { toBuffer } from 'qrcode';
import { TransactionPendingModal } from '../../tools/TransactionPending';
import { LoginMethodsEnum } from '../../../types/enums';
import { useLoginInfo } from '../../../hooks/auth/useLoginInfo';

const UndelegatedEgld = ({
  address,
  amount,
  epochStarted,
  nonce,
  triggerTx,
}: {
  address: string;
  amount: number;
  epochStarted: number;
  nonce: number;
  triggerTx: any;
}) => {
  const [isClaimable, setIsClaimable] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useAtom(currentEpochAtom);

  const {
    data: stats,
    isLoading,
    isValidating,
    fetch,
    error: apiError,
  } = useApiCall<any>({
    url: `/stats`,
    autoInit: true, // similar to useScQuery
    type: 'get', // can be get, post, delete, put
    payload: {},
    options: {},
  });

  useEffect(() => {
    // @ts-ignore
    setIsClaimable(stats?.epoch >= epochStarted + 1);
  }, [stats]);

  useEffect(() => {
    stats?.epoch && setCurrentEpoch(stats?.epoch);
  }, [stats]);

  return (
    <div className="relative flex flex-col items-start items-center justify-between my-5 space-y-3 text-left sm:space-y-0 sm:flex-row">
      <div className="items-start text-left">
        {/* <TokenImage token="stEGLD" /> */}
        <p className="text-lg sm:text-md">
          {Number(Number(amount).toFixed(4))} uEGLD
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {!isClaimable && (
          <p className="text-sm text-gray-300 ">
            Claimable in epoch {epochStarted + 1}
          </p>
        )}
        <Button
          bgColor="blue.500"
          onClick={() =>
            claim({
              triggerTx: triggerTx,
              value: amount.toString(),
              nonce: nonce,
              address: address,
            })
          }
          disabled={!isClaimable}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};

const Unstake = () => {
  const { address } = useAccount();
  const [unstakeEgldValue, setUnstakeEgldValue] = useAtom(unstakeEgldValueAtom);
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [unstakeType, setUnstakeType] = useState('now');
  const { loginMethod } = useLoginInfo();
  const [currentEpoch, setCurrentEpoch] = useAtom(currentEpochAtom);

  const { pending, triggerTx, transaction, error } = useScTransaction();

  const {
    data: uEgldTokens,
    isLoading,
    isValidating,
    fetch,
    error: apiError,
  } = useApiCall<any[]>({
    url: `/accounts/${address}/tokens?identifier=${U_EGLD_TOKEN_ID}&includeMetaESDT=true`, // can be any API endpoint without the host, because it is already handled internally
    autoInit: true, // similar to useScQuery
    type: 'get', // can be get, post, delete, put
    payload: {},
    options: {},
  });

  const getAdditionalPendingMessage = () => {
    if (loginMethod === LoginMethodsEnum.walletconnect) {
      return 'Sign the transaction using Maiar mobile app. It will take some time to finish. You can always close this message. You will get the transaction hash when finished.';
    }
    if (loginMethod === LoginMethodsEnum.ledger) {
      return 'Sign the transaction using Ledger HW. It will take some time to finish. You can always close this message. You will get the transaction hash when finished.';
    }
    return 'It will take some time to finish. You can always close this message. You will get the transaction hash when finished.';
  };

  return (
    <>
      <div>Unstake</div>
      <div className="flex flex-col my-4 space-y-8">
        <Input
          token="stEGLD"
          value={unstakeEgldValue}
          onChange={(e: any) => {
            setUnstakeEgldValue(e.target.value);
          }}
        />
        <div className="flex flex-col  sm:space-x-5 sm:flex-row">
          <UnstakeCard
            type="now"
            amount={
              Number(unstakeEgldValue) / exchangeRate -
              (0.003 * Number(unstakeEgldValue)) / exchangeRate
            }
            onClick={() => {
              setUnstakeType('now');
            }}
            selected={unstakeType === 'now'}
            comingSoon={true}
          />
          <UnstakeCard
            type="delayed"
            amount={Number(unstakeEgldValue) / exchangeRate}
            onClick={() => {
              setUnstakeType('delayed');
            }}
            selected={unstakeType === 'delayed'}
            comingSoon={false}
          />
        </div>
      </div>
      <StatsCard />
      <Button
        className="w-full"
        bgColor="blue.500"
        onClick={() =>
          unstake({ triggerTx: triggerTx, value: unstakeEgldValue })
        }
      >
        {loginMethod ? 'Unstake' : 'Connect'}
      </Button>{' '}
      {uEgldTokens && (
        <div className="mt-10">
          <p className="text-lg">Unstaked EGLD</p>
          {uEgldTokens.map((item, index) => {
            const attributes = item.attributes;

            const buffer = Buffer.from(attributes, 'base64');
            const bufString = buffer.toString('hex');
            const epoch = parseInt(bufString, 16);

            return (
              <UndelegatedEgld
                address={address}
                key={index}
                amount={item.balance / 10 ** 18}
                nonce={Number(item.ticker.split('-')[2])}
                epochStarted={epoch}
                triggerTx={triggerTx}
              />
            );
          })}
          <p className="text-sm text-gray-300">Current epoch: {currentEpoch}</p>
          <p className="text-sm text-gray-300">
            Time until next epoch: 1h 2m 4s
          </p>
        </div>
      )}
      <TransactionPendingModal
        isOpen={pending}
        successTxHash={transaction?.getHash().toString()}
        txError={error}
        additionalMessage={getAdditionalPendingMessage()}
        isStake={false}
      />
    </>
  );
};

export default Unstake;
