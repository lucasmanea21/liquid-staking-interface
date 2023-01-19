import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import logo from '../../assets/images/Wave-text.png';

export const Logo = () => {
  return (
    <NextLink href="/">
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        position="relative"
        userSelect="none"
      >
        {/* <Text
          as="span"
          cursor="pointer"
          mb={0}
          fontSize="4xl"
          fontWeight="black"
          color="dappTemplate.white"
        >
          Wave Protocol
        </Text> */}
        <Image src={logo} alt="Wave" width={150} />
      </Box>
    </NextLink>
  );
};
