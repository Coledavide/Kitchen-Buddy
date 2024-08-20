import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { colors, typography } from "../../../theme";

interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onFilter?: () => void;
  showFilterIcon?: boolean;
}

export default function SearchBar({
  label,
  containerStyle,
  inputStyle,
  onFilter,
  showFilterIcon,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Feather name="search" size={20} color={colors.gray500} />
      <TextInput style={[styles.input, inputStyle]} {...props} />
      {showFilterIcon && (
        <TouchableOpacity style={styles.filterIcon} onPress={onFilter}>
          <Octicons name="filter" size={20} color={colors.gray500} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: colors.gray200,
    borderRadius: 10,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 10,
    color: colors.gray500,
    fontFamily: typography.medium,
    fontSize: 16,
  },
  input: {
    borderRadius: 10,
    height: 55,
    color: colors.black,
    fontFamily: typography.medium,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  filterIcon: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
