import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useToast } from "react-native-toast-notifications";
import context from "../../Context/context";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";
import { colors, typography } from "../../../theme";
import { IIngredients, TabParamList } from "../../utils/types";
import Button from "../../components/Button";
import DropdownComponent from "../../components/Dropdown";
import {
  ingredientsCategories,
  ingredientsLocation,
  confectionTypes,
} from "../../utils/data";

let { height, width } = Dimensions.get("screen");

export interface IngredientsProps
  extends NativeStackScreenProps<TabParamList, "Ingredients"> {}

export default function Ingredients(props: IngredientsProps) {
  const toast = useToast();
  const { appState, dispatch, getIngredients }: any = useContext(context);
  const { ingredients, filterIngredients } = appState;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [confectionType, setConfectionType] = useState<string>("");

  const filteredIngredients = filterIngredients.filter(
    (ingredient: IIngredients) =>
      ingredient.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const applyFilter = () => {
    const filtered = ingredients.filter((ingredient: IIngredients) => {
      return (
        (category ? ingredient.category === category : true) &&
        (location ? ingredient.location === location : true) &&
        (confectionType ? ingredient.confectionType === confectionType : true)
      );
    });
    dispatch({ type: "filterIngredients", payload: filtered });
    setModalVisible(false);
  };
  const cleaFilter = async () => {
    dispatch({ type: "filterIngredients", payload: ingredients });
    // await getIngredients();
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchValue}
        onFilter={() => setModalVisible(true)}
        showFilterIcon={true}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Filter</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color={colors.gray500} />
              </TouchableOpacity>
            </View>
            <DropdownComponent
              value={category}
              onChange={(value) => setCategory(value)}
              data={ingredientsCategories}
              placeholder="Select Category"
              // label="Category"
              containerStyle={styles.dropdownContainer}
            />
            <DropdownComponent
              value={location}
              onChange={(value) => setLocation(value)}
              data={ingredientsLocation}
              placeholder="Select location"
              // label="Location"
              containerStyle={styles.dropdownContainer}
            />
            <DropdownComponent
              value={confectionType}
              onChange={(value) => setConfectionType(value)}
              data={confectionTypes}
              placeholder="Select confection type"
              // label="Confection type"
              containerStyle={styles.dropdownContainer}
            />
            <View style={styles.btnsRow}>
              <Button
                title="Clear"
                onPress={() => cleaFilter()}
                btnStyle={styles.cancelBtnStyle}
                textStyle={styles.cancelBtnTextStyle}
              />
              <Button
                title="Apply"
                onPress={() => applyFilter()}
                btnStyle={styles.applyBtnStyle}
                textStyle={styles.applyBtnTextStyle}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeading: {
    color: colors.black,
    fontFamily: typography.semibold,
    fontSize: 18,
  },
  btnsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  applyBtnStyle: {
    width: "48%",
    height: 45,
    borderRadius: 10,
  },
  cancelBtnStyle: {
    width: "48%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 45,
    borderRadius: 10,
  },
  cancelBtnTextStyle: {
    color: colors.primary,
    fontSize: 14,
  },
  applyBtnTextStyle: {
    fontSize: 14,
  },
  dropdownContainer: {
    marginHorizontal: 0,
    marginTop: 20,
    marginBottom: 0,
  },
});
