import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
const data = require('../src/data/recipes')


describe('Recipe', () => {
    let recipe;
    beforeEach( () => {
        recipe = new Recipe(data.recipeData[0].id, data.recipeData[0].image, data.recipeData[0].ingredients, data.recipeData[0].instructions, data.recipeData[0].name, data.recipeData[0].tags)
    })
    it('should be an instance of Recipe', () => {

      expect(recipe).to.be.an.instanceof(Recipe);
    });

    it('should have an id', () => {
        expect(recipe.id).to.equal(595736);
    });

    it('should have an image', () => {
        expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
    });

    it('should have ingredients', () => {
        expect(recipe.ingredients).to.equal(data.recipeData[0].ingredients);
    });

    it('should have instructions', () => {
        expect(recipe.instructions).to.equal(data.recipeData[0].instructions);
    });

    it('should have a name', () => {
        expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    });

    it('should have tags', () => {
        expect(recipe.tags).to.equal(data.recipeData[0].tags);
    });

    it('should have all of the ingredients', () => {
      recipe.instantiateIngredients();
        expect(recipe.allIngredients.length).to.equal(247);
    });
    it('should determine ingredients needed', () => {
      expect(recipe.ingredients.length).to.equal(recipe.determineIngredientsNeeded().length)
    });
    it('should have wheat flour as the first element', () => {
      expect(recipe.determineIngredientsNeeded()[0]).to.equal('wheat flour')
    });
    it('should be able to return the cost of a recipe', () => {
      expect(recipe.calculateCostofIngredients()).to.equal(177.76)
    })

});
