import { components } from "../__generated__/schema";
import * as SecureStore from "expo-secure-store";
import { InMemoryStore } from "../api/in-memory-store";
import { Constants } from "../constants";

export async function handleAccessTokenResponse(
  data: components["schemas"]["AccessTokenResponse"]
) {
  InMemoryStore.accessToken = data.accessToken;
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + data.expiresIn);
  InMemoryStore.expiresAt = expirationDate;

  await SecureStore.setItemAsync(
    Constants.REFRESH_TOKEN_STORAGE_KEY,
    data.refreshToken
  );
}
