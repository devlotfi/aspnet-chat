import { FormikProps, useFormik } from "formik";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ActivityIndicator,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import ValidatedTextInput from "../components/validated-text-input";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { $api } from "../api/openapi-client";
import UserItem from "../components/user-item";
import { useContext } from "react";
import { KeyboardContext } from "../context/keyboard-context";
import { Image } from "expo-image";
import NoContentView from "../components/no-content-view";
import ErrorView from "../components/error-view";
import LoadingView from "../components/loading-view";

interface UserListProps {
  formik: FormikProps<{ search: string; page: number }>;
}

function UserList({ formik }: UserListProps) {
  const theme = useTheme();
  const { isKeyboardVisible } = useContext(KeyboardContext);

  const { data, isLoading, isError } = $api.useQuery("get", "/users", {
    params: {
      query: {
        search: formik.values.search,
        page: formik.values.page,
      },
    },
  });

  if (isLoading) return <LoadingView></LoadingView>;
  if (isError) return <ErrorView></ErrorView>;

  if (data && data.items.length > 0) {
    return (
      <>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {data.items.map((item) =>
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => (
              <UserItem key={item.id + e} user={item}></UserItem>
            ))
          )}
        </ScrollView>
        {!isKeyboardVisible && data && !isLoading && data.items.length > 0 ? (
          <View
            style={{
              backgroundColor: theme.colors.surface,
              padding: 10,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              mode="contained"
              containerColor={theme.colors.background}
              iconColor={theme.colors.onBackground}
              style={{ borderRadius: 10 }}
              icon={({ color }) => (
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  color={color}
                ></FontAwesomeIcon>
              )}
              onPress={() => {
                if (formik.values.page > 1) {
                  formik.setFieldValue("page", formik.values.page - 1);
                }
              }}
            ></IconButton>
            <Text>
              Page: {formik.values.page} / {data.pages}
            </Text>
            <IconButton
              mode="contained"
              containerColor={theme.colors.background}
              iconColor={theme.colors.onBackground}
              style={{ borderRadius: 10 }}
              icon={({ color }) => (
                <FontAwesomeIcon
                  icon={faAngleRight}
                  color={color}
                ></FontAwesomeIcon>
              )}
              onPress={() => {
                if (formik.values.page < data.pages) {
                  formik.setFieldValue("page", formik.values.page + 1);
                }
              }}
            ></IconButton>
          </View>
        ) : null}
      </>
    );
  } else {
    return <NoContentView></NoContentView>;
  }
}

export default function SearchScreen() {
  const theme = useTheme();
  const { isKeyboardVisible } = useContext(KeyboardContext);

  const formik = useFormik({
    initialValues: {
      search: "",
      page: 1,
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 12,
          backgroundColor: theme.colors.surface,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <ValidatedTextInput
          name="search"
          formik={formik}
          mode="outlined"
          outlineStyle={{
            borderRadius: 15,
          }}
          autoCapitalize="none"
          label="Search"
        ></ValidatedTextInput>
      </View>

      <UserList formik={formik}></UserList>
    </View>
  );
}
