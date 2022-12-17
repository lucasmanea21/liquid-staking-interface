import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../../config';
import { SCQueryType, useScQuery } from '../../hooks/core/useScQuery';
import abi from '../../assets/abi/stakeContract.abi.json';
import { Address } from '@elrondnetwork/erdjs/out';
import { useApiCall } from '../../hooks/core/useApiCall';

const Validators = () => {
  const [validators, setValidators] = useState([]);
  const [validatorsWithStake, setValidatorsWithStake] = useState([]);

  console.log('abi', abi);
  const {
    data: queryResult,
    fetch, // you can always trigger the query manually if 'autoInit' is set to false
    isLoading, // pending state for initial load
    isValidating, // pending state for each revalidation of the data, for example using the mutate
    error,
  } = useScQuery<number>({
    type: SCQueryType.COMPLEX, // can be int or string
    payload: {
      scAddress: CONTRACT_ADDRESS,
      funcName: 'getValidators',
    },
    abiJSON: abi,
    autoInit: true, // you can enable or disable trigger of the query on component mount
  });

  useEffect(() => {
    if (queryResult && validators.length == 0) {
      // @ts-ignore
      let items = queryResult?.firstValue?.items;

      // for each item, parse the address to bech32
      items = items.map((item: any) => {
        const address = new Address(item.value);
        console.log('item.value, address.hex(', item.value, address.bech32());
        return address.bech32().valueOf();
      });

      setValidators(items);
    }
  }, [queryResult]);

  // validators.length > 0 &&
  //   validators.map((item) => {
  //     const {
  //       data: queryResult,
  //       fetch, // you can always trigger the query manually if 'autoInit' is set to false
  //       isLoading, // pending state for initial load
  //       isValidating, // pending state for each revalidation of the data, for example using the mutate
  //       error,
  //     } = useScQuery<number>({
  //       type: SCQueryType.COMPLEX, // can be int or string
  //       payload: {
  //         scAddress: item,
  //         funcName: 'getValidators',
  //       },
  //       abiJSON: abi,
  //       autoInit: true, // you can enable or disable trigger of the query on component mount
  //     });
  //   });

  console.log('validators', validators);

  return (
    <div>
      <div>Validators</div>
      {validators &&
        validators.map((validator: any) => {
          return (
            <p className="text-xs" key={validator}>
              {validator}
            </p>
          );
        })}
    </div>
  );
};

export default Validators;
