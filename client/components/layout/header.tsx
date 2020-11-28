import {
  Avatar,
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
    <Flex py={10} align="center" borderBottom=".5px solid grey">
      <Link href="/">
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
  </header>
);

export default Header;
