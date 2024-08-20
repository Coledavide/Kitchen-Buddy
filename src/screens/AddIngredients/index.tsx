import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import uuid from "react-native-uuid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import DropdownComponent from "../../components/Dropdown";
import DateTimePickerComponent from "../../components/DatePicker";
import { useToast } from "react-native-toast-notifications";
import context from "../../Context/context";
import {
  ingredientsCategories,
  ingredientsLocation,
  confectionTypes,
  matureityTypes,
} from "../../utils/data";
import AsyncStorageService from "../../utils/AsyncStorageService";
import { TabParamList } from "../../utils/types";
import { colors, typography } from "../../../theme";
import moment from "moment";

export interface AddIngredientsProps
  extends NativeStackScreenProps<TabParamList, "AddIngredients"> {}

export default function AddIngredients(props: AddIngredientsProps) {
  const toast = useToast();
  const { appState, getIngredients }: any = useContext(context);
  const { ingredients } = appState;
  const [name, setName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [confectionType, setConfectionType] = useState<string>("");
  const [maturityStatus, setMaturityStatus] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [opened, setOpened] = useState<string>("Yes");

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const handleAddData = async () => {
    try {
      if (!name || !category || !location || !confectionType || !date) {
        toast.show("Fill all the fields", {
          type: "danger",
        });
        return;
      }
      if (confectionType === "Fresh" && !maturityStatus) {
        toast.show("Select maturity status", {
          type: "danger",
        });
        return;
      }
      setLoading(true);
      const data = {
        name,
        category,
        location,
        confectionType,
        expirationDate: date,
        id: uuid.v4(),
        createdAt: moment(),
        brandName,
        maturityStatus: confectionType === "Fresh" ? maturityStatus : "",
        opened,
      };
      ingredients.push(data);
      await AsyncStorageService.setItem("Ingredients", ingredients);
      toast.show("Successfully added", {
        type: "success",
      });
      setDate(null);
      setName("");
      setCategory("");
      setLocation("");
      setConfectionType("");
      getIngredients();
      setMaturityStatus("");
      setBrandName("");
      setOpened("Yes");
    } catch (error: any) {
      toast.show(error.message || "Something went wrong", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };
  // console.log(appState?.productName);
  // Update name when appState.productName changes
  useEffect(() => {
    if (appState.productName) {
      setName(appState.productName);
    }
  }, [appState.productName]);
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     setName(props?.route?.params?.name ?? "");
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <Button
          onPress={() => props.navigation.navigate("BarCodeScanner")}
          btnStyle={styles.scanBtnStyle}
        >
          <Ionicons name="barcode-outline" size={24} color={colors.black} />
        </Button>
        <Input
          label="Name"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Brand Name"
          placeholder="Enter brand name"
          value={brandName}
          onChangeText={setBrandName}
        />
        <DropdownComponent
          value={category}
          onChange={(value) => setCategory(value)}
          data={ingredientsCategories}
          placeholder="Select Category"
          label="Category"
        />
        <DropdownComponent
          value={location}
          onChange={(value) => setLocation(value)}
          data={ingredientsLocation}
          placeholder="Select location"
          label="Location"
        />
        <DropdownComponent
          value={confectionType}
          onChange={(value) => setConfectionType(value)}
          data={confectionTypes}
          placeholder="Select confection type"
          label="Confection type"
        />
        {confectionType === "Fresh" && (
          <DropdownComponent
            value={maturityStatus}
            onChange={(value) => setMaturityStatus(value)}
            data={matureityTypes}
            placeholder="Select maturity status"
            label="Ripeness or Maturity"
          />
        )}

        <DateTimePickerComponent
          show={show}
          onChange={onChange}
          mode="datetime"
          date={date}
          placeholder="Select Date"
          onPress={() => setShow(true)}
          label="Expiration Date"
        />
        <View style={styles.row}>
          <Text style={styles.label}>Is the ingredient open?</Text>
          <View style={styles.radioBtns}>
            <TouchableOpacity
              style={styles.radionBtnMain}
              onPress={() => setOpened("Yes")}
              activeOpacity={0.8}
            >
              <View style={styles.radioBtn}>
                {opened === "Yes" && <View style={styles.activeRadioBtn} />}
              </View>
              <Text style={styles.radioBtnLabel}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radionBtnMain, { marginLeft: 20 }]}
              onPress={() => setOpened("No")}
              activeOpacity={0.8}
            >
              <View style={styles.radioBtn}>
                {opened === "No" && <View style={styles.activeRadioBtn} />}
              </View>
              <Text style={styles.radioBtnLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          onPress={() => handleAddData()}
          loading={loading}
          loader={<ActivityIndicator color={colors.white} size="small" />}
          title="Add"
          btnStyle={{ marginBottom: 10, marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scanBtnStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    width: 70,
    alignSelf: "flex-end",
    marginRight: 20,
    height: 45,
    borderColor: colors.gray400,
    // borderRadius: 10,
  },
  label: {
    marginBottom: 10,
    color: colors.gray500,
    fontFamily: typography.medium,
    fontSize: 16,
  },
  row: {
    paddingHorizontal: 20,
  },
  radioBtns: {
    flexDirection: "row",
    alignItems: "center",
  },
  radionBtnMain: {
    flexDirection: "row",
    // marginLeft: 10,
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  activeRadioBtn: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  radioBtnLabel: {
    color: colors.blackLight,
    fontFamily: typography.semibold,
    fontSize: 16,
    marginLeft: 10,
  },
});
