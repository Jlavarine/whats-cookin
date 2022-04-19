import Pantry from './Pantry';

class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.userTags = [];
    this.pantry;
  };

  stockPantry(pantryData) {
    this.pantry = new Pantry(pantryData)
  }

  addRecipeToList(recipe, list) {
    if(!list) {
      list.push(recipe);
      return
    }
    const listNames = list.map(item => item.name);
    if(!listNames.includes(recipe.name))
      list.push(recipe)
  };

  removeRecipeFromList(recipe, list) {
    if(!recipe) {
      return
    }
    let foundRecipe = list.indexOf(recipe);
    list.splice(foundRecipe, 1);
  };

  filterFavoriteRecipesByTag(userTags) {
    let filteredRecipes = this.favoriteRecipes
     userTags.forEach(tag => {
       filteredRecipes = filteredRecipes.filter(recipe => recipe.tags.includes(tag))
     })
     return filteredRecipes
  };

  filterFavoriteRecipesByName(inputName) {
    return this.favoriteRecipes.filter(recipe => recipe.name.toLowerCase().includes(inputName.trim()));
  };
};
 export default User;
