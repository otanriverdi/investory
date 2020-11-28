import {useAuth0} from '@auth0/auth0-react';
import {
  Avatar,
  Divider,
  Flex,
  IconButton,
  Link,
  Spacer,
  Text,
  Tooltip,
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

  return (
    <header>
      <Flex py={6} align="center">
        <Link css={{':hover': {textDecoration: 'none'}}} href="/">
          <Text
            css={{position: 'relative', top: -3, cursor: 'pointer'}}
            color="cyan.300"
            fontWeight="700"
            fontSize="3xl"
          >
            Investory
          </Text>
        </Link>
        <Spacer />
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
            icon={
              <Avatar
                src={isAuthenticated && user.picture}
                backgroundColor="cyan.300"
                name={isAuthenticated && user.name}
              />
            }
          />
        </Tooltip>
      </Flex>
      <Divider />
    </header>
  );
};

export default Header;
