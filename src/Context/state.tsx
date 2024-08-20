import React, { useState, useEffect } from "react";
import { useReducer } from "react";
import AsyncStorageService from "../utils/AsyncStorageService";
import { IIngredients, InitialState } from "../utils/types";
import Context from "./context";

const instalState: InitialState = {
  ingredients: [],
  filterIngredients: [],
  productName: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ingredients":
      return { ...state, ingredients: action.payload };
    case "filterIngredients":
      return { ...state, filterIngredients: action.payload };
    case "productName":
      return { ...state, productName: action.payload };
    default:
      return state;
  }
};

const State = (props: any) => {
  const [appState, dispatch] = useReducer(reducer, instalState);

  const sortIngredients = (ingredients: IIngredients[]) => {
    const sortedIngredients = [...ingredients].sort((a, b) =>
      new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1
    );
    return sortedIngredients;
  };

  const getIngredients = async () => {
    try {
      const data = await AsyncStorageService.getItem("Ingredients");
      if (data) {
        const sortedData = sortIngredients(data);
        dispatch({ type: "ingredients", payload: sortedData });
        dispatch({ type: "filterIngredients", payload: sortedData });
      }
    } catch (error: any) {
      // handle error
    } finally {
      // final actions if any
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <Context.Provider value={{ appState, dispatch, getIngredients }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
