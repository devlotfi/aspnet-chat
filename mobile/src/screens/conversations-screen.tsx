import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { $api } from "../api/openapi-client";
import ErrorView from "../components/error-view";
import InvitationItem from "../components/invitation-item";
import LoadingView from "../components/loading-view";
import NoContentView from "../components/no-content-view";
import ConversationItem from "../components/conversation-item";

function ConversationList() {
  const { data, isLoading, isError } = $api.useQuery("get", "/conversations");

  if (isLoading) return <LoadingView></LoadingView>;
  if (isError) return <ErrorView></ErrorView>;

  if (data && data.length > 0) {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {data.map((item) => (
          <ConversationItem
            key={item.id}
            conversation={item}
          ></ConversationItem>
        ))}
      </ScrollView>
    );
  } else {
    return <NoContentView></NoContentView>;
  }
}

export default function ConvsersationsScreen() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          padding: 18,
          paddingHorizontal: 25,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Conversations</Text>
      </View>

      <ConversationList></ConversationList>
    </View>
  );
}
