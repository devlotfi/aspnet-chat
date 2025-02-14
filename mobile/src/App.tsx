import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  PaperProvider,
  Text,
  useTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { RootNativeStackParamList } from "./navigation-types";
import StartScreen from "./screens/start-screen";
import LoginScreen from "./screens/login-screen";
import { darkTheme, lightTheme } from "./themes";

const RootNativeStack = createNativeStackNavigator<RootNativeStackParamList>();

function RootNativeStackComponent() {
  return (
    <RootNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootNativeStack.Screen
        name="Start"
        component={StartScreen}
      ></RootNativeStack.Screen>
      <RootNativeStack.Screen
        name="Login"
        component={LoginScreen}
      ></RootNativeStack.Screen>
    </RootNativeStack.Navigator>
  );
}

function App() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <NavigationContainer>
          <RootNativeStackComponent></RootNativeStackComponent>
        </NavigationContainer>
      </View>
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.background}
        style={colorScheme === "light" ? "dark" : "light"}
      ></StatusBar>
    </>
  );
}

export default function Providers() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
      <App></App>
    </PaperProvider>
  );
}
