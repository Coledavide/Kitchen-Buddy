import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useToast } from "react-native-toast-notifications";
import DateTimePickerComponent from "../../components/DatePicker";
import AsyncStorageService from "../../utils/AsyncStorageService";
import DropdownComponent from "../../components/Dropdown";
import { StackParamList } from "../../utils/types";
import context from "../../Context/context";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { colors, typography } from "../../../theme";
import {
  ingredientsCategories,
  ingredientsLocation,
  confectionTypes,
  matureityTypes,
} from "../../utils/data";

export interface EditIngredientsProps
  extends NativeStackScreenProps<StackParamList, "EditIngredients"> {}

export default function EditIngredients(props: any) {
  const toast = useToast();
  const { appState, getIngredients }: any = useContext(context);
  const { ingredientId } = props.route.params;
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

  useEffect(() => {
    // Find the ingredient by its ID and set the form values
    const ingredient = ingredients.find(
      (item: any) => item.id === ingredientId
    );
    if (ingredient) {
      setName(ingredient.name);
      setBrandName(ingredient.brandName);
      setCategory(ingredient.category);
      setLocation(ingredient.location);
      setConfectionType(ingredient.confectionType);
      setMaturityStatus(ingredient.maturityStatus);
      setDate(new Date(ingredient.expirationDate));
      setOpened(ingredient.opened);
    }
  }, [ingredientId, ingredients]);

  const handleUpdateData = async () => {
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

      // Find the index of the ingredient to update
      const index = ingredients.findIndex(
        (item: any) => item.id === ingredientId
      );

      if (index !== -1) {
        // Update the ingredient details
        ingredients[index] = {
          ...ingredients[index],
          name,
          category,
          location,
          confectionType,
          expirationDate: date,
          brandName,
          maturityStatus: confectionType === "Fresh" ? maturityStatus : "",
          opened,
        };

        // Save the updated ingredients list to AsyncStorage
        await AsyncStorageService.setItem("Ingredients", ingredients);
        getIngredients();
        toast.show("Successfully updated", {
          type: "success",
        });

        props.navigation.goBack(); // Navigate back to the previous screen
      } else {
        toast.show("Ingredient not found", {
          type: "danger",
        });
      }
    } catch (error: any) {
      toast.show(error.message || "Something went wrong", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          onPress={() => handleUpdateData()}
          loading={loading}
          loader={<ActivityIndicator color={colors.white} size="small" />}
          title="Update"
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
