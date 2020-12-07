import {Box, Divider, Flex} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import InstrumentHistory from '../../../components/charts/instrument-history';
import Comments from '../../../components/comments';
import InstrumentSummary from '../../../components/instrument-summary';
import NewsFeed from '../../../components/newsfeed';

const InstrumentDetails: React.FC = () => {
  const router = useRouter();
  const {symbol, duration} = router.query;
  return (
    <>
      <InstrumentSummary symbol={symbol as string} />
      <Flex mb={2} justify="space-between" grow={1}>
        <Box
          flex={1}
          h={700}
          borderWidth="1px"
          borderRadius="lg"
          padding="10px"
        >
          <InstrumentHistory
            symbol={symbol as string}
            duration={duration as string}
          />
        </Box>
        <Box w={5} />
        <NewsFeed
          symbols={[symbol as string]}
          width={250}
          height={700}
        ></NewsFeed>
      </Flex>
      <Divider my={6} />
      <Comments symbol={symbol as string} />
    </>
  );
};

export default InstrumentDetails;
