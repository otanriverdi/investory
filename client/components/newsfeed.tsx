import {ExternalLinkIcon, RepeatIcon} from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Link,
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
import React, {useState} from 'react';
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
        <Link href={newsItem.url} isExternal>
          <ExternalLinkIcon mx="4px" color="cyan.500" />
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
          <Box height={10} mb={2} p={4}>
            <Stack direction="row" justify="space-between">
              <Text fontWeight="700" size="lg">
                News
              </Text>
              <IconButton
                onClick={() => loadMoreNews()}
                _hover={{color: 'blue.500', cursor: 'pointer'}}
                aria-label="more news"
                icon={<RepeatIcon />}
                size="sm"
                bg="cyan.500"
                color="white"
                pos="relative"
                bottom={1}
              />
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
                    borderTopWidth="1px"
                    borderBottomWidth="1px"
                    borderRightWidth="1px"
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
              {queryRes && !queryRes.data?.length && (
                <Box width="100%">
                  <Text textAlign="center" fontWeight="bold">
                    There are no news to report.
                  </Text>
                </Box>
              )}
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
