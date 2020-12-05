import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, {useState} from 'react';

const NewsFeed: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState({
    newsId: '',
    showNews: false,
  });

  function showSelectedNews(newsId: string) {
    setSelectedNews({newsId, showNews: true});
  }

  function onCloseNewsModal() {
    setSelectedNews({newsId: '', showNews: false});
  }

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        padding="15px"
        overflow="auto"
        w="250px"
      >
        <Stack spacing="5px">
          <Heading as="h3" size="md">
            <Text>News</Text>
          </Heading>
          <Divider />

          <Box
            w="220px"
            onClick={() => showSelectedNews('')}
            _hover={{backgroundColor: 'gray.100'}}
          >
            <Heading as="h5" size="sm">
              <Text isTruncated={true}>Heading</Text>
            </Heading>
            <HStack>
              <Box w="200px">
                <Text fontSize="sm" isTruncated={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse adipiscing elit.
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Source | {dayjs(1545215400000).format('MMMM DD YYYY')}{' '}
                </Text>
              </Box>
            </HStack>
          </Box>
          <Divider />

          <Box
            w="220px"
            onClick={() => showSelectedNews('')}
            _hover={{backgroundColor: 'gray.100'}}
          >
            <Heading as="h5" size="sm">
              <Text isTruncated={true}>Heading</Text>
            </Heading>
            <Box w="200px">
              <Text fontSize="sm" isTruncated={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse adipiscing elit.
              </Text>
              <Text fontSize="xs" color="gray.500">
                Source | {dayjs(1545215400000).format('MMMM DD YYYY')}{' '}
              </Text>
            </Box>
          </Box>
          <Divider />
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
