import "../scss/main.scss";
import recipesUI from "./components/recipesUI";
import selectUI from "./components/filterSelect/selectUI";
import select from "./components/filterSelect/select";
import {
  allRecipes,
  findIngredients,
  findUstensils,
  findAppliances,
} from "./http";
import search from "./search";

selectUI([
  {
    name: "ingredients",
    list: findIngredients(allRecipes),
  },
  {
    name: "appareils",
    list: findAppliances(allRecipes),
  },
  {
    name: "ustensiles",
    list: findUstensils(allRecipes),
  },
]);

select();

recipesUI();
search();
