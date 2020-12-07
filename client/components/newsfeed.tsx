import {ExternalLinkIcon, Icon} from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Heading,
  Image,
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
import {IoReloadCircle} from 'react-icons/io5';
import {NewsItem} from '../graphql/generated/graphql';
import useNews from '../hooks/use-news';

type NewsFeedPropType = {
  symbols: string[];
  last?: number;
  height?: number;
  width?: number;
};

const NewsFeed: React.FC<NewsFeedPropType> = props => {
  const [selectedNews, setSelectedNews] = useState({
    newsItem: {} as NewsItem,
    showNews: false,
  });

  const [newsCount, setNewsCount] = useState(1);
  const {symbols, last, height, width} = props;

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

  function renderSpinner(loading) {
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
      <Box
        borderWidth="1px"
        borderRadius="lg"
        padding="10px"
        w={250}
        h={height}
      >
        <Stack spacing="5px">
          <Heading as="h3" size="md">
            <Stack direction="row" justify="space-between">
              <Text>News</Text>
              <Icon
                as={IoReloadCircle}
                color="cyan.500"
                w={7}
                h={7}
                onClick={() => loadMoreNews()}
                _hover={{color: 'blue.500', cursor: 'pointer'}}
              ></Icon>
            </Stack>
          </Heading>
          <Divider />
          <Box overflow="auto" h={height - 60}>
            {renderSpinner(queryRes ? queryRes.loading : true)}
            {!queryRes?.loading &&
              queryRes &&
              queryRes.data?.map((newsItem: NewsItem, index) => (
                <Box key={index} w={width - 40} pb={2} pt={2}>
                  <Box
                    _hover={{
                      textDecoration: 'underline',
                      color: 'cyan.500',
                      cursor: 'pointer',
                    }}
                    onClick={() => showSelectedNews(newsItem)}
                  >
                    <Heading as="h5" size="sm">
                      <Text
                        isTruncated={true}
                        _hover={{
                          textDecoration: 'underline',
                          color: 'cyan.500',
                        }}
                      >
                        {newsItem.headline}
                      </Text>
                    </Heading>
                    <Text
                      fontSize="sm"
                      isTruncated={true}
                      _hover={{textDecoration: 'underline', color: 'cyan.500'}}
                    >
                      <div
                        dangerouslySetInnerHTML={createMarkup(newsItem.summary)}
                      ></div>
                    </Text>
                  </Box>
                  {renderNewsFooter(newsItem)}
                  <Divider />
                </Box>
              ))}
          </Box>
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
