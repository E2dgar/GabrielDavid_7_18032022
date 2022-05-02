class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.time = data.time;
    this.ingredients = data.ingredients;
    this.appareils = data.appliance;
    this.ustensiles = data.ustensils;
    this.description = data.description;
  }

  /*Récupère tous les ingrédients d'un recette sous la forme d'une chaîne de caractères */
  get searchInIngredients() {
    return [...this.ingredients.map((i) => i.ingredient)].join().toLowerCase();
  }

  /*Récupère tous les ustensiles d'un recette sous la forme d'une chaîne de caractères */
  get searchInUstensiles() {
    return [this.ustensiles].join().toLowerCase();
  }

  /*Récupère tous les appareils d'un recette sous la forme d'une chaîne de caractères */
  get searchInAppareils() {
    return [this.appareils].join().toLowerCase();
  }

  /**
   * Test si une string est présente dans une chaîne de caractères
   * @param {string} text
   * @param {string} location
   * @returns {boolean}
   */
  containsText(text, location) {
    return location.includes(text);
  }
}

export default Recipe;
