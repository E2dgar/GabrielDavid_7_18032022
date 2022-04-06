import refreshUiRecipes from "./components/recipesUI";
import {
  allRecipes,
  findIngredients,
  findAppliances,
  findUstensils,
  findTagIn,
} from "./http";
import selectUI from "./components/filterSelect/selectUI";
import createTag from "./components/tag";
import { initialState } from "./services";

const search = () => {
  const input = document.querySelector("[name='q']");
  let results = [];

  let selectMethods = {
    ingredients: null,
    appareils: null,
    ustensiles: null,
  };

  const removeDOMElements = (elements) => {
    elements.forEach((element) => element.remove());
  };

  /**
   * @param {string} searchedText
   */
  const searchAndUpdateResult = (
    searchedText,
    resultsFromTag,
    selectListFromTag,
    selectType
  ) => {
    results = resultsFromTag
      ? resultsFromTag
      : allRecipes.filter((recipe) =>
          recipe.containsText(searchedText, recipe.initialSearch)
        );

    selectMethods[selectType] = selectListFromTag;

    /*Actualisation de l'interfacce */
    refreshUiRecipes(results);

    /*Actualisation des tags */
    selectUI([
      {
        name: "ingredients",
        list: selectMethods["ingredients"]
          ? selectListFromTag
          : findIngredients(results),
      },
      {
        name: "appareils",
        list: selectMethods["appareils"]
          ? selectListFromTag
          : findAppliances(results),
      },
      {
        name: "ustensiles",
        list: selectMethods["ustensiles"]
          ? selectListFromTag
          : findUstensils(results),
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

  const onTagsSearch = (searchedTag, selectType) => {
    let location =
      "searchIn" + selectType.charAt(0).toUpperCase() + selectType.slice(1);

    results =
      results.length === 0 || searchedTag.length === 0 ? allRecipes : results;

    const resultsFromTag = results.filter((recipe) =>
      recipe.containsText(searchedTag, recipe[location])
    );

    /*Refresh liste en fonction de tag */
    /*TODO*/
    searchAndUpdateResult(
      searchedTag,
      resultsFromTag,
      findTagIn(resultsFromTag, searchedTag, selectType.toLowerCase()),
      selectType.toLowerCase()
    );
  };

  const onValidateTag = (e, input) => {
    if (e.code === "Enter") {
      e.preventDefault();
      const inputName = input.getAttribute("name") + "-tag";

      createTag(input.value, inputName).addEventListener("click", (e) =>
        closeTag(e)
      );
    }
    if (!e.code) {
      createTag(
        e.target.textContent,
        e.target.getAttribute("id").replace(/[0-9]?[0-9]/, "tag")
      ).addEventListener("click", (e) => closeTag(e));
    }
  };

  /**On close tag */
  const closeTag = (e) => {
    document
      .querySelector(`.${e.currentTarget.getAttribute("data-tag")}`)
      .remove();
    /*Update results TODO */
  };

  tagsInput.forEach((tagInput) => {
    tagInput.addEventListener("input", (e) => {
      const searchedTag = e.target.value.toLowerCase();
      const selectType = e.target.getAttribute("name");
      onTagsSearch(searchedTag, selectType);
    });
    tagInput.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        onValidateTag(e, tagInput);
      }
    });
  });

  document.querySelectorAll(".combo-list li").forEach((li) => {
    li.addEventListener("click", (li) => {
      onValidateTag(li);
      onTagsSearch(
        li.target.textContent,
        li.target.getAttribute("id").replace(/-[0-9]?[0-9]/, "")
      );
    });
  });
};

export default search;
