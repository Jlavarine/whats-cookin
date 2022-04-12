import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';
import data from '../test/Sample-Data.js'
describe('Users', () => {
  let user;
  let recipe1;
  let recipe2;
  beforeEach( () => {
    recipe1 = new Recipe(data.sampleRecipeData[0].id, data.sampleRecipeData[0].image, data.sampleRecipeData[0].ingredients, data.sampleRecipeData[0].instructions, data.sampleRecipeData[0].name, data.sampleRecipeData[0].tags);
    recipe2 = new Recipe(data.sampleRecipeData[1].id, data.sampleRecipeData[1].image, data.sampleRecipeData[1].ingredients, data.sampleRecipeData[1].instructions, data.sampleRecipeData[1].name, data.sampleRecipeData[1].tags);
    user = new User();
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('Should hold a list of all favorite recipes', () => {
    user.addRecipeToFavorites(recipe1);
    expect(user.favoriteRecipes[0]).to.deep.equal(recipe1);
  });

  it('Should be able to remove favorite recipes', () => {
    user.addRecipeToFavorites(recipe1);
    user.addRecipeToFavorites(recipe2);
    user.removeRecipeFromFavorites(recipe2);
    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0]).to.deep.equal(recipe1);
  });

  it('Should hold a list of recipes to cook', () => {
    user.addRecipeToCookList(recipe1);
    expect(user.recipesToCook[0]).to.deep.equal(recipe1);
  });

  it('Should be able to remove from recipes to cook', () => {
    user.addRecipeToCookList(recipe1);
    user.addRecipeToCookList(recipe2);
    user.removeRecipeFromCookList(recipe1);
    expect(user.recipesToCook.length).to.equal(1);
    expect(user.recipesToCook[0]).to.deep.equal(recipe2);
  });

  it('Should be able to filter favorite recipes by tags', () => {
    user.addRecipeToFavorites(recipe1);
    user.addRecipeToFavorites(recipe2);
    expect(user.filterFavoriteRecipesByTag(['starter']).length).to.equal(1);
  });

  it('Should show no recipes if nothing matches the tag', () => {
    expect(user.filterFavoriteRecipesByTag(['lorem ipsum']).length).to.equal(0);
  });

  it('Should be able to filter favorite recipes by names', () => {
    user.addRecipeToFavorites(recipe1);
    user.addRecipeToFavorites(recipe2);
    expect(user.filterFavoriteRecipesByName('cookie').length).to.equal(1);
  });

  it('Should show no recipes if nothing matches user search', () => {
    expect(user.filterFavoriteRecipesByName("    ").length).to.equal(0);
  });
});
