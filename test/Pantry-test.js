import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import Recipe from '../src/classes/Recipe';
import data from '../test/Sample-Data.js'
describe('Pantry', () => {
  let recipe1;
  let recipe2;
  let recipe3;
  let pantry;
  let pantry2;
  beforeEach( () => {
    recipe1 = new Recipe(data.sampleRecipeData[0].id, data.sampleRecipeData[0].image, data.sampleRecipeData[0].ingredients, data.sampleRecipeData[0].instructions, data.sampleRecipeData[0].name, data.sampleRecipeData[0].tags);
    recipe2 = new Recipe(data.sampleRecipeData[1].id, data.sampleRecipeData[1].image, data.sampleRecipeData[1].ingredients, data.sampleRecipeData[1].instructions, data.sampleRecipeData[1].name, data.sampleRecipeData[1].tags);
    recipe3 = new Recipe(data.sampleRecipeData[2].id, data.sampleRecipeData[2].image, data.sampleRecipeData[2].ingredients, data.sampleRecipeData[2].instructions, data.sampleRecipeData[2].name, data.sampleRecipeData[2].tags);
    // recipeRepository = new RecipeRepository([recipe1, recipe2])
    pantry = new Pantry(data.sampleUserData[0].pantry)
    pantry2 = new Pantry([])
    recipe1.allIngredients = recipe1.allIngredients = [
    {
      "id": 20081,
      "name": 'pepper',
      "quantity": {
        "amount": 1.5,
        "unit": "c"
    }
  },
    {
      "id": 18372,
      "name": 'salad',
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
    }
  },
    {
      "id": 1123,
      "name": 'salsa',
      "quantity": {
      "amount": 1,
      "unit": "large"
    }
    },
    {
    "id": 19335,
    "name": 'spinach',
    "quantity": {
    "amount": 0.5,
    "unit": "c"
    }
    },
    {
    "id": 19206,
    "name": 'spuds',
    "quantity": {
    "amount": 3,
    "unit": "Tbsp"
    }
    },
    {
    "id": 19334,
    "name": 'spaghetti',
    "quantity": {
    "amount": 0.5,
    "unit": "c"
    }
    },
    {
    "id": 2047,
    "name": 'sesame seeds',
    "quantity": {
    "amount": 0.5,
    "unit": "tsp"
    }
    },
    {
    "id": 1012047,
    "name": 'satsumas',
    "quantity": {
    "amount": 2,
    "unit": "servings"
    }
    },
    {
    "id": 10019903,
    "name": 'sprinkles',
    "quantity": {
    "amount": 2,
    "unit": "c"
    }
    },
    {
    "id": 1145,
    "name": 'sangria',
    "quantity": {
    "amount": 0.5,
    "unit": "c"
    }
    }
    ]
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

  it('should determine ingredients missing from a recipe', () => {
    pantry.determineMissingIngredients(recipe3.ingredients)
    expect(pantry.shoppingList).to.deep.equal({"2": 1.5})
  });

  it('if no ingredients are missing, then the pantry\s shopping list should be empty', () => {
    pantry.determineMissingIngredients(recipe1.ingredients)
    expect(pantry.shoppingList).to.deep.equal({})
  });

  it('should be able to add names to pantry ingredients', () => {
    pantry.addNamesToPantry(recipe1.allIngredients)
    expect(pantry.pantryWithNames[0].name).to.deep.equal('pepper')
  });

  it('should turn shoppingList into an array of objects', () => {
    pantry.shuffleShoppingList(recipe1.ingredients,recipe1.allIngredients)
    expect(pantry.shoppingList).to.be.an('array')
  });

})
