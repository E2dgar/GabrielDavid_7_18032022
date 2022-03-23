import recipes from "../data/recipes";

class Recipe {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.time = data.time;
    this.ingredients = data.ingredients;
  }

  /**
   * Get all recipes
   * @returns {Object}
   */
  getAllRecipes() {
    return recipes;
  }
}

export default Recipe;
