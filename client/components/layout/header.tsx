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

const Header: React.FC = () => (
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
      <Tooltip label="Login / Sign Up" aria-label="login/signup">
        <IconButton isRound aria-label="user" icon={<Avatar />} />
      </Tooltip>
    </Flex>
    <Divider />
  </header>
);

export default Header;
