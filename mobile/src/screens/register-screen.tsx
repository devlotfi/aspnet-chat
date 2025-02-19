import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StartupNavbar from "../components/startup-navbar";
import { $api } from "../api/openapi-client";
import ValidatedTextInput from "../components/validated-text-input";
import { KeyboardContext } from "../context/keyboard-context";

type Props = NativeStackScreenProps<RootNativeStackParamList, "Register">;

export default function RegisterScreen() {
  const theme = useTheme();
  const navigation = useNavigation<Props["navigation"]>();
  const { isKeyboardVisible } = useContext(KeyboardContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(7).max(64).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
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
    "post",
    "/auth/register",
    {
      async onSuccess(data) {
        navigation.navigate("Login");
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
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  Register
                </Text>
                <Text style={{ fontSize: 15 }}>Welcome to the app</Text>
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
              <ValidatedTextInput
                name="confirmPassword"
                formik={formik}
                mode="outlined"
                outlineStyle={{
                  borderRadius: 10,
                }}
                secureTextEntry
                autoCapitalize="none"
                label="Confirm password"
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
              Register
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
                  onPress={() => navigation.navigate("Login")}
                >
                  Login
                </Button>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
