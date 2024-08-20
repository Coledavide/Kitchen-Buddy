import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useToast } from "react-native-toast-notifications";
import SearchBar from "../../components/SearchBar";
import context from "../../Context/context";
import Card from "../../components/Card";
import { colors, typography } from "../../../theme";
import { TabParamList, IIngredients } from "../../utils/types";

let { height, width } = Dimensions.get("screen");
export interface ExpireSoonIngredientsProps
  extends NativeStackScreenProps<TabParamList, "ExpireSoonIngredients"> {}

export default function ExpireSoonIngredients(
  props: ExpireSoonIngredientsProps
) {
  const toast = useToast();
  const { appState }: any = useContext(context);
  const { ingredients } = appState;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // Function to determine if an ingredient is expiring soon
  const isExpiringSoon = (ingredient: IIngredients) => {
    const today = new Date();
    const expirationDate = new Date(ingredient.expirationDate);
    // Example: Check if the ingredient is expiring within the next 7 days
    const expiringInDays =
      (expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return expiringInDays <= 7 && expiringInDays >= 0;
  };

  const filteredIngredients = ingredients
    .filter((ingredient: IIngredients) =>
      ingredient.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter(isExpiringSoon)
    .sort(
      (a: any, b: any) =>
        new Date(a.expirationDate).getTime() -
        new Date(b.expirationDate).getTime()
    );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchValue}
        containerStyle={{ marginTop: 10 }}
      />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <View>
          <FlatList
            data={filteredIngredients}
            renderItem={({ item }) => <Card item={item} />}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.containerStyle}
            ListEmptyComponent={() => (
              <View style={styles.emptyComponent}>
                <Text style={styles.emptyComponentTxt}>No Ingredients</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    height: height - 200,
  },
  emptyComponentTxt: {
    fontFamily: typography.medium,
    fontSize: 14,
    textAlign: "center",
    color: colors.gray600,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  containerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});
