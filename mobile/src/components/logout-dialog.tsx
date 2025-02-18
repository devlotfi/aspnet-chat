import { useQueryClient } from "@tanstack/react-query";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { InMemoryStore } from "../api/in-memory-store";
import { Constants } from "../constants";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function LogOutDialog({ visible, setVisible }: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: theme.colors.surface }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Dialog.Title>Log out</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Are you sure you want to log out ?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}
            contentStyle={{ paddingHorizontal: 7, paddingVertical: 5 }}
            onPress={async () => {
              await SecureStore.deleteItemAsync(
                Constants.REFRESH_TOKEN_STORAGE_KEY
              );
              InMemoryStore.accessToken = undefined;
              queryClient.resetQueries({
                exact: false,
                queryKey: ["get", "/users/info"],
              });
              queryClient.resetQueries({
                exact: false,
                queryKey: ["INITIAL_AUTH"],
              });
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
