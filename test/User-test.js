import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';
const data = require('../src/data/recipes');

describe('Users', () => {
  let user;
  let recipe;
  let recipe2;
  let recipe3;
  beforeEach( () => {
    recipe = new Recipe(data.recipeData[0].id, data.recipeData[0].image, data.recipeData[0].ingredients, data.recipeData[0].instructions, data.recipeData[0].name, data.recipeData[0].tags)
    recipe2 = new Recipe(data.recipeData[1].id, data.recipeData[1].image, data.recipeData[1].ingredients, data.recipeData[1].instructions, data.recipeData[1].name, data.recipeData[1].tags)
    recipe3 = new Recipe(data.recipeData[2].id, data.recipeData[2].image, data.recipeData[2].ingredients, data.recipeData[2].instructions, data.recipeData[2].name, data.recipeData[2].tags)
    user = new User();
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });
  it('Should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });
  it('Should hold a list of all favorite recipes', () => {
    user.addRecipeToFavorites(recipe)
    expect(user.favoriteRecipes[0]).to.deep.equal(recipe);
  });
  it('Should be able to remove favorite recipes', () => {
    user.addRecipeToFavorites(recipe)
    user.addRecipeToFavorites(recipe)
    user.addRecipeToFavorites(recipe)
    user.removeRecipeFromFavorites(recipe);
    expect(user.favoriteRecipes.length).to.equal(2);
  });
  it('Should hold a list of recipes to cook', () => {
    user.addRecipeToCookList(recipe)
    expect(user.recipesToCook[0]).to.deep.equal(recipe);
  });
  it('Should be able to remove from recipes to cook', () => {
    user.addRecipeToCookList(recipe)
    user.addRecipeToCookList(recipe)
    user.addRecipeToCookList(recipe)
    user.removeRecipeFromCookList(recipe)
    expect(user.recipesToCook.length).to.equal(2);
  });
  it('Should be able to filter favorite recipes by tags', () => {
    user.addRecipeToFavorites(recipe)
    user.addRecipeToFavorites(recipe2)
    user.addRecipeToFavorites(recipe3)
    expect(user.filterFavoriteRecipesByTag('starter').length).to.equal(1);
  });
  it('Should be able to filter favorite recipes by names', () => {
    user.addRecipeToFavorites(recipe)
    user.addRecipeToFavorites(recipe2)
    user.addRecipeToFavorites(recipe3)
    expect(user.filterFavoriteRecipesByName('Dirty').length).to.equal(1);
  });

});
