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

interface Props {
  user: components["schemas"]["UserPublicInfoDto"];
}

export default function UserItem({ user }: Props) {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { user: currrentUser } = useContext(AuthContext);

  if (
    !user.firstName ||
    !user.lastName ||
    !currrentUser ||
    !currrentUser.firstName ||
    !currrentUser.lastName
  )
    throw new Error("Missing user details");

  const {
    data: userInvitationStatusData,
    isLoading: isUserInvitationStatusLoading,
  } = $api.useQuery(
    "get",
    "/invitations/user/{id}",
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
        console.log(data);
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
        <Text style={{ fontSize: 20 }}>{user.firstName}</Text>
      </Pressable>

      <Portal>
        <Modal
          visible={showDetails}
          onDismiss={() => setShowDetails(false)}
          contentContainerStyle={{
            justifyContent: "flex-start",
            backgroundColor: theme.colors.surface,
            marginHorizontal: 30,
            minHeight: 100,
            borderRadius: 20,
            padding: 10,
          }}
        >
          {isUserInvitationStatusLoading ? (
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
                <Text>
                  {JSON.stringify(showDetails)}
                  {JSON.stringify(userInvitationStatusData)}
                </Text>

                {userInvitationStatusData ? (
                  userInvitationStatusData.toUser.id === currrentUser.id ? (
                    <>
                      <Button
                        mode="contained"
                        contentStyle={{ width: "100%", paddingVertical: 5 }}
                      >
                        Send invitation
                      </Button>
                      <Button
                        mode="contained"
                        contentStyle={{ width: "100%", paddingVertical: 5 }}
                      >
                        Send invitation
                      </Button>
                    </>
                  ) : (
                    <Button
                      mode="contained"
                      contentStyle={{ width: "100%", paddingVertical: 5 }}
                    >
                      Delete invitation
                    </Button>
                  )
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
