import { Pressable, View } from "react-native";
import { components } from "../__generated__/schema";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { useContext, useState } from "react";
import { $api } from "../api/openapi-client";
import { AuthContext } from "../context/auth-context";
import { useQueryClient } from "@tanstack/react-query";
import { DateUtils } from "../utils/date-utils";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParamList } from "../navigation-types";

interface Props {
  user: components["schemas"]["UserPublicInfoDto"];
}

type NavigationProps = BottomTabScreenProps<BottomTabsParamList, "Search">;

export default function UserItem({ user }: Props) {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { user: currrentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProps["navigation"]>();

  if (!currrentUser) throw new Error("Missing user details");

  const { data: userLinkStatusData, isLoading: isUserLinkStatusLoading } =
    $api.useQuery(
      "get",
      "/users/link/{id}",
      {
        params: {
          path: {
            id: user.id,
          },
        },
      },
      {
        enabled: showDetails,
        retry: false,
      }
    );

  const { mutate: mutateSendInvitation, isPending: isPendingSendInvitation } =
    $api.useMutation("post", "/invitations", {
      onSuccess(data, variables, context) {
        queryClient.resetQueries({
          exact: false,
          queryKey: ["get", "/invitations/sent"],
        });
        queryClient.resetQueries({
          exact: false,
          queryKey: ["get", "/invitations/recieved"],
        });
        queryClient.resetQueries({
          exact: false,
          queryKey: ["get", "/invitations/user/{id}"],
        });
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });

  return (
    <>
      <Pressable
        onPress={() => setShowDetails(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderWidth: 1,
          borderColor: theme.colors.outline,
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
        }}
      >
        <Avatar.Text
          size={60}
          label={`${user.firstName[0]}${user.lastName[0]}`}
        ></Avatar.Text>
        <Text style={{ fontSize: 20 }}>
          {user.firstName} {user.lastName}
        </Text>
      </Pressable>

      <Portal>
        <Modal
          visible={showDetails}
          onDismiss={() => setShowDetails(false)}
          contentContainerStyle={{
            justifyContent: "flex-start",
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
            borderWidth: 1,
            marginHorizontal: 30,
            minHeight: 100,
            borderRadius: 20,
            padding: 10,
          }}
        >
          {isUserLinkStatusLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator animating size="large"></ActivityIndicator>
            </View>
          ) : (
            <>
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 15,
                }}
              >
                <Avatar.Text
                  size={80}
                  label={`${user.firstName[0]}${user.lastName[0]}`}
                ></Avatar.Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    maxWidth: 250,
                    textAlign: "center",
                  }}
                >
                  {user.firstName} {user.lastName}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 0 }}>
                {userLinkStatusData &&
                (userLinkStatusData.conversation ||
                  userLinkStatusData.invitation) ? (
                  <View style={{ gap: 10 }}>
                    {userLinkStatusData.conversation ? (
                      <>
                        <Text style={{ textAlign: "center" }}>
                          Conversation exists
                        </Text>
                        <Button
                          mode="outlined"
                          contentStyle={{ width: "100%", paddingVertical: 5 }}
                          onPress={() => {
                            navigation.navigate("Convsersations");
                            setShowDetails(false);
                          }}
                        >
                          Go to conversation
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text style={{ textAlign: "center" }}>
                          Invitation pending
                        </Text>
                        <Button
                          mode="outlined"
                          contentStyle={{ width: "100%", paddingVertical: 5 }}
                          onPress={() => {
                            navigation.navigate("Invitations");
                            setShowDetails(false);
                          }}
                        >
                          Go to invitatations
                        </Button>
                      </>
                    )}
                  </View>
                ) : (
                  <Button
                    mode="contained"
                    contentStyle={{ width: "100%", paddingVertical: 5 }}
                    onPress={() => {
                      mutateSendInvitation({
                        body: {
                          userId: user.id,
                        },
                      });
                    }}
                    loading={isPendingSendInvitation}
                  >
                    Send invitation
                  </Button>
                )}
              </View>
            </>
          )}
        </Modal>
      </Portal>
    </>
  );
}
