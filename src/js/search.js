import refreshUiRecipes from "./components/recipesUI";
import {
  allRecipes,
  findIngredients,
  findAppliances,
  findUstensils,
  findTagInIngredients,
} from "./http";
import selectUI from "./components/filterSelect/selectUI";
import createTag from "./components/tag";
import { initialState } from "./services";

const search = () => {
  const input = document.querySelector("[name='q']");
  let results = [];

  const removeDOMElements = (elements) => {
    elements.forEach((element) => element.remove());
  };

  /**
   * @param {string} searchedText
   */
  const searchAndUpdateResult = (
    searchedText,
    resultsFromTag,
    selectListFromTag
  ) => {
    results = resultsFromTag
      ? resultsFromTag
      : allRecipes.filter((recipe) =>
          recipe.containsText(searchedText, recipe.initialSearch)
        );

    /* If tags */
    /* TODO */

    /*Actualisation de l'interfacce */
    refreshUiRecipes(results);

    /*Actualisation des tags */
    selectUI([
      {
        name: "ingredients",
        list: selectListFromTag ?? findIngredients(results),
      },
      {
        name: "appareils",
        list: findAppliances(results),
      },
      {
        name: "ustensiles",
        list: findUstensils(results),
      },
    ]);
    /*TODO*/
  };

  /*Remove recipes from UI */
  const cleanCurrentResult = () => {
    removeDOMElements(document.querySelectorAll(".recettes article"));
  };

  /*La recherche ne se déclenche qu'à partir de 3 chars saisis */
  const canSearch = (searchedText) => {
    return searchedText.length > 2;
  };

  const reset = (searchedText) => {
    return !searchedText;
  };

  const onSearch = (e) => {
    const searchedText = e.target.value.toLowerCase();
    if (canSearch(searchedText)) {
      cleanCurrentResult();
      searchAndUpdateResult(searchedText);
    }

    if (reset(searchedText)) {
      initialState();
    }
  };

  input.addEventListener("input", (e) => onSearch(e));

  const tagsInput = [
    document.querySelector("[name='ingredients']"),
    document.querySelector("[name='ustensiles']"),
    document.querySelector("[name='appareils']"),
  ];

  const onTagsSearch = (e) => {
    const searchedText = e.target.value.toLowerCase();
    const select = e.target.getAttribute("name");

    results = results.length > 0 ? results : allRecipes;

    const resultsFromTag = results.filter((recipe) =>
      recipe.containsText(searchedText, recipe.searchInIngredients)
    );

    /*Refresh liste en fonction de tag */
    /*TODO*/
    searchAndUpdateResult(
      searchedText,
      resultsFromTag,
      findTagInIngredients(resultsFromTag, searchedText)
    );
  };

  const onEnterTag = (e, input) => {
    if (e.code === "Enter") {
      createTag(input.value, input.getAttribute("name"));
    }
  };

  tagsInput.forEach((tagInput) => {
    tagInput.addEventListener("input", (e) => onTagsSearch(e)),
      tagInput.addEventListener("keydown", (e) => onEnterTag(e, tagInput));
  });

  /**On close tag */
};

export default search;
