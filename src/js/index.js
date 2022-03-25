import "../scss/main.scss";
import recipesUI from "./components/recipesUI";
import selectUI from "./components/filterSelect/selectUI";
import select from "./components/filterSelect/select";
import recipes from "./data/recipes";
import { ingredients, ustensils, appliance } from "./http";
import search from "./search";
import Recipe from "./Models/Recipe";

selectUI([
  {
    name: "ingredients",
    list: ingredients,
  },
  {
    name: "appareils",
    list: appliance,
  },
  {
    name: "ustensiles",
    list: ustensils,
  },
]);

select();

recipesUI();
search();
