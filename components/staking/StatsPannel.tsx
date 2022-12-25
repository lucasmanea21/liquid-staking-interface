import React from 'react';
import Validators from './Validators';

export const Item = ({ name, value }: { name: string; value: string }) => {
  return (
    <span className="stats-item">
      <p className="text-gray-200 text-md">{name}</p>
      <p>{value}</p>
    </span>
  );
};

const StatsPannel = () => {
  return (
    <div className="space-y-5 card ">
      <p className="text-xl">Stats</p>
      <div className="flex flex-col space-y-2">
        <Item name="stEGLD market cap:" value="$3,340,252" />
        <Item name="APR:" value="9.87%" />
        <Item name="Stakers:" value="503" />
        {/* <Validators /> */}
      </div>
    </div>
  );
};

export default StatsPannel;
