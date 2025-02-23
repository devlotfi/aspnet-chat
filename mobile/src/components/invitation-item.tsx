import { View } from "react-native";
import { components } from "../__generated__/schema";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import { $api } from "../api/openapi-client";
import { useQueryClient } from "@tanstack/react-query";
import { DateUtils } from "../utils/date-utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  invitation: components["schemas"]["InvitationDto"];
  mode: "SENDER" | "RECIEVER";
}

export default function InvitationItem({ invitation, mode }: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  if (!invitation.fromUser.firstName || !invitation.fromUser.lastName)
    throw new Error("Missing user details");

  const {
    mutate: mutateAcceptInvitation,
    isPending: isPendingAcceptInvitation,
  } = $api.useMutation("post", "/invitations/{id}", {
    onSuccess() {
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
      queryClient.resetQueries({
        exact: false,
        queryKey: ["get", "/conversations"],
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const {
    mutate: mutateDeleteInvitation,
    isPending: isPendingDeleteInvitation,
  } = $api.useMutation("delete", "/invitations/{id}", {
    onSuccess() {
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
        queryKey: ["get", "/users/link/{id}"],
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <View
      style={{
        borderWidth: 1,
        gap: 10,
        borderColor: theme.colors.outline,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Avatar.Text
          size={60}
          label={`${invitation.fromUser.firstName[0]}${invitation.fromUser.lastName[0]}`}
        ></Avatar.Text>
        <Text style={{ fontSize: 20 }}>
          {invitation.fromUser.firstName} {invitation.fromUser.lastName}
        </Text>
      </View>
      <Text style={{ marginLeft: 10 }}>
        Send at: {DateUtils.formatDateTime(new Date(invitation.timestamp))}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {mode === "RECIEVER" ? (
          <Button
            mode="outlined"
            contentStyle={{ paddingVertical: 5 }}
            style={{ flex: 1 }}
            loading={isPendingAcceptInvitation}
            onPress={() => {
              mutateAcceptInvitation({
                params: {
                  path: {
                    id: invitation.id,
                  },
                },
              });
            }}
            icon={({ color, size }) => (
              <FontAwesomeIcon
                icon={faUserPlus}
                color={color}
                size={size}
              ></FontAwesomeIcon>
            )}
          >
            Accept
          </Button>
        ) : null}
        <Button
          mode="outlined"
          textColor={theme.colors.errorContainer}
          contentStyle={{ paddingVertical: 5 }}
          style={{ flex: 1 }}
          loading={isPendingDeleteInvitation}
          onPress={() => {
            mutateDeleteInvitation({
              params: {
                path: {
                  id: invitation.id,
                },
              },
            });
          }}
          icon={({ color, size }) => (
            <FontAwesomeIcon
              icon={faTrash}
              color={color}
              size={size}
            ></FontAwesomeIcon>
          )}
        >
          Delete
        </Button>
      </View>
    </View>
  );
}
