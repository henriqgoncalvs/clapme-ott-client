/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import ScrollableFeed from 'react-scrollable-feed';
import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { MessageI } from 'lib/types/components';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';
import { useChat } from '@contexts/ChatProvider';

import ChatBox from '@organism/Chat/ChatBox';

import 'dayjs/locale/pt-br';

const ChatFeed = () => {
  const { db } = useChat();
  const { user } = useAuth();

  const [messages, setMessages] = useState<MessageI[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    return db
      .collection('messages')
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot((querySnapShot: any) => {
        const data = querySnapShot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(data);
      });
  }, [db]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db.collection('messages').add({
      text: newMessage,
      createdAt: dayjs().locale('pt-br').toISOString(),
      sender: user?.name,
      uid: user?.id,
      displayName: user?.name,
    });

    setNewMessage('');
  };

  return (
    <Flex w="100%" height="100%" flexDirection="column" px={{ base: 0, lg: 8 }}>
      <Box
        maxHeight="100%"
        height="100%"
        bg="gray.200"
        pb={20}
        borderRadius={12}
        overflow="hidden"
        boxShadow="0 2px 2px #0f0f0f04"
      >
        <ScrollableFeed>
          <Box p={6}>
            {messages?.map((message, key: number) => (
              <ChatBox
                message={message}
                isMine={user?.name === message.sender}
                key={key}
              />
            ))}
          </Box>
        </ScrollableFeed>
        <Flex px={4} height={20} alignItems="center" w="100%">
          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            <Flex alignItems="center" w="100%" justifyContent="center">
              <Input
                w="100%"
                placeholder="Type a message"
                size="lg"
                bg="white"
                _focus={{
                  outline: 'none',
                }}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <IconButton
                type="submit"
                size="lg"
                aria-label="Enviar"
                icon={<IoMdSend />}
                ml={2}
              >
                Enviar
              </IconButton>
            </Flex>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatFeed;
