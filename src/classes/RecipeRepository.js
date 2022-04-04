import Recipe from './Recipe';
class RecipeRepository {
  constructor(data) {
    this.recipeData = data;
    this.allRecipes;
  };

  instantiateRecipes() {
    this.allRecipes = this.recipeData.map(recipe => {
      return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags);
    });
  };

  filterRecipesByTag(userTags) {
    this.instantiateRecipes();
    let filteredRecipes = this.allRecipes
     userTags.forEach(tag => {
       filteredRecipes = filteredRecipes.filter(recipe => recipe.tags.includes(tag))
     })
     return filteredRecipes
  };

  filterRecipesByName(inputName) {
    if(!inputName.trim()) {
      return []
    }
    this.instantiateRecipes();
    return this.allRecipes.filter(recipe => recipe.name.toLowerCase().includes(inputName.trim()));
  };
};

export default RecipeRepository;
