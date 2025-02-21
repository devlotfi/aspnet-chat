import { Middleware } from "openapi-fetch";
import { InMemoryStore } from "./in-memory-store";
import { getAccessToken } from "./get-access-token";

export const authMiddelware: Middleware = {
  async onRequest({ request }) {
    const accessToken = await getAccessToken();
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  },
};
