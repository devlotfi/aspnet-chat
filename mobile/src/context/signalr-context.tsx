import {
  createContext,
  PropsWithChildren,
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

interface SignalRContextType {
  connection: HubConnection;
}

const initialValue: SignalRContextType = {
  connection: new HubConnectionBuilder()
    .withUrl("http://192.168.1.77:3000/conversations/hub")
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build(),
};

const SignalRContext = createContext(initialValue);

export function SignalRProvider({ children }: PropsWithChildren) {
  const connectionRef = useRef<HubConnection>(initialValue.connection);

  useEffect(() => {
    connectionRef.current.start();

    connectionRef.current.on("message", (message) => {
      console.log("message", message);
    });

    return () => {
      connectionRef.current.stop();
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ connection: connectionRef.current }}>
      {/* <Button
        onPress={() => {
          console.log("lol");

          connectionRef.current.send("SendMessage", "lol");
        }}
      >
        lol {connectionRef.current.state}
      </Button> */}
      {children}
    </SignalRContext.Provider>
  );
}
