import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StartupNavbar from "../components/startup-navbar";
import { useQueryClient } from "@tanstack/react-query";
import { $api } from "../api/openapi-client";
import ValidatedTextInput from "../components/validated-text-input";

export default function MissingNamesScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().min(3).max(64).required(),
      lastName: yup.string().min(3).max(64).required(),
    }),
    onSubmit(values) {
      console.log(values);
      mutate({
        body: {
          ...values,
        },
      });
    },
  });

  const { mutate, isPending, isError } = $api.useMutation(
    "put",
    "/users/info",
    {
      async onSuccess(data) {
        console.log(data);
        queryClient.resetQueries({
          exact: false,
          queryKey: ["INITIAL_AUTH"],
        });
      },
    }
  );

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
                  source={require("../assets/complete-profile.png")}
                  style={{ height: 150, width: 150 }}
                  contentFit="contain"
                ></Image>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    maxWidth: 250,
                    textAlign: "center",
                  }}
                >
                  Complete your profile
                </Text>
              </View>
            ) : null}

            <View style={{ gap: 20 }}>
              <ValidatedTextInput
                name="firstName"
                formik={formik}
                mode="outlined"
                outlineStyle={{
                  borderRadius: 10,
                }}
                label="First name"
              ></ValidatedTextInput>
              <ValidatedTextInput
                name="lastName"
                formik={formik}
                mode="outlined"
                outlineStyle={{
                  borderRadius: 10,
                }}
                label="Last name"
              ></ValidatedTextInput>

              {isError ? (
                <Card
                  contentStyle={{
                    backgroundColor: theme.colors.errorContainer,
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Server error</Text>
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
              Complete profile
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
