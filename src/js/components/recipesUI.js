import recipes from "../data/recipes";

const recipesUI = () => {
  const createCard = (recipe) => {
    const article = document.createElement("article");

    const img = document.createElement("div");
    img.className = "img-container";

    const title = document.createElement("h2");
    title.textContent = recipe.name;

    const recipeTime = document.createElement("span");
    recipeTime.textContent = recipe.time + " min";
    title.append(recipeTime);

    const details = document.createElement("div");
    details.className = "details";
    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.className = "ingredients-wrapper";

    recipe.ingredients.forEach((ingredient) =>
      ingredientsWrapper.append(createIngredient(ingredient))
    );

    const description = document.createElement("div");
    description.className = "description";
    description.textContent = recipe.description;

    details.append(ingredientsWrapper, description);

    article.append(img, title, details);
    document.querySelector(".recettes").append(article);
  };

  const createIngredient = (element) => {
    const DOMElement = document.createElement("p");
    DOMElement.className = "ingredient";

    DOMElement.textContent = element.ingredient + ": ";

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
    DOMElement.append(quantity);

    return DOMElement;
  };

  recipes.forEach((recipe) => createCard(recipe));
};

export default recipesUI;
