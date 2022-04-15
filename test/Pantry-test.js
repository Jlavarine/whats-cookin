import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import Recipe from '../src/classes/Recipe';
import data from '../test/Sample-Data.js'
describe('Pantry', () => {
//   let recipeRepository;
  let recipe1;
  let recipe2;
  let pantry;
  let pantry2;
  beforeEach( () => {
    recipe1 = new Recipe(data.sampleRecipeData[0].id, data.sampleRecipeData[0].image, data.sampleRecipeData[0].ingredients, data.sampleRecipeData[0].instructions, data.sampleRecipeData[0].name, data.sampleRecipeData[0].tags);
    recipe2 = new Recipe(data.sampleRecipeData[1].id, data.sampleRecipeData[1].image, data.sampleRecipeData[1].ingredients, data.sampleRecipeData[1].instructions, data.sampleRecipeData[1].name, data.sampleRecipeData[1].tags);
    // recipeRepository = new RecipeRepository([recipe1, recipe2])
    pantry = new Pantry(data.sampleUserData[0].pantry)
    pantry2 = new Pantry([])
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should hold all of a user\'s ingredients in the pantry', () => {
    expect(pantry.pantry.length).to.equal(10);
    expect(pantry.pantry[0]).to.deep.equal({
       "ingredient": 20081,
       "amount": 4
      })
  })

  it('can have a pantry with no ingredients', () => {
    expect(pantry2.pantry.length).to.equal(0);
    expect(pantry2.pantry).to.deep.equal([])
  })     

  it('should keep track of shared ingredients with the recipe', () => {
    pantry.determineIfUserCanCook(recipe1.ingredients)
    expect(pantry.sharedIngredients.length).to.equal(10)
  });

  it('should hold an array of ingredients shared between pantry and recipe', () => {
    pantry.determineIfUserCanCook(recipe1.ingredients)
    expect(pantry.sharedIngredients[5]).to.deep.equal({
        "ingredient": 19334,
        "amount": 5
      })
  });

  it('should return true if user can cook recipe', () => {
    expect(pantry.determineIfUserCanCook(recipe1.ingredients)).to.equal(true)

  });

  it('should return false if user can not cook recipe', () => {
    expect(pantry.determineIfUserCanCook([])).to.equal(false)
  });
})
