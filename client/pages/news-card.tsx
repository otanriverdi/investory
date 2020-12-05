import {ExternalLinkIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, {useState} from 'react';
import {NewsItem} from '../graphql/generated/graphql';
import useNews from '../hooks/use-news';

type NewsFeedPropType = {
  symbols: string[];
  last?: number;
};

const NewsFeed: React.FC<NewsFeedPropType> = props => {
  const [selectedNews, setSelectedNews] = useState({
    newsId: '',
    showNews: false,
  });
  // const [queryRes, setQueryRes] = useState({data:null, loading:false})
  const {symbols, last} = props;

  function showSelectedNews(newsId: string) {
    setSelectedNews({newsId, showNews: true});
  }

  function onCloseNewsModal() {
    setSelectedNews({newsId: '', showNews: false});
  }

  const queryRes = useNews(symbols, last);

  function showSpinner(loading) {
    return (
      loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="cyan.500"
          size="xl"
        />
      )
    );
  }

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        padding="15px"
        overflow="scroll"
        w="260px"
        h="400px"
      >
        <Stack spacing="5px">
          <Heading as="h3" size="md">
            <Text>News</Text>
          </Heading>
          <Divider />
          {showSpinner(queryRes ? queryRes.loading : true)}
          {!queryRes?.loading &&
            // <>
            queryRes &&
            queryRes.data?.map((newsItem: NewsItem, index) => (
              <Box
                key={index}
                w="220px"
                onClick={() => showSelectedNews(index)}
                _hover={{backgroundColor: 'gray.100'}}
              >
                <Heading as="h5" size="sm">
                  <Text isTruncated={true}>{newsItem.headline}</Text>
                </Heading>
                {/* <HStack> */}
                <Box w="200px">
                  <Text fontSize="sm" isTruncated={true}>
                    {newsItem.summary}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {newsItem.source} |{' '}
                    {dayjs(newsItem.datetime).format('MMMM DD YYYY')} |
                    <Link href={newsItem.url}>
                      <>
                        link <ExternalLinkIcon mx="2px" />{' '}
                      </>
                    </Link>
                  </Text>
                </Box>
                {/* </HStack> */}
                <Divider />
              </Box>
            ))}
        </Stack>
      </Box>
      <Modal
        blockScrollOnMount={false}
        isOpen={selectedNews.showNews}
        onClose={onCloseNewsModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can scroll the content behind the modal
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseNewsModal}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewsFeed;
