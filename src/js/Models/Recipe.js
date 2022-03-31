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

  get searchInIngredients() {
    return [...this.ingredients.map((i) => i.ingredient)].join().toLowerCase();
  }

  get searchInUstensils() {
    return [this.ustensils].toLowerCase();
  }

  get searchInAppliance() {
    return [this.appliance].toLowerCase();
  }

  get initialSearch() {
    return [this.name, this.description, this.searchInIngredients]
      .join()
      .toLowerCase();
  }

  containsText(text, location) {
    return location.includes(text);
  }
}

export default Recipe;
