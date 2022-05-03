import refreshUiRecipes from "./components/recipesUI";
import { allRecipes } from "./http";
import {
  arrayNoDuplicates,
  textToClassNameFormat,
  textToRecipeFormat,
  toArrayInLowerCase,
} from "./services";
import domBuilder from "./domBuilder";
import createTag from "./components/tag";
import {
  updateOneSelect,
  updateAllSelects,
  elementsInSelect,
} from "./components/filterSelect/updateSelect";

const search = () => {
  const inputMain = document.querySelector("[name='q']");

  let allTags = {
    ingredients: [],
    appareils: [],
    ustensiles: [],
  };
  let mainResults = [];
  let resultsByTags = [];

  /**
   * @param {Array} searchedText
   */
  const searchAndUpdateResult = (searchedText) => {
    const recipes = findRecipesByMain(searchedText, resultsByTags);
    /*Actualisation de l'interfacce */
    refreshUiRecipes(recipes);

    /*Si il n'y a qu'une seule recette dans l'UI on vide les selects */
    if (recipes.length === 1) {
      emptySelects();
    } else {
      updateAllSelects(recipes);
    }
  };

  /*Check si il ya des tags de recherche affichés*/
  const isTag = () => {
    if (
      allTags.ingredients.length > 0 ||
      allTags.appareils.length > 0 ||
      allTags.ustensiles.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Return un array de recipes filtrées avec la recherche principale
   * @param {Array} searchedText
   * @returns
   */
  const findRecipesByMain = (searchedText, resultsByTags) => {
    /*On prend comme base de recherche la recherche par tag s'il elle existe sinon toutes les recettes*/
    mainResults = resultsByTags?.length > 0 ? resultsByTags : allRecipes;

    /*On filtre les recettes pour chaque terme de recherche */

    searchedText.forEach((text) => {
      mainResults = mainResults.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(text) ||
          recipe.description.toLowerCase().includes(text) ||
          recipe.searchInIngredients.includes(text)
      );
    });

    return mainResults;
  };

  /*La recherche ne se déclenche qu'à partir de 3 chars saisis */
  const canSearch = (searchedText) => {
    return searchedText.length > 2;
  };

  /*Réinitialisation des résultats quand on efface les termes de recherche */
  const reset = (searchedText) => {
    return searchedText[0] === "";
  };

  /*Vide les selects */
  const emptySelects = () => {
    updateAllSelects([]);
  };

  const onSearch = (e) => {
    /*La recherche est un tableau de termes pour prendre en compte plusieurs mot et boucler dessus */
    const searchedText = toArrayInLowerCase(e.target.value);

    if (canSearch(searchedText[0])) {
      domBuilder.removeElements(document.querySelectorAll(".recettes article"));
      searchAndUpdateResult(searchedText);
    }

    /*Quand l'utilisateur efface les termes de la recherche principale*/
    if (reset(searchedText)) {
      mainResults = [];
      /*Si il y a des tags présents on rafraîchit les résultats avec les résultats de recherche de ces tags*/
      if (isTag()) {
        findRecipesByTags(allRecipes);
      } /*Sinon on refresh toutes les recttes */ else {
        refreshUiRecipes(allRecipes);
        updateAllSelects(allRecipes);
      }
    }
  };

  inputMain.addEventListener("input", (e) => onSearch(e));
  inputMain.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
    }
  });

  /*TAGS */

  /**
   * Filtre la liste des select en temps réel suivant les termes recherchés
   * @param {Array} searchedTag
   * @param {string} selectType
   */
  const liveRefreshOptionsSelect = (searchedTag, selectType) => {
    /*Si il a une recherche princpale d'éffectuée on utilise ces résultats comme base de recherche sinon on utilise toutes les recettes*/
    const currentResults = mainResults.length > 0 ? mainResults : allRecipes;
    /*Init tableau de tous les éléments de liste qui match avec la recherche*/
    let liInSelect = [];

    /**
     * On crée une fonction qui check si le tag est présent dans la liste d'un select
     * @param {string} select
     */
    const getTagsInSelect = (select) => {
      select.forEach((li) => {
        /*Init d'un tableau pour gérer une recherche avec plusieurs termes*/
        let isInList = [];

        /*Pou chaque terme de recherche */
        for (let i = 0; i < searchedTag.length; i++) {
          /*Si le terme est présent dans un élément de liste*/
          if (li.includes(searchedTag[i])) {
            /*On l'ajoute au tableau*/
            isInList.push(li);
          }
        }
        /*Si le nombre de termes de la recherche est égal au nombre de terme dans le tableau c'est que tous les termes sont dans l'élement de liste, on peut ajouter l'élément au tableau de tous les éléments */
        if (searchedTag.length === isInList.length) {
          arrayNoDuplicates(liInSelect, li);
        }
      });
      return liInSelect;
    };

    /*On met à jour les élements de liste du select concerné */
    switch (selectType) {
      case "ingredients":
        updateOneSelect(
          selectType,
          getTagsInSelect(elementsInSelect.ingredients(currentResults))
        );
        break;
      case "appareils":
        updateOneSelect(
          selectType,
          getTagsInSelect(elementsInSelect.appareils(currentResults))
        );
        break;
      case "ustensiles":
        updateOneSelect(
          selectType,
          getTagsInSelect(elementsInSelect.ustensiles(currentResults))
        );
        break;
    }
  };

  /*Recherche par tags */
  const findRecipesByTags = (currentResults) => {
    /*On prend comme base de recherche les résultats passé en parma, sinon résultats de la recherche principale, sinon toutes les recettes*/
    let filteredFromTags =
      currentResults?.length > 0
        ? currentResults
        : mainResults.length > 0
        ? mainResults
        : allRecipes;

    /*On filtre les résultats avec les tags présents */
    if (allTags.ingredients.length > 0) {
      allTags.ingredients.forEach((tag) => {
        filteredFromTags = filteredFromTags.filter((recipe) =>
          recipe.containsText(
            textToRecipeFormat(tag),
            recipe.searchInIngredients
          )
        );
      });
    }

    if (allTags.appareils.length > 0) {
      allTags.appareils.forEach((tag) => {
        filteredFromTags = filteredFromTags.filter((recipe) =>
          recipe.containsText(textToRecipeFormat(tag), recipe.searchInAppareils)
        );
      });
    }

    if (allTags.ustensiles.length > 0) {
      allTags.ustensiles.forEach((tag) => {
        filteredFromTags = filteredFromTags.filter((recipe) =>
          recipe.containsText(
            textToRecipeFormat(tag),
            recipe.searchInUstensiles
          )
        );
      });
    }

    /*On update l'UI (recettes)  et les listes des selects*/
    refreshUiRecipes(filteredFromTags);
    /*True en 2eme param pour supprimer de la liste du select le tag ajouté à la validation du tag */
    updateAllSelects(filteredFromTags, true);

    /*S'il n'y a plus qu'une recette sur l'interface on vide les selects*/
    if (filteredFromTags.length === 1) {
      emptySelects();
    }
    /*Update du tableau de résultast par tags*/
    resultsByTags = filteredFromTags;

    return filteredFromTags;
  };

  /*Déclenche la recherche par tag quand un tag est validé */
  const onValidateTag = (e, input) => {
    const select = e.target.getAttribute("id").replace(/-[0-9]?[0-9]/, "");
    const tag = e.target.textContent;

    /*On crée le tag*/
    createTag(tag, select).addEventListener("click", (e) => closeTag(e));

    /*On reset l'input*/
    document.querySelector(`[name="${select}"]`).value = "";

    /*On met à jour le tableau des tags*/
    allTags[select].push(textToClassNameFormat(tag));

    findRecipesByTags(mainResults);
  };

  /*A la fermeture d'un tag on supprime le tag de l'interface et du tableau des tags et on update les listes des selects */
  const closeTag = (e) => {
    const select = e.currentTarget.getAttribute("data-select");
    const tag = e.currentTarget.getAttribute("data-tag");

    document.querySelector(`.tag-${tag}`).remove();
    allTags[select] = allTags[select].filter((value) => value !== tag);

    if (isTag()) {
      findRecipesByTags(findRecipesByMain(toArrayInLowerCase(inputMain.value)));
    } else if (inputMain.value !== "") {
      resultsByTags = [];
      searchAndUpdateResult(toArrayInLowerCase(inputMain.value));
    } else {
      resultsByTags = [];
      refreshUiRecipes(allRecipes);
      updateAllSelects(allRecipes);
    }
  };

  /*Ecouteurs sur les input de tags */
  const tagsInput = [
    document.querySelector("[name='ingredients']"),
    document.querySelector("[name='ustensiles']"),
    document.querySelector("[name='appareils']"),
  ];

  tagsInput.forEach((tagInput) => {
    /*Ecouteur de la saisi des tags*/
    tagInput.addEventListener("input", (e) => {
      const searchedTag = toArrayInLowerCase(e.target.value);
      const selectType = e.target.getAttribute("name");
      liveRefreshOptionsSelect(searchedTag, selectType);
    });
  });

  /*Selects updates */

  document.querySelectorAll(".combo-list li").forEach((li) => {
    li.addEventListener("click", (li) => onValidateTag(li));
  });
};

export default search;
