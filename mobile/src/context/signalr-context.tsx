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
import { useQueryClient } from "@tanstack/react-query";

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

export const SignalRContext = createContext(initialValue);

export function SignalRProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const connectionRef = useRef<HubConnection>(initialValue.connection);

  useEffect(() => {
    connectionRef.current.off(SignalREvents.RecieveMessage);
    connectionRef.current.on(SignalREvents.RecieveMessage, (message) => {
      console.log(SignalREvents.RecieveMessage, message);
      queryClient.resetQueries({
        exact: false,
        queryKey: ["get", "/messages/{id}"],
      });
    });

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
    <SignalRContext.Provider value={{ connection: connectionRef.current }}>
      {children}
    </SignalRContext.Provider>
  );
}
