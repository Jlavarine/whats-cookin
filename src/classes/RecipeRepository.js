// const data = require('../data/recipes');
import Recipe from './Recipe';
class RecipeRepository {
  constructor(data) {
    this.recipeData = data;
    this.allRecipes;

    // One class to get you started!
  };
  instantiateRecipes() {
    console.log(this.recipeData)
    this.allRecipes = this.recipeData.recipeData.map(recipe => {
      return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
    })
  }
  filterRecipesByTag(userTag) {
    this.instantiateRecipes();
    return this.allRecipes.filter(recipe => recipe.tags.includes(userTag))
  };
  filterRecipesByName(inputName) {
    this.instantiateRecipes();
    this.allRecipes = this.allRecipes.filter(recipe => recipe.name.includes(inputName.trim()));
    return this.allRecipes
  };
};

export default RecipeRepository;
