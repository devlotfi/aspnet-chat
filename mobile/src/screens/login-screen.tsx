import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StartupNavbar from "../components/startup-navbar";
import { useQueryClient } from "@tanstack/react-query";
import { $api } from "../api/openapi-client";
import ValidatedTextInput from "../components/validated-text-input";
import { KeyboardContext } from "../context/keyboard-context";
import { handleAccessTokenResponse } from "../api/handle-access-token-response";

type Props = NativeStackScreenProps<RootNativeStackParamList, "Login">;

export default function LoginScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigation = useNavigation<Props["navigation"]>();
  const { isKeyboardVisible } = useContext(KeyboardContext);

  const formik = useFormik({
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
      mutate({
        body: {
          ...values,
        },
        params: {
          query: {
            useCookies: false,
            useSessionCookies: false,
          },
        },
      });
    },
  });

  const { mutate, isPending, isError } = $api.useMutation(
    "post",
    "/auth/login",
    {
      async onSuccess(data) {
        console.log(data);
        handleAccessTokenResponse(data);
        queryClient.resetQueries({
          exact: false,
          queryKey: ["INITIAL_AUTH"],
        });
      },
    }
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <ValidatedTextInput
                name="email"
                formik={formik}
                mode="outlined"
                outlineStyle={{
                  borderRadius: 10,
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                label="E-mail"
              ></ValidatedTextInput>
              <ValidatedTextInput
                name="password"
                formik={formik}
                mode="outlined"
                outlineStyle={{
                  borderRadius: 10,
                }}
                secureTextEntry
                autoCapitalize="none"
                label="Password"
              ></ValidatedTextInput>

              {isError ? (
                <Card
                  contentStyle={{
                    backgroundColor: theme.colors.errorContainer,
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Login error</Text>
                </Card>
              ) : null}
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
              onPress={() => formik.handleSubmit()}
              loading={isPending}
            >
              Log in
            </Button>
            {!isKeyboardVisible ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
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
                  onPress={() => navigation.navigate("Register")}
                >
                  Register
                </Button>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
