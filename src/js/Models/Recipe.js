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

  get searchInIngredients() {
    return [...this.ingredients.map((i) => i.ingredient)].join().toLowerCase();
  }

  get searchInUstensiles() {
    return [this.ustensiles].join().toLowerCase();
  }

  get searchInAppareils() {
    return [this.appareils].join().toLowerCase();
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
