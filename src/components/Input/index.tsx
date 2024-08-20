import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { colors, typography } from "../../../theme";

interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

export default function Input({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput style={[styles.input, inputStyle]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
    color: colors.gray500,
    fontFamily: typography.medium,
    fontSize: 16,
  },
  input: {
    // borderWidth: 1,
    // borderColor: colors.gray400,
    borderRadius: 10,
    height: 55,
    color: colors.black,
    fontFamily: typography.semibold,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: colors.gray200,
  },
});
