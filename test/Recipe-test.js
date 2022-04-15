import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import data from '../test/Sample-Data.js'
describe('Recipe', () => {
    let recipe1;
    let recipe2;
    beforeEach( () => {
        recipe1 = new Recipe(data.sampleRecipeData[0].id, data.sampleRecipeData[0].image, data.sampleRecipeData[0].ingredients, data.sampleRecipeData[0].instructions, data.sampleRecipeData[0].name, data.sampleRecipeData[0].tags);
        recipe2 = new Recipe(data.sampleRecipeData[1].id, data.sampleRecipeData[1].image, data.sampleRecipeData[1].ingredients, data.sampleRecipeData[1].instructions, data.sampleRecipeData[1].name, data.sampleRecipeData[1].tags);
    });

    it('should be an instance of Recipe', () => {

      expect(recipe1).to.be.an.instanceof(Recipe);
      expect(recipe2).to.be.an.instanceof(Recipe);
    });

    it('should have an id', () => {
        expect(recipe1.id).to.equal(595736);
        expect(recipe2.id).to.equal(678353);
    });

    it('should have an image', () => {
        expect(recipe1.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
        expect(recipe2.image).to.equal("https://spoonacular.com/recipeImages/678353-556x370.jpg");

    });

    it('should have ingredients', () => {
        expect(recipe1.ingredients).to.deep.equal(data.sampleRecipeData[0].ingredients);
        expect(recipe1.ingredients.length).to.equal(10);
        expect(recipe1.ingredients[0].id).to.equal(20081);

    });

    it('should have instructions', () => {
        expect(recipe1.instructions).to.deep.equal(data.sampleRecipeData[0].instructions);
    });

    it('should have a name', () => {
        expect(recipe1.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    });

    it('should have tags', () => {
        expect(recipe1.tags).to.deep.equal(data.sampleRecipeData[0].tags);
    });

    it('should have ingredients be instances of the ingredient class', () => {
      recipe1.instantiateIngredients(recipe1.ingredients);
      expect(recipe1.allIngredients[0]).to.be.an.instanceof(Ingredient);
    });

    it('should determine ingredients needed', () => {
      expect(recipe1.determineIngredientsNeeded(data.sampleIngredientData)[0]).to.deep.equal(data.sampleIngredientData[0].name);
      expect(recipe1.determineIngredientsNeeded(data.sampleIngredientData)[6]).to.deep.equal(data.sampleIngredientData[6].name);
    });

    it('should determine cost of ingredients', () => {
      expect(recipe1.calculateCostofIngredients(data.sampleIngredientData)).to.equal('56.97');
    });

    it('should return recipe instructions', () => {
      expect(recipe1.findInstructions()).to.deep.equal(data.sampleRecipeData[0].instructions);
    });
});
