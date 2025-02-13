import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  PaperProvider,
  Text,
} from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button mode="contained" icon="user" onPress={() => {}}>
          Lol
        </Button>
        <ActivityIndicator animating size={"large"}></ActivityIndicator>
        <StatusBar style="dark" translucent={false} backgroundColor="#fff" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
