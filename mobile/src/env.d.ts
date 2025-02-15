declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      OPENAPI_URL: string;
    }
  }
}

export {};
