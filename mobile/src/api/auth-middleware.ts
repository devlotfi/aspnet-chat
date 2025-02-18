import { Middleware } from "openapi-fetch";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { paths } from "../__generated__/schema";
import { Constants } from "../constants";
import { handleAccessTokenResponse } from "../utils/handle-access-token-response";
import { InMemoryStore } from "./in-memory-store";

export const authMiddelware: Middleware = {
  async onRequest({ request }) {
    if (!InMemoryStore.accessToken || !InMemoryStore.expiresAt) {
      console.log("Auth Middleware / Access Token: ", "No token");
      return;
    }

    const checkDate = new Date();
    checkDate.setMinutes(checkDate.getMinutes() + 5);
    if (checkDate >= InMemoryStore.expiresAt) {
      console.log("Auth Middleware / Access Token: ", "Renew");
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
    } else {
      console.log("Auth Middleware / Access Token: ", "Valid Token");
    }
    console.log(
      "Auth Middleware / Access Token Set: ",
      InMemoryStore.accessToken
    );

    request.headers.set("Authorization", `Bearer ${InMemoryStore.accessToken}`);
  },
};
