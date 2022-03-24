import recipes from "./data/recipes";

const search = () => {
  const input = document.querySelector("[name='q']");

  const recipeSearch = (string) => {
    const titleResults = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(string)
    );
    console.log(titleResults);
  };

  const length = (e) => {
    const string = e.target.value.toLowerCase();
    const searchLength = string.length;
    if (searchLength > 2) {
      recipeSearch(string);
    }
  };
  input.addEventListener("input", (e) => length(e));
};

export default search;
