class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };

  addRecipeToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe))
    this.favoriteRecipes.push(recipe);
  };

  removeRecipeFromFavorites(recipe) {
    let foundRecipe = this.favoriteRecipes.indexOf(recipe)
    this.favoriteRecipes.splice(foundRecipe, 1);
  };

  addRecipeToCookList(recipe) {
    this.recipesToCook.push(recipe);
  };

  removeRecipeFromCookList(recipe) {
    let foundRecipe = this.recipesToCook.indexOf(recipe)
    this.recipesToCook.splice(foundRecipe, 1);
  };

  filterFavoriteRecipesByTag(inputTag) {
    this.favoriteRecipes = this.favoriteRecipes.filter(recipe => recipe.tags.includes(inputTag))
    return this.favoriteRecipes
  };

  filterFavoriteRecipesByName(inputName) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(inputName.trim()))
  };
};
 export default User;
