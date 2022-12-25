import { Button, useDisclosure } from '@chakra-ui/react';
import { ContractFunction, TokenPayment } from '@elrondnetwork/erdjs/out';
import { useAtom } from 'jotai';
import React from 'react';
import { CONTRACT_ADDRESS } from '../../../config';
import { useScTransaction } from '../../../hooks/core/useScTransaction';
import { egldValueAtom, stEgldValueAtom } from '../../../store/atom';
import Input from '../Input';
import BigNumber from 'bignumber.js';
import StatsCard from '../StatsCard';
import { stake } from '../../../api/transactions';
import { TransactionPendingModal } from '../../tools/TransactionPending';
import { useLoginInfo } from '../../../hooks/auth/useLoginInfo';
import { LoginMethodsEnum } from '../../../types/enums';
import { LoginModalButton } from '../../tools/LoginModalButton';

const Stake = () => {
  const [egldValue, setEgldValue] = useAtom(egldValueAtom);
  const [stEgldValue, setStEgldValue] = useAtom(stEgldValueAtom);
  const { loginMethod } = useLoginInfo();

  const { pending, triggerTx, transaction, error } = useScTransaction();

  // const {
  //   isOpen: opened,
  //   onOpen: open,
  //   onClose: close,
  // } = useDisclosure({ onClose, onOpen });

  const getAdditionalPendingMessage = () => {
    if (loginMethod === LoginMethodsEnum.walletconnect) {
      return 'Sign the transaction using Maiar mobile app. It will take some time to finish. You can always close this message. You will get the transaction hash when finished.';
    }
    if (loginMethod === LoginMethodsEnum.ledger) {
      return 'Sign the transaction using Ledger HW. It will take some time to finish. You can always close this message. You will get the transaction hash when finished.';
    }
    return 'You transaction is sent and you will soon see your stEGLD in your wallet. You can always close this message.';
  };

  return (
    <>
      <p className="text-lg">Stake</p>
      <div className="flex flex-col space-y-5">
        <Input token="EGLD" value={egldValue} isStake />
        <div>
          <p className="my-2 text-sm">You will receive</p>
          <Input
            token="stEGLD"
            value={Number(Number(stEgldValue).toFixed(4)).toString()}
            isStake
          />
        </div>
      </div>
      <StatsCard />
      <Button
        className="w-full"
        bgColor="blue.500"
        onClick={() => {
          stake({
            triggerTx: triggerTx,
            // todo: make this work with < 1 EGLD, by fixing decimals
            value: (Number(egldValue) / 10 ** 18).toString(),
          });
        }}
      >
        {!loginMethod ? 'Connect' : 'Stake now'}
      </Button>{' '}
      <TransactionPendingModal
        isOpen={pending}
        successTxHash={transaction?.getHash().toString()}
        txError={error}
        additionalMessage={getAdditionalPendingMessage()}
        isStake={true}
      />
    </>
  );
};

export default Stake;
