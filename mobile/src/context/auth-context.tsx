import { createContext, PropsWithChildren } from "react";
import { components } from "../__generated__/schema";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Constants } from "../constants";
import { handleAccessTokenResponse } from "../utils/handle-access-token-response";
import { $api } from "../api/openapi-client";
import MissingNamesScreen from "../screens/missing-names-screen";

interface AuthContextType {
  user: components["schemas"]["UserDto"] | null;
}

const initialValue: AuthContextType = {
  user: null,
};

export const AuthContext = createContext(initialValue);

export function AuthProvider({ children }: PropsWithChildren) {
  const theme = useTheme();

  const { mutateAsync } = $api.useMutation("post", "/auth/refresh", {
    async onSuccess(data) {
      await handleAccessTokenResponse(data);
    },
  });
  const { data: refreshData, isLoading: isLoadingRefresh } = useQuery({
    queryKey: ["INITIAL_AUTH"],
    queryFn: async () => {
      const refreshToken = await SecureStore.getItemAsync(
        Constants.REFRESH_TOKEN_STORAGE_KEY
      );
      console.log("Auth Context / Refresh Token: ", refreshToken);
      if (!refreshToken) return null;

      const data = await mutateAsync({
        body: {
          refreshToken: refreshToken,
        },
      });
      if (data) return data;
      return null;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(refreshData);

  const { data: userData, isLoading: isLoadingUser } = $api.useQuery(
    "get",
    "/users/info",
    {},
    {
      enabled: refreshData !== undefined && refreshData !== null,
      refetchOnWindowFocus: false,
      retry: false,
      networkMode: "online",
      select(data) {
        console.log(data);
        return data;
      },
    }
  );

  if (isLoadingRefresh || isLoadingUser) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    );
  }

  if (
    userData &&
    (userData.firstName === null || !userData.lastName === null)
  ) {
    return <MissingNamesScreen></MissingNamesScreen>;
  }

  return (
    <AuthContext.Provider
      value={{
        user: userData ? userData : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
