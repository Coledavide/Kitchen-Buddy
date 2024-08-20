import { NavigatorScreenParams } from "@react-navigation/native";
// import { ingredientsCategories } from "./data";

export type IDropdownData = {
  label: string;
  value: string;
};

export type IIngredients = {
  name: string;
  category: string;
  location: string;
  confectionType: string;
  expirationDate: Date;
  id: string;
  createdAt: Date;
  brandName?: string;
  maturityStatus?: string;
  opened?: string;
};
export interface InitialState {
  ingredients: IIngredients[] | null;
  filterIngredients: IIngredients[] | null;
  productName: string | null;
}

// Define the parameters for the tab navigator
export type TabParamList = {
  AddIngredients: undefined;
  Ingredients: undefined;
  ExpireSoonIngredients: undefined;
};

// Define the parameters for the stack navigator
export type StackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  EditIngredients: { ingredientId: string }; // Assuming EditIngredients requires an ingredientId parameter
  BarCodeScanner: any;
  Home: undefined;
};
