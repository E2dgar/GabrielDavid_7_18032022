import "../scss/main.scss";
import recipesUI from "./components/recipesUI";
import selectUI from "./components/filterSelect/selectUI";
import select from "./components/filterSelect/select";
import { ingredients, ustensils, appliance } from "./http";
import search from "./search";

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
