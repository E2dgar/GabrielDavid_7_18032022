import { allRecipes } from "../http";
import domBuilder from "../domBuilder";

const refreshUiRecipes = (searchedRecipes) => {
  /*On refresh UI, remove all articles */
  document.querySelectorAll("article").forEach((article) => article.remove());

  const data = searchedRecipes ?? allRecipes;

  /*Display/hide 'no results' element----------*/
  const noResultsElement = document.querySelector(".no-results");

  if (data.length === 0) {
    if (noResultsElement) {
      return;
    } else {
      const noResults = document.createElement("p");
      noResults.className = "no-results";
      noResults.textContent = "Aucune recette pour cette recherche";
      document.querySelector(".recettes").append(noResults);
      return;
    }
  }

  if (noResultsElement) {
    noResultsElement.remove();
  }
  /*--------------------------------------------*/

  /**
   * Create card from a recipe
   * @param {Object} recipe
   */
  const createCard = (recipe) => {
    const article = document.createElement("article");

    const img = domBuilder.domElement("div", "", "img-container");

    const title = domBuilder.domElement("h2", recipe.name);

    const recipeTime = domBuilder.domElement("span", recipe.time + " min");

    title.append(recipeTime);

    const ingredientsAndDescriptionContainer = domBuilder.domElement(
      "div",
      "",
      "details"
    );

    const ingredientsContainer = domBuilder.domElement(
      "div",
      "",
      "ingredients-wrapper"
    );

    recipe.ingredients.forEach((ingredient) =>
      ingredientsContainer.append(createIngredient(ingredient))
    );

    const description = domBuilder.domElement(
      "div",
      recipe.description,
      "description"
    );
    /*const description = document.createElement("div");
    description.className = "description";
    description.textContent = recipe.description;*/

    ingredientsAndDescriptionContainer.append(
      ingredientsContainer,
      description
    );

    article.append(img, title, ingredientsAndDescriptionContainer);
    document.querySelector(".recettes").append(article);
  };

  const createIngredient = (element) => {
    const ingredient = domBuilder.domElement(
      "p",
      element.ingredient + ": ",
      "ingredient"
    );

    const quantity = document.createElement("span");
    if (element.unit) {
      let unit = "&nbsp;" + element.unit;
      if (element.unit === "ml" || element.unit === "cl") {
        unit = element.unit;
      }
      quantity.innerHTML = `${element.quantity + unit}`;
    } else {
      quantity.textContent = element.quantity;
    }
    ingredient.append(quantity);

    return ingredient;
  };

  data.forEach((recipe) => createCard(recipe));
};

export default refreshUiRecipes;
