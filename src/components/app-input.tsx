import { StyleSheet, Text, TextInput } from "react-native";

import { colors } from "../constants/colors";
import { theme } from "../constants/theme";

type AppInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "numbers-and-punctuation";
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  multiline = false,
  autoCapitalize = "sentences",
}: AppInputProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.body,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: theme.spacing.small,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: colors.text,
    minHeight: 44,
    backgroundColor: "#F7FBFB",
  },

  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
});
