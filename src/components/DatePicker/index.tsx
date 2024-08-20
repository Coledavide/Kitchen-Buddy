import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { colors, typography } from "../../../theme";

interface InputProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  show: boolean;
  onChange: (event: any, selectedDate: any) => void;
  mode: string;
  date: Date | null;
  placeholder: string;
  onPress: () => void;
}

export default function DateTimePickerComponent({
  label,
  containerStyle,
  labelStyle,
  onChange,
  show,
  mode,
  date,
  placeholder,
  onPress,
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {Platform.OS === "web" ? (
        <input type="date" style={styles.input} onChange={()=>onChange} />
      ) : (
        <TouchableOpacity
          style={styles.input}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.text,
              { color: date ? colors.black : colors.gray500 },
            ]}
          >
            {date ? moment(date).format("DD-MM-YYYY") : placeholder}
          </Text>
        </TouchableOpacity>
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ?? new Date()}
          mode="date"
          onChange={onChange}
        />
      )}
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
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: colors.gray200,
  },
  text: {
    color: colors.black,
    fontFamily: typography.semibold,
    fontSize: 16,
  },
});
