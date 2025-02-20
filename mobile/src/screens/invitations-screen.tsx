import { useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { $api } from "../api/openapi-client";
import InvitationItem from "../components/invitation-item";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import NoContentView from "../components/no-content-view";
import ErrorView from "../components/error-view";
import LoadingView from "../components/loading-view";

function RecievedInvitations() {
  const { data, isLoading, isError } = $api.useQuery(
    "get",
    "/invitations/recieved"
  );

  if (isLoading) return <LoadingView></LoadingView>;
  if (isError) return <ErrorView></ErrorView>;

  if (data && data.length > 0) {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {data.map((item) => (
          <InvitationItem
            key={item.id}
            invitation={item}
            mode="RECIEVER"
          ></InvitationItem>
        ))}
      </ScrollView>
    );
  } else {
    return <NoContentView></NoContentView>;
  }
}

function SentInvitations() {
  const { data, isLoading, isError } = $api.useQuery(
    "get",
    "/invitations/sent"
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An error occured</Text>
      </View>
    );
  }

  if (data && data.length > 0) {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {data.map((item) => (
          <InvitationItem
            key={item.id}
            invitation={item}
            mode="SENDER"
          ></InvitationItem>
        ))}
      </ScrollView>
    );
  } else {
    return <NoContentView></NoContentView>;
  }
}

export default function InvitationsScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<"RECIEVED" | "SENT">("RECIEVED");

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View
        style={{
          backgroundColor: theme.colors.surface,
          padding: 15,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Button
          mode={tab === "RECIEVED" ? "contained" : "outlined"}
          style={{ flex: 1 }}
          onPress={() => setTab("RECIEVED")}
          icon={({ color, size }) => (
            <FontAwesomeIcon
              icon={faArrowDown}
              color={color}
              size={size}
            ></FontAwesomeIcon>
          )}
        >
          Recieved
        </Button>
        <Button
          mode={tab === "SENT" ? "contained" : "outlined"}
          style={{ flex: 1 }}
          onPress={() => setTab("SENT")}
          icon={({ color, size }) => (
            <FontAwesomeIcon
              icon={faArrowUp}
              color={color}
              size={size}
            ></FontAwesomeIcon>
          )}
        >
          Sent
        </Button>
      </View>
      {tab === "RECIEVED" ? (
        <RecievedInvitations></RecievedInvitations>
      ) : (
        <SentInvitations></SentInvitations>
      )}
    </View>
  );
}
