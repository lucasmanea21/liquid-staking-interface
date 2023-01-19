import { Address } from '@elrondnetwork/erdjs/out';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../config';
import { SCQueryType, useScQuery } from './core/useScQuery';
import abi from '../assets/abi/stakeContract.abi.json';
import { useApiCall } from './core/useApiCall';

const useGetValidators = () => {
  const [validators, setValidators] = useState([]);
  const [validatorsWithData, setValidatorsWithData] = useState([]);

  const { data: queryResult } = useScQuery<any>({
    type: SCQueryType.COMPLEX,
    payload: {
      scAddress: CONTRACT_ADDRESS,
      funcName: 'getValidators',
    },
    abiJSON: abi,
    autoInit: true,
  });

  const { data: validatorsData } = useApiCall<any>({
    url: `/providers`,
    autoInit: true, // similar to useScQuery
    type: 'get', // can be get, post, delete, put
  });

  useEffect(() => {
    if (queryResult && validators.length == 0) {
      let items = queryResult?.firstValue?.items;

      items = items.map((item: any) => {
        return new Address(item.value).bech32().valueOf();
      });

      setValidators(items);
    }
  }, [queryResult, validators]);

  useEffect(() => {
    if (validators && validatorsData && validators.length > 0) {
      const validatorsWithData = validators.map((item) => {
        const validator = validatorsData.find(
          (validator: any) => validator.provider === item
        );

        return validator;
      });

      // @ts-ignore
      setValidatorsWithData(validatorsWithData);

      console.log('validatorsWithData', validatorsWithData);
    }
  }, [validatorsData, validators]);

  return { validators, validatorsWithData };
};

export default useGetValidators;
