import React, { useState, useContext, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraProps,
  BarcodeScanningResult,
} from "expo-camera";
import axios from "axios";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import context from "../../Context/context";
import { StackParamList } from "../../utils/types";
import Button from "../../components/Button";
import { colors } from "../../../theme";

export interface BarCodeScannerProps
  extends NativeStackScreenProps<StackParamList, "BarCodeScanner"> {}

export default function BarCodeScanner(props: BarCodeScannerProps) {
  const { appState, getIngredients, dispatch }: any = useContext(context);
  const toast = useToast();
  // const { ingredients } = appState;
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const BASE_URL = "https://world.openfoodfacts.org";

  const getIngredientByBarcode = async (barcode: any) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v0/product/${barcode}.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching ingredient:", error);
      throw error;
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async (
    scanningResult: BarcodeScanningResult
  ) => {
    if (!scanned) {
      setScanned(true); // Prevent multiple scans
      try {
        // console.log("Scanned data:", scanningResult.data);
        const data = await getIngredientByBarcode(scanningResult.data);

        if (data?.status === 1) {
          // Check if the product is found
          const productName = data.product.product_name || "Unknown Product";
          dispatch({ type: "productName", payload: productName });
          props.navigation.navigate("Tabs", {
            screen: "AddIngredients",
          });
        } else {
          toast.show("Product not found", { type: "warning" });
        }
      } catch (error: any) {
        toast.show(error.message || "Something went wrong", { type: "danger" });
      } finally {
        // Allow scanning again after a short delay (e.g., 3 seconds)
        setTimeout(() => setScanned(false), 3000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={(scanningResult: BarcodeScanningResult) => {
          handleBarCodeScanned(scanningResult);
        }}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "codabar",
            "aztec",
            "code128",
            "code39",
            "upc_a",
            "code93",
            "datamatrix",
            "ean13",
            "ean8",
            "itf14",
            "upc_e",
          ],
        }}
      >
        <View style={styles.buttonContainer}>
          {scanned && (
            <Button
              title={"Scan Again"}
              onPress={() => setScanned(false)}
              btnStyle={{
                position: "absolute",
                bottom: 30,
                backgroundColor: colors.white,
              }}
              textStyle={{ color: colors.primary }}
            />
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
