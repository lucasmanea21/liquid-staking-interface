import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  TokenPayment,
} from '@elrondnetwork/erdjs/out';
import { CONTRACT_ADDRESS, ST_EGLD_TOKEN_ID, U_EGLD_TOKEN_ID } from '../config';

export const unstake = async ({
  triggerTx,
  value,
}: {
  triggerTx: any;
  value: string;
}) => {
  triggerTx({
    func: new ContractFunction('ESDTTransfer'),
    gasLimit: 50000000,
    args: [
      BytesValue.fromUTF8(ST_EGLD_TOKEN_ID),
      new BigUIntValue(TokenPayment.egldFromAmount(value).valueOf()),
      BytesValue.fromUTF8('unstake'),
    ],
    smartContractAddress: CONTRACT_ADDRESS,
    value: 0,
  });
};

export const stake = async ({
  triggerTx,
  value,
}: {
  triggerTx: any;
  value: string;
}) => {
  triggerTx({
    func: new ContractFunction('stake'),
    gasLimit: 50000000,
    smartContractAddress: CONTRACT_ADDRESS,
    //   @ts-ignore
    value: TokenPayment.egldFromAmount(value),
  });
};

export const claim = async ({
  address,
  triggerTx,
  value,
  nonce,
}: {
  address: string;
  triggerTx: any;
  value: string;
  nonce: number;
}) => {
  triggerTx({
    func: new ContractFunction('ESDTNFTTransfer'),
    gasLimit: 50000000,
    smartContractAddress: address,
    args: [
      BytesValue.fromUTF8(U_EGLD_TOKEN_ID),
      new BigUIntValue(nonce),
      new BigUIntValue(TokenPayment.egldFromAmount(value).valueOf()),
      new AddressValue(new Address(CONTRACT_ADDRESS)),
      BytesValue.fromUTF8('claim'),
    ],

    value: 0,
  });
};
