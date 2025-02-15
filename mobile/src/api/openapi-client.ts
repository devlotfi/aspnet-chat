import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "../__generated__/schema";
import { authMiddelware } from "./auth-middleware";

export const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
});
fetchClient.use(authMiddelware);
export const $api = createClient(fetchClient);
