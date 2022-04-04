import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';






describe('RecipeRepository', () => {
  let recipeRepository;
  let recipe;
  beforeEach( () => {
    recipe = new Recipe(1, 'example.com',
    [{
      id: 1,
      name: 'pear',
      estimatedCostInCents: 456,
      quantity: {
        amount: 1,
        unit: 'c'
      }
    }], [{
      instruction: 'cook.',
      number: 1
    }], 'Cookies', ['food','starter']);
    recipeRepository = new RecipeRepository([recipe])
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be an instance of recipe', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('Should hold a list of all recipes', () => {
    recipeRepository.instantiateRecipes();
    expect(recipeRepository.allRecipes.length).to.equal(1);
  });

  it('Should filter all recipes based on a tag', () => {
    expect(recipeRepository.filterRecipesByTag('starter').length).to.equal(1);
    expect(recipeRepository.filterRecipesByTag('starter')[0].name).to.equal('Cookies');
  });

  it('Should filter all recipes based on a recipe name', () => {
    expect(recipeRepository.filterRecipesByName('cookies').length).to.equal(1);
  });

  it('Should show no recipes if nothing matches user search', () => {
    expect(recipeRepository.filterRecipesByName('DFECVHCJSB').length).to.equal(0);
  })

  it('Should show no recipes if nothing matches user search', () => {
    expect(recipeRepository.filterRecipesByName("    ").length).to.equal(0);
  })

});
