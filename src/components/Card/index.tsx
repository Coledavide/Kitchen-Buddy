import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useToast } from "react-native-toast-notifications";
import moment from "moment";
import { colors, typography } from "../../../theme";
import { IIngredients } from "../../utils/types";
import Button from "../Button";
import context from "../../Context/context";
import AsyncStorageService from "../../utils/AsyncStorageService";

interface InputProps {
  item: IIngredients;
  containerStyle?: ViewStyle;
}

export default function Card({ containerStyle, item }: InputProps) {
  const toast = useToast();
  const navigation: any = useNavigation();
  const { appState, getIngredients, dispatch }: any = useContext(context);
  const { ingredients } = appState;
  let {
    name,
    expirationDate,
    category,
    confectionType,
    id,
    location,
    brandName,
    maturityStatus,
    opened,
  } = item;

  const handleDelete = async () => {
    try {
      const index = ingredients.findIndex((item: any) => item.id === id);
      console.log(index);
      // Check if the ingredient exists in the list
      if (index !== -1) {
        // Remove the ingredient from the list
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        console.log(updatedIngredients);
        // Optionally, persist the updated ingredients list in AsyncStorage or database
        await AsyncStorageService.setItem("Ingredients", updatedIngredients);
        await getIngredients();
        toast.show("Ingredient deleted successfully", { type: "success" });
      } else {
        toast.show("Ingredient not found", { type: "warning" });
      }
      // await AsyncStorageService.clear();
    } catch (error: any) {
      toast.show(error.message || "Something went wrong");
    } finally {
    }
  };

  const isExpired = moment(expirationDate).isBefore(moment());
  const expirationText = isExpired
    ? `Expired ${moment(expirationDate).fromNow()}`
    : `Expires ${moment(expirationDate).fromNow()}`;
  const expirationColor = isExpired ? "red" : colors.gray400;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconSec}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/list.png")}
        />
        {/* <Text style={styles.brandName}>{brandName}</Text> */}
      </View>
      <View style={styles.otherDetails}>
        <View style={{ flex: 1 }}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipTxt}>{category}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          {brandName && (
            <Text style={styles.brandName}>
              Brand Name:{" "}
              <Text
                style={{ fontFamily: typography.bold, color: colors.gray700 }}
              >
                {brandName}
              </Text>
            </Text>
          )}
          {maturityStatus && (
            <Text style={styles.brandName}>
              Ripeness:{" "}
              <Text
                style={{ fontFamily: typography.bold, color: colors.gray700 }}
              >
                {maturityStatus}
              </Text>
            </Text>
          )}
          <Text style={styles.brandName}>
            Opened:{" "}
            <Text
              style={{ fontFamily: typography.bold, color: colors.gray700 }}
            >
              {opened}
            </Text>
          </Text>
          <Text style={[styles.date, { color: expirationColor }]}>
            {expirationText}
          </Text>
        </View>
        <View style={styles.btnsView}>
          <Button
            onPress={() =>
              navigation.navigate("EditIngredients", { ingredientId: id })
            }
            btnStyle={styles.btnStyle}
            textStyle={styles.textStyle}
          >
            <MaterialIcons name="edit" size={16} color={colors.primary} />
          </Button>
          <Button
            onPress={() => handleDelete()}
            btnStyle={styles.btnStyle}
            textStyle={styles.textStyle}
          >
            <MaterialIcons name="delete-outline" size={18} color="red" />
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
    elevation: 5,
    borderRadius: 15,
    width: "48%",
  },
  label: {
    marginBottom: 10,
    color: colors.gray500,
    fontFamily: typography.medium,
    fontSize: 16,
  },
  iconSec: {
    backgroundColor: colors.gray200,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    // borderRadius: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: typography.semibold,
    fontSize: 18,
    color: colors.black,
  },
  brandName: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.gray700,
    marginTop: 5,
    // marginTop: 5,
    // backgroundColor: colors.gray300,
    // alignSelf: "flex-start",
    // paddingHorizontal: 15,
    // borderRadius: 20,
    // paddingVertical: 3,
    // position: "absolute",
    // top: 10,
    // right: 10,
    // elevation: 5,
  },
  btnsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // position: "absolute",
    // width: "100%",
    // bottom: 0,
  },
  btnStyle: {
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.gray100,
    // borderWidth: 1,
    // borderColor: colors.primary,
    width: "45%",
    // elevation: 5,
  },
  textStyle: {
    color: colors.primary,
    fontSize: 14,
  },
  otherDetails: {
    padding: 10,
    flex: 1,
  },
  date: {
    color: colors.gray400,
    fontSize: 12,
    fontFamily: typography.medium,
    marginTop: 5,
  },
  categoryChip: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 5,
  },
  categoryChipTxt: {
    color: colors.white,
    fontFamily: typography.medium,
    fontSize: 11,
  },
});
