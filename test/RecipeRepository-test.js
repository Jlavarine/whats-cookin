import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import data from '../test/Sample-Data.js'
describe('RecipeRepository', () => {
  let recipeRepository;
  let recipe1;
  let recipe2;
  beforeEach( () => {
    recipe1 = new Recipe(data.sampleRecipeData[0].id, data.sampleRecipeData[0].image, data.sampleRecipeData[0].ingredients, data.sampleRecipeData[0].instructions, data.sampleRecipeData[0].name, data.sampleRecipeData[0].tags);
    recipe2 = new Recipe(data.sampleRecipeData[1].id, data.sampleRecipeData[1].image, data.sampleRecipeData[1].ingredients, data.sampleRecipeData[1].instructions, data.sampleRecipeData[1].name, data.sampleRecipeData[1].tags);
    recipeRepository = new RecipeRepository([recipe1, recipe2])
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be an instance of recipe', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('Should hold a list of all recipes', () => {
    recipeRepository.instantiateRecipes();
    expect(recipeRepository.allRecipes.length).to.equal(2);
  });

  it('Should filter all recipes based on a tag', () => {
    expect(recipeRepository.filterRecipesByTag(['starter']).length).to.equal(1);
    expect(recipeRepository.filterRecipesByTag(['starter'])[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('Should show no recipes if nothing matches the tag', () => {
    expect(recipeRepository.filterRecipesByTag(['lorem ipsum']).length).to.equal(0);
  });

  it('Should filter all recipes based on a recipe name', () => {
    expect(recipeRepository.filterRecipesByName('cookie').length).to.equal(1);
  });

  it('Should show no recipes if nothing matches user search', () => {
    expect(recipeRepository.filterRecipesByName('lorem ipsum').length).to.equal(0);
  });

  it('Should show no recipes if nothing matches user search', () => {
    expect(recipeRepository.filterRecipesByName("    ").length).to.equal(0);
  });
});
