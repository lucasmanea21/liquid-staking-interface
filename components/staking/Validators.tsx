import React, { useEffect, useState } from 'react';
import { API_URL, CONTRACT_ADDRESS } from '../../config';
import { SCQueryType, useScQuery } from '../../hooks/core/useScQuery';
import abi from '../../assets/abi/stakeContract.abi.json';
import { Address } from '@elrondnetwork/erdjs/out';
import axios from 'axios';
import { useApiCall } from '../../hooks/core/useApiCall';
import useGetValidators from '../../hooks/useGetValidators';

const Validators = () => {
  const [validatorsWithStake, setValidatorsWithStake] = useState([]);
  const { validators, validatorsWithData } = useGetValidators();

  useEffect(() => {
    validatorsWithData.length > 0 && computeApr(validatorsWithData);
  }, [validatorsWithData]);

  const computeApr = (validators: any) => {
    const getStakePercentage = (stake: number) => {
      const totalStake = validatorsWithStake.reduce(
        (total: number, validator: any) => total + validator.stake ?? 0,
        0
      );

      return stake / totalStake;
    };

    console.log('stakePercentage', getStakePercentage(validators));
  };

  console.log('validators', validators);
  console.log('validatorsWithData', validatorsWithData);

  const ValidatorItem = ({ validator }: any) => {
    const { data: stake } = useScQuery<any>({
      type: SCQueryType.NUMBER,
      payload: {
        scAddress: validator,
        funcName: 'getUserActiveStake',
        args: [Address.fromBech32(CONTRACT_ADDRESS).hex()],
      },
      autoInit: true,
    });

    return (
      <div className="flex justify-between w-full">
        <p className="text-sm" key={validator}>
          {validator.slice(0, 4) + '...' + validator.slice(-3)}
        </p>
        <p>{Number(Number(stake / 10 ** 18).toFixed(4)) ?? 0} EGLD</p>
      </div>
    );
  };

  return (
    <div>
      <div>Validators</div>
      {validators &&
        validators.map((validator: any) => {
          return <ValidatorItem key={validator} validator={validator} />;
        })}
    </div>
  );
};

export default Validators;
