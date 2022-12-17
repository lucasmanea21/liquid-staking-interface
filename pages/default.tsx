import type { NextPage } from 'next';
import {
  ListItem,
  Text,
  OrderedList,
  UnorderedList,
  Flex,
  Link,
} from '@chakra-ui/react';
import { MainLayout } from '../components/ui/MainLayout';
import { HeaderMenu } from '../components/ui/HeaderMenu';
import { HeaderMenuButtons } from '../components/ui/HeaderMenuButtons';
import { SimpleDemo } from '../components/demo/SimpleDemo';
import { GetUserDataDemo } from '../components/demo/GetUserDataDemo';
import { GetLoggingInStateDemo } from '../components/demo/GetLoggingInStateDemo';
import { GetLoginInfoDemo } from '../components/demo/GetLoginInfoDemo';
import { Authenticated } from '../components/tools/Authenticated';
import { CardWrapper } from '../components/ui/CardWrapper';
import { LoginModalButton } from '../components/tools/LoginModalButton';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth']} />
      </HeaderMenu>

      <Authenticated
        spinnerCentered
        fallback={
          <>
            <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
              Connect your wallet!
            </Text>
            <Flex mt={4} justifyContent="center">
              <LoginModalButton />
            </Flex>
          </>
        }
      >
        <SimpleDemo />
        <CardWrapper mb={4}>
          <Text mb={4}>
            Now let us see what other valuable tools are included.
          </Text>
          <Text mb={4}>
            You can get the data of currently logged-in users and network state.
            These are:
          </Text>
          <OrderedList>
            <ListItem>User data such as: address, nonce, balance.</ListItem>
            <ListItem>
              User logging in state: pending, error, loggedIn.
            </ListItem>
            <ListItem>
              Login info state: loginMethod, expires, loginToken, signature.
            </ListItem>
          </OrderedList>
        </CardWrapper>
        <Flex gap={8} flexWrap="wrap" justifyContent="center" mb={4}>
          <GetUserDataDemo />
          <GetLoginInfoDemo />
          <GetLoggingInStateDemo />
        </Flex>
      </Authenticated>
    </MainLayout>
  );
};

export default Home;
