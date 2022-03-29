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

  /*Retourne une chaine de caractères composée de name, description et ingrédient */
  get searchLocation() {
    return [
      this.name,
      this.description,
      ...this.ingredients.map((i) => i.ingredient),
    ]
      .join()
      .toLowerCase();
  }

  containsText(text) {
    return this.searchLocation.includes(text);
  }
}

export default Recipe;
