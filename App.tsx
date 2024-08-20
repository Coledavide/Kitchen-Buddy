import React, { useEffect } from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from "react-native";
import State from "./src/Context/state";
import { ToastProvider } from "react-native-toast-notifications";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./src/navigation";
import { colors, typography } from "./theme";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    "Urbanist-Regular": require("./assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Light": require("./assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("./assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-SemiBold": require("./assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Bold": require("./assets/fonts/Urbanist-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <ToastProvider
      placement="top"
      duration={1000}
      animationType="slide-in"
      successColor={colors.white}
      dangerColor={colors.white}
      warningColor="orange"
      normalColor="gray"
      textStyle={{
        fontFamily: typography.semibold,
        fontSize: 15,
        width: "100%",
        color: colors.blackLight,
        marginLeft: 5,
      }}
      successIcon={
        <Feather name="check-circle" size={20} color={colors.primary} />
      }
      dangerIcon={<MaterialIcons name="error-outline" size={24} color="red" />}
    >
      <State>
        <SafeAreaView style={styles.container}>
          <Navigation />
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.white}
            showHideTransition="fade"
            animated
          />
        </SafeAreaView>
      </State>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
