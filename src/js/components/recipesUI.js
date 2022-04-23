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

    const img = domBuilder.wrapper("div", "img-container");

    const title = domBuilder.elementWithContent("h2", recipe.name);

    const recipeTime = domBuilder.elementWithContent(
      "span",
      recipe.time + " min"
    );

    title.append(recipeTime);

    const ingredientsAndDescriptionContainer = domBuilder.wrapper(
      "div",
      "details"
    );

    const ingredientsContainer = domBuilder.wrapper(
      "div",
      "ingredients-wrapper"
    );

    recipe.ingredients.forEach((ingredient) =>
      ingredientsContainer.append(createIngredient(ingredient))
    );

    const description = domBuilder.elementWithContent(
      "div",
      recipe.description
    );
    description.classList.add("description");

    ingredientsAndDescriptionContainer.append(
      ingredientsContainer,
      description
    );

    article.append(img, title, ingredientsAndDescriptionContainer);
    document.querySelector(".recettes").append(article);
  };

  /**Create ingredient DOM element */
  const createIngredient = (element) => {
    const ingredient = domBuilder.elementWithContent(
      "p",
      element.ingredient + ": "
    );
    ingredient.className = "ingredient";

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
