class User {
  constructor() {
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };

  addRecipeToFavorites(recipe) {
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

  filterFavoriteRecipesByTag(userTag) {
    return this.favoriteRecipes.filter(recipe => recipe.tags.includes(userTag))
  };

  filterFavoriteRecipesByName(recipeName) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(recipeName))
  };
};
 export default User;
