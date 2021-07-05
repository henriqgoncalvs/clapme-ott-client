/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { RiUserFill } from 'react-icons/ri';
import ScrollableFeed from 'react-scrollable-feed';
import { Box, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import dayjs from 'dayjs';
import { IEmojiData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';

import { COMPANY_TOKEN } from 'core/config';
import { MessageI, UserChatI } from 'lib/types/components';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';
import { useChat } from '@contexts/ChatProvider';

import ChatBox from '@organism/Chat/ChatBox';

import 'firebase/firestore';
import 'dayjs/locale/pt-br';

const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

const ChatFeed = ({ eventId }: { eventId: string | string[] | undefined }) => {
  const { db, firebase } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef<ScrollableFeed | null>(null);

  const [messages, setMessages] = useState<MessageI[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const [usersOnline, setUsersOnline] = useState<UserChatI[]>([]);

  const [emojiBoxOpen, setEmojiBoxOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleEmojiBox = () => {
    setEmojiBoxOpen(!emojiBoxOpen);
  };

  const onEmojiClick = (event: any, emojiObject: IEmojiData) => {
    event.preventDefault();
    const cursor = inputRef.current?.selectionEnd;
    const text =
      newMessage.slice(0, cursor!) +
      emojiObject.emoji +
      newMessage.slice(cursor!);
    setNewMessage(text);
    toggleEmojiBox();
  };

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(
      newMessage.length + 1,
      newMessage.length + 1,
    );
  }, [newMessage]);

  useEffect(() => {
    db.collection(`${COMPANY_TOKEN}-${eventId}-chat`)
      .orderBy('createdAt')
      .onSnapshot((querySnapShot: any) => {
        const data = querySnapShot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));
        messagesEndRef.current?.scrollToBottom();
        setMessages(data);
      });

    db.collection('status')
      .where('state', '==', 'online')
      .orderBy('displayName')
      .onSnapshot(function (snapshot: any) {
        const data = snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsersOnline(data);
      });
  }, [db]);

  useEffect(() => {
    if (db && messagesEndRef.current) {
      messagesEndRef.current?.scrollToBottom();
    }
  }, [db, messagesEndRef]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db.collection(`${COMPANY_TOKEN}-${eventId}-chat`).add({
      text: newMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sendedAt: dayjs().toISOString(),
      sender: user?.name,
      uid: user?.id,
      displayName: user?.name,
      company: user?.user_company,
    });

    setNewMessage('');
  };

  return (
    <>
      <Box
        d="flex"
        flexDirection="column"
        justifyContent="space-between"
        // px={1}
        height="100%"
        // overflowX="hidden"
        ml={{ base: 0, lg: 10 }}
        bg="gray.200"
        borderRadius={12}
        // overflow="hidden"
        boxShadow="0 2px 2px #0f0f0f04"
      >
        <Tabs colorScheme="primary-c" defaultIndex={1} height="100%">
          <TabList color="solid-c">
            <Tab>
              <RiUserFill className="mr-2" /> {usersOnline.length} usuários
              online
            </Tab>
            <Tab>Chat</Tab>
          </TabList>

          <TabPanels height={{ base: '90%', md: '87%', lg: '95%' }}>
            <TabPanel color="solid-c" height="100%" overflowY="scroll">
              <Box d="flex" flexDirection="column" overflowY="hidden">
                {usersOnline?.map((user) => (
                  <Flex key={user?.uid} direction="column">
                    <Flex alignItems="center" mb={2}>
                      <RiUserFill className="mr-2" />
                      <Text m={0}>{user?.displayName}</Text>
                    </Flex>
                    <Text fontSize={13} mb={2} color="primary-c.500">
                      {user?.company}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </TabPanel>
            <TabPanel
              d="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
              py={6}
              px={2}
            >
              <Box
                flex={1}
                d="flex"
                flexDirection="column"
                justifyContent="space-between"
                overflow="hidden"
                p={1}
              >
                <ScrollableFeed
                  forceScroll
                  ref={messagesEndRef}
                  // className="h-24"
                >
                  <Box>
                    {messages?.map((message, key: number) => (
                      <ChatBox
                        message={message}
                        isMine={user?.name === message.sender}
                        key={key}
                      />
                    ))}
                  </Box>
                </ScrollableFeed>
              </Box>
              {emojiBoxOpen && (
                <Box alignSelf="flex-end" mb={2}>
                  <Picker onEmojiClick={onEmojiClick} />
                </Box>
              )}
              <Flex
                px={4}
                height={20}
                alignItems="center"
                justifyItems="center"
                w="100%"
                flex={0.1}
              >
                <form onSubmit={(e) => handleSubmit(e)} className="w-full">
                  <Flex alignItems="center" w="100%" justifyContent="center">
                    <Box w="100%" position="relative">
                      <Input
                        w="100%"
                        placeholder="Escreva sua mensagem"
                        size="lg"
                        bg="white"
                        color="#000"
                        _focus={{
                          outline: 'none',
                        }}
                        autoFocus
                        pr={10}
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                        ref={inputRef}
                      />
                      <HiOutlineEmojiHappy
                        onClick={toggleEmojiBox}
                        size={20}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 cursor-pointer bg-secondary-c"
                        color="black"
                      />
                    </Box>
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default ChatFeed;
