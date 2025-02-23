import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Button } from "react-native-paper";
import { getAccessToken } from "../api/get-access-token";
import { AuthContext } from "./auth-context";
import { SignalREvents } from "../signalr-events";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { components } from "../__generated__/schema";

interface SignalRContextType {
  connection: HubConnection;
}

const initialValue: SignalRContextType = {
  connection: new HubConnectionBuilder()
    .withUrl("http://192.168.1.77:3000/hubs/messages", {
      async accessTokenFactory() {
        return (await getAccessToken()) || "";
      },
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build(),
};

export const ChatContext = createContext(initialValue);

export function ChatProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const connectionRef = useRef<HubConnection>(initialValue.connection);

  useEffect(() => {
    connectionRef.current.off(SignalREvents.RecieveMessage);
    connectionRef.current.on(
      SignalREvents.RecieveMessage,
      (conversationId, messageDto) => {
        console.log(SignalREvents.RecieveMessage, conversationId, messageDto);

        queryClient.setQueryData(
          ["MESSAGES", conversationId],
          (
            data: InfiniteData<components["schemas"]["MessageDto"][]>
          ): InfiniteData<components["schemas"]["MessageDto"][]> => {
            console.log("messages", data);

            const newPages = [
              ...data.pages.map((page) => [
                ...page.map((message) => ({ ...message })),
              ]),
            ];
            newPages[newPages.length - 1].push(messageDto);

            return {
              pageParams: [...data.pageParams],
              pages: newPages,
            };
          }
        );
      }
    );

    return () => {
      connectionRef.current.off(SignalREvents.RecieveMessage);
      connectionRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (user) {
      connectionRef.current.start();
    } else {
      connectionRef.current.off(SignalREvents.RecieveMessage);
      connectionRef.current.stop();
    }
  }, [user]);

  return (
    <ChatContext.Provider value={{ connection: connectionRef.current }}>
      {children}
    </ChatContext.Provider>
  );
}
