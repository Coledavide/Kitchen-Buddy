import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors, typography } from "../../../theme";
import { IDropdownData } from "../../utils/types";

interface DropdownComponentProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  dropdownStyle?: TextStyle;
  data: IDropdownData[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function DropdownComponent({
  label,
  containerStyle,
  labelStyle,
  dropdownStyle,
  data,
  value,
  onChange,
  placeholder,
}: DropdownComponentProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          onChange(item.value);
        }}
      />
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
  dropdown: {
    // borderWidth: 1,
    // borderColor: colors.gray400,
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 10,
    backgroundColor: colors.gray200,
  },
  placeholderStyle: {
    color: colors.gray500,
    fontFamily: typography.semibold,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: typography.semibold,
    color: colors.black,
  },
  itemTextStyle: {
    fontSize: 16,
    fontFamily: typography.semibold,
    color: colors.black,
  },
});
