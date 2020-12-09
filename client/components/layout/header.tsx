import {useAuth0} from '@auth0/auth0-react';
import {MoonIcon, SunIcon, UnlockIcon} from '@chakra-ui/icons';
import {
  Avatar,
  Divider,
  Flex,
  IconButton,
  Link,
  Spacer,
  Switch,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth0();

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <header>
      <Flex py={6} align="center">
        <Link
          _focus={{outline: 'none'}}
          _active={{outline: 'none'}}
          css={{':hover': {textDecoration: 'none'}}}
          href="/"
        >
          <Text
            css={{position: 'relative', top: -5.5, cursor: 'pointer'}}
            color="cyan.400"
            fontWeight="700"
            fontSize={{base: '2xl', md: '3xl'}}
          >
            Investory
          </Text>
        </Link>
        <Spacer />
        {colorMode === 'light' ? <MoonIcon mr={2} /> : <SunIcon mr={2} />}
        <Switch
          mr={4}
          size="lg"
          onChange={() => toggleColorMode()}
          isChecked={colorMode === 'dark'}
        />
        <Tooltip
          label={isAuthenticated ? 'Logout' : 'Login/Sign Up'}
          aria-label={isAuthenticated ? 'Logout' : 'Login/Sign Up'}
        >
          <IconButton
            isLoading={isLoading}
            onClick={
              isAuthenticated ? () => logout() : () => loginWithRedirect()
            }
            isRound
            aria-label="user"
            size="lg"
            icon={
              isAuthenticated ? (
                <Avatar
                  size="md"
                  src={user.picture}
                  bgColor="gray.300"
                  name={user.name}
                />
              ) : (
                <UnlockIcon />
              )
            }
          />
        </Tooltip>
      </Flex>
      <Divider />
    </header>
  );
};

export default Header;
