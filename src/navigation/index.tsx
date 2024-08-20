import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BarCodeScanner from "../screens/BarCodeScanner";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AddIngredients from "../screens/AddIngredients";
import Ingredients from "../screens/Ingredients";
import ExpireSoonIngredients from "../screens/ExpireSoonIngredients";
import EditIngredients from "../screens/EditIngredients";
import Home from "../screens/Home";
import { colors, typography } from "../../theme";
import { StackParamList, TabParamList } from "../utils/types";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "AddIngredients") {
            iconName = focused ? (
              <MaterialIcons name="post-add" size={24} color={colors.primary} />
            ) : (
              <MaterialIcons name="post-add" size={24} color={colors.gray500} />
            );
          } else if (route.name === "Ingredients") {
            iconName = focused ? (
              <Ionicons
                name="list-circle-outline"
                size={24}
                color={colors.primary}
              />
            ) : (
              <Ionicons
                name="list-circle-outline"
                size={24}
                color={colors.gray500}
              />
            );
          } else if (route.name === "ExpireSoonIngredients") {
            iconName = focused ? (
              <MaterialCommunityIcons
                name="calendar-alert"
                size={24}
                color={colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="calendar-alert"
                size={24}
                color={colors.gray500}
              />
            );
          }
          return iconName;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray500,
        tabBarLabelStyle: { fontFamily: typography.medium },
        headerTitleStyle: { fontFamily: typography.semibold },
      })}
    >
      <Tab.Screen
        name="AddIngredients"
        options={{ tabBarLabel: "Add", headerTitle: "Add Ingredient" }}
        component={AddIngredients}
      />
      <Tab.Screen
        name="Ingredients"
        options={{ tabBarLabel: "Ingredients", headerTitle: "Ingredients" }}
        component={Ingredients}
      />
      <Tab.Screen
        name="ExpireSoonIngredients"
        options={{ tabBarLabel: "Expire Soon", headerTitle: "Ingredients" }}
        component={ExpireSoonIngredients}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontFamily: typography.semibold },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditIngredients"
          component={EditIngredients}
          options={{ headerTitle: "Edit Ingredient" }}
        />
        <Stack.Screen
          name="BarCodeScanner"
          component={BarCodeScanner}
          options={{ headerTitle: "Bar Code Scanner" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
