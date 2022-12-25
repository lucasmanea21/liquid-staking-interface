import React from 'react';
import { useLogin } from '../../hooks/auth/useLogin';

const UnstakeCard = ({
  type,
  amount,
  selected,
  onClick,
  comingSoon,
}: {
  type: string;
  amount: number;
  selected: boolean;
  onClick: any;
  comingSoon: boolean;
}) => {
  const isNow = type === 'now';
  const { isLoggedIn } = useLogin();

  return (
    <div
      className={`unstake-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <p className="text-xs uppercase">
        {isNow ? 'Unstake now' : 'Unstake in ~11 days'}
      </p>
      <p className="mt-1 mb-2 text-xl">
        {Number(Number(amount).toFixed(4))} EGLD
      </p>
      <p className="text-sm">Unstake fee: {isNow ? 0.3 : 0}%</p>
    </div>
  );
};

export default UnstakeCard;
