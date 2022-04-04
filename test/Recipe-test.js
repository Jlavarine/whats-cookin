import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';




describe('Recipe', () => {
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
    });

    it('should be an instance of Recipe', () => {

      expect(recipe).to.be.an.instanceof(Recipe);
    });

    it('should have an id', () => {
        expect(recipe.id).to.equal(1);
    });

    it('should have an image', () => {
        expect(recipe.image).to.equal('example.com');
    });

    it('should have ingredients', () => {
        expect(recipe.ingredients.length).to.equal(1);
        expect(recipe.ingredients[0].id).to.equal(1);

    });

    it('should have instructions', () => {
        expect(recipe.instructions[0].instruction).to.equal('cook.');
    });

    it('should have a name', () => {
        expect(recipe.name).to.equal("Cookies");
    });

    it('should have tags', () => {
        expect(recipe.tags).to.deep.equal(['food','starter']);
    });

    it('should determine ingredients needed', () => {
      expect(recipe.determineIngredientsNeeded(recipe.ingredients)).to.deep.equal(['pear'])
    });

    it('should determine cost of ingredients', () => {
      expect(recipe.calculateCostofIngredients(recipe.ingredients)).to.equal('4.56')
    });
});
