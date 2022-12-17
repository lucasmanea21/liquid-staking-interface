import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { SocialMediaIcons } from './SocialMediaIcons';
import { LoginModalButton } from '../tools/LoginModalButton';
import { useAccount } from '../../hooks/auth/useAccount';

interface HeaderMenuButtonsProps {
  enabled: string[];
}

export const HeaderMenuButtons: FC<HeaderMenuButtonsProps> = ({ enabled }) => {
  const { address, balance } = useAccount();
  return (
    <Box className="nav" bgColor="dappTemplate.dark.darker">
      <p>{(Number(balance) / 10 ** 18).toFixed(4)} EGLD</p>
      {enabled.includes('auth') && <LoginModalButton />}
    </Box>
  );
};
