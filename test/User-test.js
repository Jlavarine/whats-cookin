import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

describe('Users', () => {
  let user;
  let recipe;
  let recipe2;
  let recipe3;
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
    recipe2 = new Recipe(2, 'example.com',
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
    recipe3 = new Recipe(3, 'example.com',
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
    }], 'Cookies', ['food','starter'])
    user = new User();
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('Should hold a list of all favorite recipes', () => {
    user.addRecipeToFavorites(recipe);
    expect(user.favoriteRecipes[0]).to.deep.equal(recipe);
  });

  it('Should be able to remove favorite recipes', () => {
    user.addRecipeToFavorites(recipe);
    user.addRecipeToFavorites(recipe);
    user.addRecipeToFavorites(recipe);
    user.removeRecipeFromFavorites(recipe);
    expect(user.favoriteRecipes.length).to.equal(2);
  });

  it('Should hold a list of recipes to cook', () => {
    user.addRecipeToCookList(recipe);
    expect(user.recipesToCook[0]).to.deep.equal(recipe);
  });

  it('Should be able to remove from recipes to cook', () => {
    user.addRecipeToCookList(recipe);
    user.addRecipeToCookList(recipe);
    user.addRecipeToCookList(recipe);
    user.removeRecipeFromCookList(recipe);
    expect(user.recipesToCook.length).to.equal(2);
  });

  it('Should be able to filter favorite recipes by tags', () => {
    user.addRecipeToFavorites(recipe);
    user.addRecipeToFavorites(recipe2);
    user.addRecipeToFavorites(recipe3);
    expect(user.filterFavoriteRecipesByTag('starter').length).to.equal(3);
  });

  it('Should show no recipes if nothing matches the tag', () => {
    expect(user.filterFavoriteRecipesByTag('lorem ipsum').length).to.equal(0);
  });

  it('Should be able to filter favorite recipes by names', () => {
    user.addRecipeToFavorites(recipe);
    user.addRecipeToFavorites(recipe2);
    user.addRecipeToFavorites(recipe3);
    expect(user.filterFavoriteRecipesByName('Dirty').length).to.equal(0);
  });

  it('Should show no recipes if nothing matches user search', () => {
    expect(user.filterFavoriteRecipesByName("    ").length).to.equal(0);
  });
});
