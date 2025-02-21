import axios from "axios";
import { Constants } from "../constants";
import { InMemoryStore } from "./in-memory-store";
import * as SecureStore from "expo-secure-store";
import { paths } from "../__generated__/schema";
import { handleAccessTokenResponse } from "./handle-access-token-response";

export async function getAccessToken(): Promise<string | undefined>
 {
  if (!InMemoryStore.accessToken || !InMemoryStore.expiresAt) {
    return;
  }

  const checkDate = new Date();
  checkDate.setMinutes(checkDate.getMinutes() + 5);
  if (checkDate >= InMemoryStore.expiresAt) {
    /* console.log("Auth Middleware / Access Token: ", "Renew"); */
    const refreshToken = await SecureStore.getItemAsync(
      Constants.REFRESH_TOKEN_STORAGE_KEY
    );
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await axios.get<
      paths["/auth/refresh"]["post"]["responses"]["200"]["content"]["application/json"]
    >("/auth/refresh", {
      withCredentials: true,
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      params: {
        refreshToken,
      },
    });

    handleAccessTokenResponse(data);
  }

  return InMemoryStore.accessToken;
}