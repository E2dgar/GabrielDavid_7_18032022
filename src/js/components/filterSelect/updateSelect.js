import { findIngredients, findUstensils, findAppliances } from "../../http";

/**
 * Uodate un select d'après un tableau de recettes
 * @param {string} select
 * @param {Array} options
 */
const createSelects = (options) => {
  const selectsTypes = ["ingredients", "appareils", "ustensiles"];
  /*On boucle sur les options pourles ajouter au select */
  selectsTypes.forEach((selectType) => {
    let optionsCount = 0;
    elementsInSelect[selectType](options).forEach((option) => {
      let targetedList = document.querySelector(`.${selectType}-list`);
      optionsCount++;
      let optionLi = document.createElement("li");
      optionLi.setAttribute("id", selectType + "-" + optionsCount);
      optionLi.setAttribute("role", "option");
      optionLi.setAttribute("tabindex", 0);
      optionLi.textContent = option;
      targetedList.append(optionLi);
    });
  });
};

/**
 * Uodate un select d'après un tableau de recettes
 * @param {string} select
 * @param {Array} options
 */
const updateOneSelect = (select, options) => {
  /*On masque toutes les options */
  const optionsLi = document.querySelectorAll(
    `.${select}-list [role='option']`
  );
  if (optionsLi.length > 0) {
    optionsLi.forEach((li) => li.classList.add("hidden-li"));
  }

  const allTagsPresents = document.querySelectorAll(".tag span");
  const allTextTags = [];
  allTagsPresents.forEach((span) => allTextTags.push(span.textContent));

  if (options.length > 1) {
    /*On boucle sur les li pour afficher celles contenu dans le tableau options tout en masquant la li égal au tag */
    optionsLi.forEach((li) => {
      if (
        options.includes(li.textContent.toLowerCase()) &&
        !allTextTags.includes(li.textContent)
      ) {
        li.classList.remove("hidden-li");
      }
    });
  }
};

/*Objet retournant pour chaque select le tableau de ses éléments de liste*/
const elementsInSelect = {
  ingredients: (searchIn) => findIngredients(searchIn),
  ustensiles: (searchIn) => findUstensils(searchIn),
  appareils: (searchIn) => findAppliances(searchIn),
};

/**
 * Update all selects from an array of recipes
 * @param {Array} results
 */
const updateAllSelects = (results) => {
  updateOneSelect("ingredients", elementsInSelect.ingredients(results));
  updateOneSelect("appareils", elementsInSelect.appareils(results));
  updateOneSelect("ustensiles", elementsInSelect.ustensiles(results));
};

export { createSelects, updateOneSelect, updateAllSelects, elementsInSelect };
