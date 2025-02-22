import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { useNavigation } from "@react-navigation/native";
import { getOtherUserInfo } from "../utils/get-other-user-info";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleDoubleLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import ValidatedTextInput from "../components/validated-text-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { $api } from "../api/openapi-client";
import ErrorView from "../components/error-view";
import InvitationItem from "../components/invitation-item";
import LoadingView from "../components/loading-view";
import NoContentView from "../components/no-content-view";
import MessageItem from "../components/message-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignalRContext } from "../context/signalr-context";
import { SignalREvents } from "../signalr-events";

interface MessageListProps {
  id: string;
}

function MessageList({ id }: MessageListProps) {
  const { data, isLoading, isError } = $api.useQuery("get", "/messages/{id}", {
    params: {
      path: {
        id,
      },
    },
  });

  if (isLoading) return <LoadingView></LoadingView>;
  if (isError) return <ErrorView></ErrorView>;

  if (data && data.length > 0) {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {data.map((item) => (
          <MessageItem key={item.id} message={item}></MessageItem>
        ))}
      </ScrollView>
    );
  } else {
    return <NoContentView></NoContentView>;
  }
}

type Props = NativeStackScreenProps<RootNativeStackParamList, "Chat">;

export default function ChatScreen({ route }: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigation = useNavigation<Props["navigation"]>();
  const { conversation } = route.params;
  const { user } = useContext(AuthContext);
  const { connection } = useContext(SignalRContext);

  if (!user) throw new Error("Missing user details");

  const otherUser = getOtherUserInfo(conversation, user);

  const { mutate, isPending } = useMutation({
    mutationFn: async (messageText: string) => {
      await connection.invoke(
        SignalREvents.SendMessage,
        conversation.id,
        messageText
      );
    },
    onSuccess() {
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: yup.object({
      message: yup.string().required(),
    }),
    onSubmit(values) {
      console.log(values);
      mutate(values.message);
    },
  });

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View
        style={{
          backgroundColor: theme.colors.surface,
          padding: 12,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <IconButton
          mode="contained"
          containerColor={theme.colors.background}
          size={20}
          icon={({ size }) => (
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              size={size}
              color={theme.colors.onBackground}
            ></FontAwesomeIcon>
          )}
          onPress={() => navigation.goBack()}
        ></IconButton>
        <Avatar.Text
          size={40}
          label={`${otherUser.firstName[0]}${otherUser.lastName[0]}`}
        ></Avatar.Text>
        <Text style={{ fontSize: 16 }}>
          {otherUser.firstName} {otherUser.lastName}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <MessageList id={conversation.id}></MessageList>
      </View>

      <View
        style={{
          padding: 12,
          paddingVertical: 5,
          backgroundColor: theme.colors.surface,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            value={formik.values.message}
            onChangeText={formik.handleChange("message")}
            onBlur={formik.handleBlur("message")}
            mode="outlined"
            outlineStyle={{
              borderRadius: 15,
            }}
            autoCapitalize="none"
            label="Search"
          ></TextInput>
        </View>
        <IconButton
          mode="contained"
          style={{ borderRadius: 10, height: 48, width: 48, marginTop: 10 }}
          containerColor={theme.colors.primary}
          iconColor={theme.colors.onPrimary}
          icon={({ size }) => (
            <FontAwesomeIcon icon={faPaperPlane} size={size}></FontAwesomeIcon>
          )}
          loading={isPending}
          onPress={() => formik.handleSubmit()}
        ></IconButton>
      </View>
    </View>
  );
}
