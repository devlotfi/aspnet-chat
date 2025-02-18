import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { $api } from "../api/openapi-client";
import { AuthContext } from "../context/auth-context";
import ValidatedTextInput from "../components/validated-text-input";
import LogOutDialog from "../components/logout-dialog";
import { KeyboardContext } from "../context/keyboard-context";

export default function ProfileScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { isKeyboardVisible } = useContext(KeyboardContext);
  const [logoutDialogVisible, setLogoutDialogVisible] =
    useState<boolean>(false);

  if (!user || !user.firstName || !user.lastName) {
    throw new Error("Missing user data");
  }

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ gap: 20, padding: 15 }}>
            {!isKeyboardVisible ? (
              <View style={{ alignItems: "center", paddingVertical: 15 }}>
                <Avatar.Text
                  size={80}
                  label={`${user.firstName[0]}${user.lastName[0]}`}
                ></Avatar.Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    maxWidth: 250,
                    textAlign: "center",
                  }}
                >
                  User profile
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
              Edit profile
            </Button>

            {!isKeyboardVisible ? (
              <Button
                mode="outlined"
                textColor={theme.colors.errorContainer}
                style={{
                  borderColor: theme.colors.errorContainer,
                }}
                contentStyle={{ padding: 5 }}
                onPress={async () => {
                  setLogoutDialogVisible(true);
                }}
              >
                Log out
              </Button>
            ) : null}
            <LogOutDialog
              visible={logoutDialogVisible}
              setVisible={setLogoutDialogVisible}
            ></LogOutDialog>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
