import { useQueryClient } from "@tanstack/react-query";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { $api } from "../api/openapi-client";
import { components } from "../__generated__/schema";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  conversation: components["schemas"]["ConversationDto"];
}

type NavigationProps = NativeStackScreenProps<RootNativeStackParamList, "Chat">;

export default function DeleteConversationDialog({
  visible,
  setVisible,
  conversation,
}: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProps["navigation"]>();

  const { mutate, isPending } = $api.useMutation(
    "delete",
    "/conversations/{id}",
    {
      onSuccess() {
        queryClient.resetQueries({
          exact: false,
          queryKey: ["get", "/conversations"],
        });
        setVisible(false);
        navigation.navigate("Home");
      },
    }
  );

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: theme.colors.surface }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Dialog.Title>Delete conversation</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Are you sure you want to delete this conversation ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}
            contentStyle={{ paddingHorizontal: 7, paddingVertical: 5 }}
            onPress={() =>
              mutate({
                params: {
                  path: {
                    id: conversation.id,
                  },
                },
              })
            }
            loading={isPending}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
