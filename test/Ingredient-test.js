import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import data from '../test/Sample-Data.js'
describe('Ingredient', () => {

  it('should be an instance of ingredients', () => {
    const newIngredient = new Ingredient(data.sampleIngredientData[0].id, data.sampleIngredientData[0].name, data.sampleIngredientData[0].estimatedCostInCents);
    // console.log(data.sampleIngredientData)
    expect(newIngredient).to.be.an.instanceof(Ingredient);
  });

  it('should have a property of id, name, and estimatedCost', () => {
    const newIngredient = new Ingredient(data.sampleIngredientData[0].id, data.sampleIngredientData[0].name, data.sampleIngredientData[0].estimatedCostInCents);
    expect(newIngredient.id).to.equal(20081);
    expect(newIngredient.name).to.equal('wheat flour');
    expect(newIngredient.estimatedCost).to.equal(142);
  });
});
