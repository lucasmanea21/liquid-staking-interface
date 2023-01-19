import React from 'react';

const Navbar = () => {
  const items = ['Stake', 'Liquidity', 'Stats'];

  const LogoBar = () => {
    return (
      <div>
        <div>Logo</div>
      </div>
    );
  };

  const UserBar = () => {
    const balance = 5;
    const address = '0x0000000000000000000000000000000000000000';

    return (
      <div>
        <div>{balance} EGLD</div>
        <div>
          {address.slice(0, 5)}...{address.slice(-3)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <LogoBar />
      <UserBar />
    </div>
  );
};

export default Navbar;
