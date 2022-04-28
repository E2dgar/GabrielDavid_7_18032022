import refreshUiRecipes from "./components/recipesUI";
import {
  allRecipes,
  findAppliances,
  findIngredients,
  findUstensils,
} from "./http";
import { arrayNoDuplicates, initialState } from "./services";
import domBuilder from "./domBuilder";
import createTag from "./components/tag";
import updateSelect from "./components/filterSelect/updateSelect";

const mainSearch = () => {
  const inputMain = document.querySelector("[name='q']");

  let allTags = {
    ingredients: [],
    appareils: [],
    ustensiles: [],
  };
  let mainResults = [];

  const selects = {
    ingredients: (searchIn) => findIngredients(searchIn),
    ustensiles: (searchIn) => findUstensils(searchIn),
    appareils: (searchIn) => findAppliances(searchIn),
  };

  /**
   * @param {Array} searchedText
   */
  const searchAndUpdateResult = (searchedText) => {
    /*Actualisation de l'interfacce */
    refreshUiRecipes(findRecipesByMain(searchedText));
    /*Update selects */
    updateAllSelects(findRecipesByMain(searchedText));
  };

  /*Check si il ya des tags de recherche affichés*/
  const isTag = () => {
    if (
      allTags.ingredients.length > 0 ||
      allTags.appareils.length > 0 ||
      allTags.ustensiles.length > 0
    ) {
      return true;
    }
  };

  /*Return un array de recipes filtré avec la recherche principale */
  const findRecipesByMain = (searchedText) => {
    let recipes = [];
    let resultsFromMain = [];

    /*Si il y a des tags on prend comme tableau de recherches les recettes déjà filtrés par un ou des tags */
    if (isTag()) {
      recipes = findRecipesByTags();
    } /*Sinon on prend toutes les recettes */ else {
      recipes = allRecipes;
    }

    /*On boucle sur la liste recipes */
    for (let i = 0; i < recipes.length; i++) {
      let allTerms = new Array(searchedText.length);

      /*On boucle sur un tableau de termes gérer une recherche à plusieurs termes */
      for (let j = 0; j < searchedText.length; j++) {
        /*Si le terme[j] est présent dans le nom de la recette on le passe à true */
        if (recipes[i].name.toLowerCase().includes(searchedText[j])) {
          allTerms[j] = true;
        }
        /*Si le terme[j] est présent dans la description on le passe à true */
        if (recipes[i].description.toLowerCase().includes(searchedText[j])) {
          allTerms[j] = true;
        }
        /*Si le terme[j] est présent dans la liste des ingrédients de la recette on le passe à true */
        for (let k = 0; k < recipes[i].ingredients.length; k++) {
          if (
            recipes[i].ingredients[k].ingredient
              .toLowerCase()
              .includes(searchedText[j])
          ) {
            allTerms[j] = true;
          }
        }
      }

      /*On compte le nombre de terms égal à true */
      let countPresentTerm = 0;
      for (let k = 0; k < allTerms.length; k++) {
        if (allTerms[k]) {
          countPresentTerm++;
        }
      }
      /*Si le nombre de true est égal aux nombres de termes recherchés on peut ajouter la recette au résultats*/
      if (allTerms.length === countPresentTerm) {
        arrayNoDuplicates(resultsFromMain, recipes[i]);
      }
    }

    return (mainResults = resultsFromMain);
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
      if (isTag()) {
        findRecipesByTags();
      } else {
        initialState();
      }
    }
  };

  inputMain.addEventListener("input", (e) => onSearch(e));

  /*Recherche par tag */
 

  /**
   * Filtre la liste des select suivant les termes recherchés
   * @param {Array} searchedTag
   * @param {string} selectType
   */
  const onTagsSearch = (searchedTag, selectType) => {
    const currentResults = mainResults.length === 0 ? allRecipes : mainResults;
    let ingredientsList = selects.ingredients(currentResults);
    let appareilsList = selects.appareils(currentResults);
    let ustensilesList = selects.ustensiles(currentResults);
    let liInSelect = [];

    const getTagsInSelect = (select) => {
      select.forEach((li) => {
        let isInList = [];

        for (let i = 0; i < searchedTag.length; i++) {
          if (li.includes(searchedTag[i])) {
            isInList.push(li);
          }
        }
        if (searchedTag.length === isInList.length) {
          arrayNoDuplicates(liInSelect, li);
        }
      });
    };

    let updatedList = [];
    /*Suivant le select dans lequel on est on filtre la liste en fonction des termes recherchés */
    switch (selectType) {
      case "ingredients":
        getTagsInSelect(ingredientsList);
        updatedList = ingredientsList.filter((tag) => liInSelect.includes(tag));
        break;
      case "appareils":
        getTagsInSelect(appareilsList);
        updatedList = appareilsList.filter((tag) => liInSelect.includes(tag));
        break;
      case "ustensiles":
        getTagsInSelect(ustensilesList);
        updatedList = ustensilesList.filter((tag) => liInSelect.includes(tag));
        break;
    }
    updateSelect(selectType, updatedList);
  };


  /**
   * Update all selects from an array of recipes
   * @param {Array} results
   */
  const updateAllSelects = (results) => {
    updateSelect("ingredients", selects.ingredients(results));
    updateSelect("appareils", selects.appareils(results));
    updateSelect("ustensiles", selects.ustensiles(results));
  };

  const findRecipesByTags = () => {
    let recipes = [];
    /*Si on a déjà une recherche principale effectuée, recipes est le résultat de cette recherche*/
    if (inputMain.value !== "") {
      recipes = mainResults;
    }/*Sinon recipes contient toutes les recettes*/ 
    else {
      recipes = allRecipes;
    }

    let filteredFromTags = recipes;
   
    /*On filtre les résultats avec les tags présents */ 
    if (allTags.ingredients.length > 0) {
      allTags.ingredients.forEach((tag) => {
        filteredFromTags = filteredFromTags.filter((recipe) =>
          recipe.containsText(
            tag.replaceAll("-", " "),
            recipe.searchInIngredients
          )
        );
      });
    }

    if (allTags.appareils.length > 0) {
      allTags.appareils.forEach((tag) => {
        filteredFromTags = filteredFromTags.filter((recipe) =>
          recipe.containsText(
            tag.replaceAll("-", " "),
            recipe.searchInAppareils
          )
        );
      });
    }

    if (allTags.ustensiles.length > 0) {
      allTags.ustensiles.forEach((tag) => {
        filteredFromTags = filteredFromTags.filter((recipe) =>
          recipe.containsText(
            tag.replaceAll("-", " "),
            recipe.searchInUstensiles
          )
        );
      });
    }
    /*On update l'UI (recettes)  et les listes des selects*/
    refreshUiRecipes(filteredFromTags);
    updateAllSelects(filteredFromTags);

    return filteredFromTags;
  };

  /*Déclenche la recherche par tag quand un tag est validé */
  const onValidateTag = (e, input) => {
    if (e.code === "Enter") {
      e.preventDefault();
      const select = input.getAttribute("name");

      createTag(input.value, select).addEventListener("click", (e) =>
        closeTag(e)
      );

      allTags[input.getAttribute("name")].push(
        input.value.replaceAll(" ", "-")
      );

      input.value = null;
    }
    if (!e.code) {
      createTag(
        e.target.textContent,
        e.target.getAttribute("id").replace(/[0-9]?[0-9]/, "tag")
      ).addEventListener("click", (e) => closeTag(e));
    }
    findRecipesByTags();
  };

  /*A la fermeture d'un tag on supprime le tag de l'interface et du tableau des tags et on update les listes des selects */
  const closeTag = (e) => {
    const select = e.currentTarget.getAttribute("data-select");
    const tag = e.currentTarget.getAttribute("data-tag");

    document.querySelector(`.tag-${tag}`).remove();
    allTags[select] = allTags[select].filter((value) => value !== tag);

    updateAllSelects(findRecipesByTags());

    if (isTag()) {
      findRecipesByTags();
    } else if (inputMain.value !== "") {
      searchAndUpdateResult(inputMain.value.toLowerCase().split(" "));
    } 
  };

  /*Ecouteurs sur les input de tags */
  const tagsInput = [
    document.querySelector("[name='ingredients']"),
    document.querySelector("[name='ustensiles']"),
    document.querySelector("[name='appareils']"),
  ];

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
