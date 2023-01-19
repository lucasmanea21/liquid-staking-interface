import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { SocialMediaIcons } from './SocialMediaIcons';
import { LoginModalButton } from '../tools/LoginModalButton';
import { useAccount } from '../../hooks/auth/useAccount';
import { useLogin } from '../../hooks/auth/useLogin';
import Account from '../staking/Account';

interface HeaderMenuButtonsProps {
  enabled: string[];
}

const UserBar = ({ setIsOpen }: { setIsOpen: any }) => {
  const balance = 5;
  const address = 'erd1000000000000000000000000000000000000000';

  return (
    <div className="flex gap-3 justify-center items-center">
      <div>{balance} EGLD</div>
      <div
        onClick={() => setIsOpen((prevState: any) => !prevState)}
        className="bg-red-200 rounded-md py-1 px-4 text-black cursor-pointer"
      >
        {address.slice(0, 5)}...{address.slice(-3)}
      </div>
    </div>
  );
};

const UserProfile = () => {
  return (
    <div>
      <div>Profile</div>
      <div>Address with link</div>
      <div>Profile Value</div>
      <div>Logout</div>
    </div>
  );
};

export const HeaderMenuButtons: FC<HeaderMenuButtonsProps> = ({ enabled }) => {
  const { address, balance } = useAccount();
  const { isLoggedIn } = useLogin();
  const [isOpen, setIsOpen] = useState(false);
  console.log('isOpen', isOpen);

  return (
    <Box className="nav" bgColor="dappTemplate.dark.darker">
      {isLoggedIn && <UserBar setIsOpen={setIsOpen} />}
      {isOpen && <Account />}
      {!isLoggedIn && <LoginModalButton />}
    </Box>
  );
};
