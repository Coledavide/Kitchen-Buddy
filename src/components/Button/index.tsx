import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, typography } from "../../../theme";

interface BtnProps {
  onPress: () => void;
  title?: string;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  loading?: boolean;
  loader?: React.ReactNode;
}

export default function Button({
  onPress,
  title,
  children,
  btnStyle,
  textStyle,
  loading = false,
  loader,
}: BtnProps) {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[styles.btn, btnStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {loading ? (
        loader
      ) : children ? (
        children
      ) : (
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
  },
  textStyle: {
    color: colors.white,
    fontSize: 16,
    fontFamily: typography.medium,
  },
});
