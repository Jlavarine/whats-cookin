import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
const data = require('../src/data/recipes');

describe('RecipeRepository', () => {
  let recipeRepository;
  let recipe;
  beforeEach( () => {
    recipe = new Recipe(data.recipeData[0].id, data.recipeData[0].image, data.recipeData[0].ingredients, data.recipeData[0].instructions, data.recipeData[0].name, data.recipeData[0].tags)
    recipeRepository = new RecipeRepository(recipe);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
  it('Should be an instance of recipe', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });
  it.skip('Should hold a list of all recipes', () => {
    recipeRepository.instantiateRecipes();
    expect(recipeRepository.allRecipes.length).to.equal(50);
  });
  it.skip('Should filter all recipes based on a tag', () => {
    expect(recipeRepository.filterRecipesByTag('starter').length).to.equal(9);
    expect(recipeRepository.filterRecipesByTag('starter')[0].name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });
  it.skip('Should filter all recipes based on a recipe name', () => {
    expect(recipeRepository.filterRecipesByName("Loaded Chocolate Chip Pudding Cookie Cups").length).to.equal(1);
    console.log(recipeRepository.filterRecipesByName("Cookie"))
  });
});
