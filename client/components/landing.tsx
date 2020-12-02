import {ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Button, Flex, Heading, Stack, Text} from '@chakra-ui/react';
import animationData from '../public/charts.json';
import Lottie from 'react-lottie';
// import Image from 'next/image';
import React from 'react';

type Props = {
  onAction: () => unknown;
};

const Landing: React.FC<Props> = ({onAction}) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box>
      <Flex
        align="center"
        justify={{base: 'center', md: 'space-around', xl: 'space-between'}}
        direction={{base: 'column-reverse', md: 'row'}}
        wrap="nowrap"
        minH="70vh"
        mb={16}
      >
        <Stack
          spacing={4}
          w={{base: '80%', md: '55%'}}
          align={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Heading
            as="h1"
            size="2xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={['center', 'center', 'left', 'left']}
          >
            Track your personal investments with up-to-date rates and prices
          </Heading>
          <Heading
            as="h2"
            size="lg"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={['center', 'center', 'left', 'left']}
          >
            No clutter, just the necessary information
          </Heading>
          <Button
            backgroundColor="cyan.300"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            rightIcon={<ChevronRightIcon />}
            onClick={onAction}
          >
            Get Started
          </Button>
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            No credit card required.
          </Text>
        </Stack>
        <Box w={{base: '80%', sm: '60%', md: '70%'}} mb={{base: 12, md: 0}}>
          <Lottie options={lottieOptions} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Landing;
