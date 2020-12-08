import {ExternalLinkIcon, Icon} from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, {useState} from 'react';
import {IoReloadCircle} from 'react-icons/io5';
import {NewsItem} from '../graphql/generated/graphql';
import useNews from '../hooks/use-news';

type NewsFeedPropType = {
  symbols: string[];
  last?: number;
  height?: number;
  width?: number;
  row?: boolean;
};

const NewsFeed: React.FC<NewsFeedPropType> = ({
  symbols,
  last,
  height,
  width,
  row = false,
}) => {
  const [selectedNews, setSelectedNews] = useState({
    newsItem: {} as NewsItem,
    showNews: false,
  });

  const [newsCount, setNewsCount] = useState(5);

  function showSelectedNews(newsItem: NewsItem) {
    setSelectedNews({newsItem, showNews: true});
  }

  function onCloseNewsModal() {
    setSelectedNews({newsItem: {} as NewsItem, showNews: false});
  }

  if (last) setNewsCount(last);
  const queryRes = useNews(symbols, newsCount);

  function loadMoreNews() {
    setNewsCount(count => Math.ceil(count * 1.5));
  }

  function renderNewsFooter(newsItem: NewsItem) {
    return (
      <Text fontSize="xs" color="gray.500">
        {newsItem.source} | {dayjs(newsItem.datetime).format('MMMM DD YYYY')} |
        <Link href={newsItem.url}>
          <ExternalLinkIcon mx="3px" color="cyan.500" />
        </Link>
      </Text>
    );
  }

  function createMarkup(content) {
    return {__html: content};
  }

  return (
    <>
      <Box borderWidth="1px" borderRadius="md" w={width || null} h={height}>
        <Stack>
          <Box height={10} p={2} as="h3">
            <Stack direction="row" justify="space-between">
              <Text fontWeight="700" size="md">
                News
              </Text>
              <Icon
                as={IoReloadCircle}
                color="cyan.500"
                w={7}
                h={7}
                onClick={() => loadMoreNews()}
                _hover={{color: 'blue.500', cursor: 'pointer'}}
              ></Icon>
            </Stack>
          </Box>
          <Skeleton isLoaded={queryRes && !queryRes?.loading}>
            {row && (!queryRes || queryRes?.loading) && (
              <Skeleton height="97px" />
            )}
            <Flex
              h={height - 50}
              direction={row ? 'row' : 'column'}
              overflow="auto"
            >
              {queryRes &&
                queryRes.data?.map((newsItem: NewsItem, index) => (
                  <Box
                    borderWidth="1px"
                    width={row ? '250px' : null}
                    height={!row && '20%'}
                    key={index}
                    p={3}
                  >
                    <Box
                      _hover={{
                        textDecoration: 'underline',
                        color: 'cyan.500',
                        cursor: 'pointer',
                      }}
                      onClick={() => showSelectedNews(newsItem)}
                    >
                      <Box as="h5">
                        <Text
                          fontWeight="700"
                          isTruncated={true}
                          _hover={{
                            textDecoration: 'underline',
                            color: 'cyan.500',
                          }}
                        >
                          {newsItem.headline}
                        </Text>
                      </Box>
                      <Text
                        fontSize="sm"
                        noOfLines={2}
                        _hover={{
                          textDecoration: 'underline',
                          color: 'cyan.500',
                        }}
                        dangerouslySetInnerHTML={createMarkup(newsItem.summary)}
                      ></Text>
                    </Box>
                    {renderNewsFooter(newsItem)}
                  </Box>
                ))}
            </Flex>
          </Skeleton>
        </Stack>
      </Box>
      <Modal
        blockScrollOnMount={false}
        isOpen={selectedNews.showNews}
        onClose={onCloseNewsModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>News Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            {selectedNews.newsItem.image && (
              <>
                <Image
                  boxSize="200px"
                  src={selectedNews.newsItem.url}
                  alt="Image"
                />
                <Divider />
              </>
            )}
            <Text fontWeight="bold" mb="1rem">
              {selectedNews.newsItem.headline}
            </Text>
            <Divider />
            <Text fontSize="sm">{selectedNews.newsItem.summary}</Text>
          </ModalBody>
          <ModalFooter>{renderNewsFooter(selectedNews.newsItem)}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewsFeed;
