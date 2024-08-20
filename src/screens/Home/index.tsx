import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../components/Button";
// import { useToast } from "react-native-toast-notifications";
// import context from "../../Context/context";
import { StackParamList } from "../../utils/types";
import { colors, typography } from "../../../theme";

export interface HomeProps
  extends NativeStackScreenProps<StackParamList, "Home"> {}

export default function Home(props: HomeProps) {
  //   const toast = useToast();
  //   const { appState, getIngredients }: any = useContext(context);
  //   const { ingredients } = appState;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.heading}>Welcome to Kitchen Buddy</Text>
      </View>
      <Button
        onPress={() =>
          props.navigation.navigate("Tabs", { screen: "Ingredients" })
        }
        loader={<ActivityIndicator color={colors.white} size="small" />}
        title="List Ingredients"
        btnStyle={styles.btnStyle}
        textStyle={{ color: colors.primary }}
      />
      <Button
        onPress={() =>
          props.navigation.navigate("Tabs", { screen: "AddIngredients" })
        }
        loader={<ActivityIndicator color={colors.white} size="small" />}
        title="Add Ingredients"
        btnStyle={{ marginBottom: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: "flex-end",
  },
  btnStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 20,
  },
  heading: {
    fontFamily: typography.semibold,
    fontSize: 25,
    color: colors.primary,
    paddingHorizontal: 10,
  },
});
