import { createContext, ReactNode, useContext } from 'react';

import firebase, { db } from 'core/firebase';
import { ChatProviderI } from 'lib/types/contexts/chat';

const ChatContext = createContext({} as ChatProviderI);

function ChatProvider({ children }: { children: ReactNode }) {
  return (
    <ChatContext.Provider value={{ firebase, db }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
