import { components } from "./__generated__/schema";

export type RootNativeStackParamList = {
  Start: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Chat: {
    conversation: components["schemas"]["ConversationDto"];
  };
};

export type BottomTabsParamList = {
  Convsersations: undefined;
  Invitations: undefined;
  Search: undefined;
  Profile: undefined;
};
