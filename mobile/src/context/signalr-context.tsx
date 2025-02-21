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

interface SignalRContextType {
  connection: HubConnection;
}

const initialValue: SignalRContextType = {
  connection: new HubConnectionBuilder()
    .withUrl("http://192.168.1.77:3000/messages/hub", {
      async accessTokenFactory() {
        return (await getAccessToken()) || "";
      },
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build(),
};

const SignalRContext = createContext(initialValue);

export function SignalRProvider({ children }: PropsWithChildren) {
  const { user } = useContext(AuthContext);
  const connectionRef = useRef<HubConnection>(initialValue.connection);

  useEffect(() => {
    if (user) {
      connectionRef.current.start();
    }

    connectionRef.current.on("message", (message) => {
      console.log("message", message);
    });

    return () => {
      //connectionRef.current.stop();
    };
  }, [user]);

  return (
    <SignalRContext.Provider value={{ connection: connectionRef.current }}>
      <Button
        onPress={() => {
          console.log("lol");

          connectionRef.current.send("SendMessage", "lol");
        }}
      >
        lol {connectionRef.current.state}
      </Button>
      {children}
    </SignalRContext.Provider>
  );
}
