import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Keyboard, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StartupNavbar from "../components/startup-navbar";

type Props = NativeStackScreenProps<RootNativeStackParamList, "Login">;

export default function LoginScreen() {
  const theme = useTheme();
  const navigation = useNavigation<Props["navigation"]>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      }),
      onSubmit(values) {
        console.log(values);
      },
    });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StartupNavbar></StartupNavbar>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 20, padding: 15 }}>
          {!isKeyboardVisible ? (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/logo.png")}
                style={{ height: 100, width: 100 }}
                contentFit="contain"
              ></Image>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>Log in</Text>
              <Text style={{ fontSize: 15 }}>Welcome back</Text>
            </View>
          ) : null}

          <View style={{ gap: 20 }}>
            <TextInput
              mode="outlined"
              label="E-mail"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            ></TextInput>
            <TextInput
              mode="outlined"
              secureTextEntry
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            ></TextInput>
          </View>
        </View>

        <View
          style={{
            gap: 10,
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Button
            mode="contained"
            contentStyle={{ padding: 5 }}
            onPress={() => handleSubmit()}
          >
            Log in
          </Button>
          {!isKeyboardVisible ? (
            <>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.colors.outline,
                  }}
                ></View>
                <Text>Or</Text>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.colors.outline,
                  }}
                ></View>
              </View>
              <Button
                mode="outlined"
                contentStyle={{ padding: 5 }}
                onPress={() => navigation.navigate("Start")}
              >
                Register
              </Button>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}
