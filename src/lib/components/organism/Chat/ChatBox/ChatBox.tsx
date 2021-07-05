import React from 'react';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { Flex, Tag, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { MessageI } from 'lib/types/components';

interface MessageProps {
  message: MessageI;
  isMine?: boolean;
}

const ChatBox: React.FC<MessageProps> = ({ message, isMine }) => {
  return (
    <Flex my={2} p={2}>
      <Flex flexDirection="column" width="100%">
        <Tag
          variant="subtle"
          mb={1}
          bg={isMine ? 'solid-c' : 'gray.500'}
          color="solid-text-c"
          ml={isMine ? 'auto' : undefined}
          mr={isMine ? undefined : 'auto'}
        >
          {message?.sender}
        </Tag>
        <Text
          fontSize={13}
          maxWidth={400}
          mb={1}
          color="primary-c.500"
          ml={isMine ? 'auto' : undefined}
          mr={isMine ? undefined : 'auto'}
        >
          {message?.company || 'Sem empresa'}
        </Text>
        <Flex
          bg="gray.50"
          pr={2}
          py={2}
          pl={4}
          borderRadius={12}
          boxShadow="0 2px 2px #0f0f0f0f"
          ml={isMine ? 'auto' : undefined}
          mr={isMine ? undefined : 'auto'}
        >
          <Text fontSize={15} wordBreak="break-word" color="#000">
            {message?.text}
          </Text>
          <Flex
            ml="auto"
            mt="auto"
            pl={4}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Text fontSize={12} color="gray.500">
              {dayjs(message?.sendedAt).format('HH:mm A')}
            </Text>
            {isMine ? (
              <RiCheckDoubleFill fontSize={12} color="green.400" />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatBox;
