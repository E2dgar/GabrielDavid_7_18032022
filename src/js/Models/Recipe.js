class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.time = data.time;
    this.ingredients = data.ingredients;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
    this.description = data.description;
  }

  /**
   * Get ingredient & quantity from a recipe
   * @returns {Array}
   */
  getIngredientsAndQuantity() {
    return this.ingredients;
  }

  /**
   * Get ingredients list from a recipe
   * @returns {Array}
   */
  getIngredients() {
    const ingredients = [];
    this.ingredients.forEach((ingredient) =>
      ingredients.push(ingredient.ingredient.toLowerCase())
    );

    return ingredients;
  }

  getId() {
    return this.id;
  }
  /*getAllIngredients() {
    const getAllIngredients = [];
    this.getAllRecipes().forEach((recipe) =>
      pushInArray(getAllIngredients, recipe)
    );
    return getAllIngredients;
  }*/
}

export default Recipe;
