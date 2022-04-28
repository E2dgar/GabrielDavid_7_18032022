import refreshUiRecipes from "./components/recipesUI";
import { allRecipes } from "./http";
import { arrayNoDuplicates, initialState } from "./services";
import domBuilder from "./domBuilder";
import createTag from "./components/tag";

const mainSearch = () => {
  const input = document.querySelector("[name='q']");

  let results = allRecipes;

  /**
   * @param {Array} searchedText
   */
  const searchAndUpdateResult = (searchedText) => {
    /**
     * Return an Array of recipes containing searched term(s)
     * @param {Array} searchTextArray
     * @returns {Array} results
     */

    let output = [];

    const findRecipes = (searchedText) => {
      for (let i = 0; i < results.length; i++) {
        let isInName = new Array(searchedText.length);
        let countInName = 0;

        let isInDesc = new Array(searchedText.length);
        let countInDesc = 0;

        let isInIngredients = new Array(searchedText.length);
        let countInIngredients = 0;

        for (let j = 0; j < searchedText.length; j++) {
          if (results[i].name.toLowerCase().includes(searchedText[j])) {
            isInName[j] = true;
            countInName++;
          }
          if (results[i].description.toLowerCase().includes(searchedText[j])) {
            isInDesc[j] = true;
            countInDesc++;
          }
          for (let k = 0; k < results[i].ingredients.length; k++) {
            if (
              results[i].ingredients[k].ingredient
                .toLowerCase()
                .includes(searchedText[j])
            ) {
              isInIngredients[j] = true;
              countInIngredients++;
            }
          }
        }

        if (
          isInName.length === countInName ||
          isInDesc.length === countInDesc ||
          isInIngredients.length === countInIngredients
        ) {
          arrayNoDuplicates(output, results[i]);
        }
      }

      return output;
    };

    /*Actualisation de l'interfacce */
    refreshUiRecipes(findRecipes(searchedText));
  };

  /*La recherche ne se déclenche qu'à partir de 3 chars saisis */
  const canSearch = (searchedText) => {
    return searchedText.length > 2;
  };

  /*Réinitialisation des résultats quand on efface les termes de recherche */
  const reset = (searchedText) => {
    return searchedText[0] === "";
  };

  const onSearch = (e) => {
    /*La recherche est un tableau de termes pour prendre en compte plusieurs mot et boucler dessus */
    const searchedText = e.target.value.toLowerCase().split(" ");

    if (canSearch(searchedText[0])) {
      domBuilder.removeElements(document.querySelectorAll(".recettes article"));
      searchAndUpdateResult(searchedText);
    }

    if (reset(searchedText)) {
      initialState();
    }
  };

  input.addEventListener("input", (e) => onSearch(e));

  /*Recherche par tag */
  const tagsInput = [
    document.querySelector("[name='ingredients']"),
    document.querySelector("[name='ustensiles']"),
    document.querySelector("[name='appareils']"),
  ];

  const onTagsSearch = (searchedTag, selectType) => {
    let location =
      "searchIn" + selectType.charAt(0).toUpperCase() + selectType.slice(1);

    results = results.filter((recipe) =>
      recipe.containsText(searchedTag, recipe[location])
    );

    /*Actualisation de l'interfacce */
    refreshUiRecipes(results);
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

  tagsInput.forEach((tagInput) => {
    tagInput.addEventListener("input", (e) => {
      const searchedTag = e.target.value.toLowerCase().split(" ");
      const selectType = e.target.getAttribute("name");
      onTagsSearch(searchedTag, selectType);
    });
    tagInput.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        onValidateTag(e, tagInput);
      }
    });
  });
};

export default mainSearch;
