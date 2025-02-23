import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
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
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleDoubleLeft,
  faGear,
  faPaperPlane,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ValidatedTextInput from "../components/validated-text-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { $api, fetchClient } from "../api/openapi-client";
import ErrorView from "../components/error-view";
import InvitationItem from "../components/invitation-item";
import LoadingView from "../components/loading-view";
import NoContentView from "../components/no-content-view";
import MessageItem from "../components/message-item";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ChatContext } from "../context/chat-context";
import { SignalREvents } from "../signalr-events";
import DeleteConversationDialog from "../components/delete-conversation-dialog";

interface MessageListProps {
  id: string;
}

function MessageList({ id }: MessageListProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const atBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10; // Adding a small threshold
    setIsAtBottom(atBottom);
  };

  const fetchMessages = async (
    conversationId: string,
    lastMessageId?: string
  ) => {
    const { data } = await fetchClient.GET("/messages/{id}", {
      params: {
        path: {
          id: conversationId,
        },
        query: {
          lastMessageId,
        },
      },
    });
    return data!;
  };

  const {
    data,
    isLoading,
    isError,
    hasPreviousPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["MESSAGES", id],
    queryFn: async ({ pageParam }) =>
      await fetchMessages(id, pageParam === "" ? undefined : pageParam),
    initialPageParam: "",
    getPreviousPageParam: (firstPage) => {
      if (!firstPage.length) {
        return undefined;
      }
      console.log(firstPage[0]);

      return firstPage[0].id;
    },
    getNextPageParam: () => undefined,
    refetchOnWindowFocus: false,
    networkMode: "online",
  });

  useEffect(
    () => () => {
      queryClient.resetQueries({
        exact: false,
        queryKey: ["MESSAGES"],
      });
    },
    []
  );

  if (isLoading) return <LoadingView></LoadingView>;
  if (isError) return <ErrorView></ErrorView>;

  if (data && data.pages.length > 0) {
    return (
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        style={{ flex: 1, padding: 10 }}
        onContentSizeChange={() => {
          if (isAtBottom && scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({
              animated: true,
            });
          }
        }}
      >
        {hasPreviousPage ? (
          <Button
            mode="contained"
            loading={isFetchingPreviousPage}
            onPress={() => fetchPreviousPage()}
            style={{
              alignSelf: "center",
              borderWidth: 1,
              borderColor: theme.colors.outline,
            }}
            textColor={theme.colors.onBackground}
            buttonColor={theme.colors.surface}
            icon={({ color, size }) => (
              <FontAwesomeIcon
                icon={faPlus}
                color={color}
                size={size}
              ></FontAwesomeIcon>
            )}
          >
            More messages
          </Button>
        ) : null}

        <View>
          {data.pages.map((page, index) => (
            <View key={index}>
              {page.map((item) => (
                <MessageItem key={item.id} message={item}></MessageItem>
              ))}
            </View>
          ))}
        </View>
        <View style={{ height: 20 }}></View>
      </ScrollView>
    );
  } else {
    return <NoContentView></NoContentView>;
  }
}

type Props = NativeStackScreenProps<RootNativeStackParamList, "Chat">;

export default function ChatScreen({ route }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<Props["navigation"]>();
  const { conversation } = route.params;
  const { user } = useContext(AuthContext);
  const { connection } = useContext(ChatContext);
  const [deleteDialogVisible, setDeleteDialogVisible] =
    useState<boolean>(false);

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
    <>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View
          style={{
            backgroundColor: theme.colors.surface,
            padding: 12,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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

          <IconButton
            mode="contained"
            containerColor={theme.colors.background}
            size={20}
            icon={({ size }) => (
              <FontAwesomeIcon
                icon={faTrash}
                size={size}
                color={theme.colors.errorContainer}
              ></FontAwesomeIcon>
            )}
            onPress={() => setDeleteDialogVisible(true)}
          ></IconButton>
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
              <FontAwesomeIcon
                icon={faPaperPlane}
                size={size}
              ></FontAwesomeIcon>
            )}
            loading={isPending}
            onPress={() => formik.handleSubmit()}
          ></IconButton>
        </View>
      </View>

      <DeleteConversationDialog
        visible={deleteDialogVisible}
        setVisible={setDeleteDialogVisible}
        conversation={conversation}
      ></DeleteConversationDialog>
    </>
  );
}
