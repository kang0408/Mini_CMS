import MessageIndex from "./index";

import { createContext, useContext, useState, useCallback } from "react";

const MessageContext = createContext();

export default function MessageProvider({ children, maxMessage = 5 }) {
  const [messageList, setMessageList] = useState([]);

  const useMessage = useCallback((message) => {
    setMessageList((prev) => {
      if (prev.length >= maxMessage) {
        prev = prev.slice(1);
      }

      return [...prev, message];
    });

    setTimeout(() => {
      setMessageList((prev) => prev.filter((t) => t !== message));
    }, message.duration || 4000);
  }, []);

  return (
    <MessageContext.Provider value={{ messageList, useMessage }}>
      <div className="w-full flex flex-col relative overflow-hidden">
        <div
          id="message-provider"
          className="absolute top-0 left-0 right-0 z-999"
        ></div>
        <MessageIndex msgList={messageList} />
        <div className="flex-1">{children}</div>
      </div>
    </MessageContext.Provider>
  );
}

export const useMessageProvider = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
