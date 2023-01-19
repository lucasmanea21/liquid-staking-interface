import React from 'react';
import { useAccount } from '../../hooks/auth/useAccount';
import { LoginModalButton } from '../tools/LoginModalButton';
import { CardWrapper } from '../ui/CardWrapper';

const Account = () => {
  const { address, balance } = useAccount();

  return (
    <div className="fixed z-10 w-1/2 p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800  ">
      <h2 className="text-xl">Account</h2>
      <div className="bg-slate-600 p-5 my-4">
        <div>Balance</div>
        <div className="flex flex-col">
          {address.slice(0, 5)}...{address.slice(-3)}
          <button>Check on blockchain</button>
        </div>
        {<LoginModalButton />}
      </div>
    </div>
  );
};

export default Account;
