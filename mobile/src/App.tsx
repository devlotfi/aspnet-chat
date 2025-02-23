import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { BottomNavigation, PaperProvider, useTheme } from "react-native-paper";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { RootNativeStackParamList } from "./navigation-types";
import StartScreen from "./screens/start-screen";
import LoginScreen from "./screens/login-screen";
import { darkTheme, lightTheme } from "./themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext, AuthProvider } from "./context/auth-context";
import StatusBarLayout from "./layout/status-bar-layout";
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faComments,
  faSearch,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ConvsersationsScreen from "./screens/conversations-screen";
import MainNavbar from "./components/main-navbar";
import InvitationsScreen from "./screens/invitations-screen";
import SearchScreen from "./screens/search-screen";
import ProfileScreen from "./screens/profile-screen";
import RegisterScreen from "./screens/register-screen";
import { KeyboardProvider } from "./context/keyboard-context";
import { ChatProvider } from "./context/chat-context";
import ChatScreen from "./screens/chat-screen";

const BottomTabs = createBottomTabNavigator();

function BottomTabsComponent() {
  const theme = useTheme();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        header: () => {
          return <MainNavbar></MainNavbar>;
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={{
            backgroundColor: theme.colors.surface,
          }}
          activeIndicatorStyle={{
            backgroundColor: theme.colors.primary,
          }}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 22 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return options.tabBarLabel as string;
          }}
        />
      )}
    >
      <BottomTabs.Screen
        name="Convsersations"
        component={ConvsersationsScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesomeIcon icon={faComments} size={size} color={color} />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Invitations"
        component={InvitationsScreen}
        options={{
          tabBarLabel: "Invitations",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesomeIcon icon={faUserPlus} size={size} color={color} />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesomeIcon icon={faSearch} size={size} color={color} />
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesomeIcon icon={faUser} size={size} color={color} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

const RootNativeStack = createNativeStackNavigator<RootNativeStackParamList>();

function RootNativeStackComponent() {
  const { user } = useContext(AuthContext);

  return (
    <RootNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <RootNativeStack.Screen
            name="Home"
            component={BottomTabsComponent}
          ></RootNativeStack.Screen>
          <RootNativeStack.Screen
            name="Chat"
            component={ChatScreen}
          ></RootNativeStack.Screen>
        </>
      ) : (
        <>
          <RootNativeStack.Screen
            name="Start"
            component={StartScreen}
          ></RootNativeStack.Screen>
          <RootNativeStack.Screen
            name="Register"
            component={RegisterScreen}
          ></RootNativeStack.Screen>
          <RootNativeStack.Screen
            name="Login"
            component={LoginScreen}
          ></RootNativeStack.Screen>
        </>
      )}
    </RootNativeStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootNativeStackComponent></RootNativeStackComponent>
    </NavigationContainer>
  );
}

const queryClient = new QueryClient();

export default function Providers() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
        <KeyboardProvider>
          <StatusBarLayout>
            <AuthProvider>
              <ChatProvider>
                <App></App>
              </ChatProvider>
            </AuthProvider>
          </StatusBarLayout>
        </KeyboardProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
