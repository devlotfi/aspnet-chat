import { FormikProps } from "formik";
import { View, ViewProps } from "react-native";
import {
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  useTheme,
} from "react-native-paper";

interface Props extends TextInputProps {
  name: string;
  formik: FormikProps<any>;
  wrapperProps?: ViewProps;
  errorMessageProps?: TextProps<any>;
}

export default function ValidatedTextInput({
  name,
  formik,
  wrapperProps = {},
  errorMessageProps = {} as any,
  ...props
}: Props) {
  const theme = useTheme();

  return (
    <View style={wrapperProps}>
      <TextInput
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        {...props}
      ></TextInput>
      {formik.errors[name] && formik.touched[name] ? (
        <Text
          style={{
            color: theme.colors.errorContainer,
            padding: 5,
          }}
          {...errorMessageProps}
        >
          {formik.errors[name] as string}
        </Text>
      ) : null}
    </View>
  );
}
