import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
describe('Ingredient', () => {

  it('should be an instance of ingredients', () => {
    const newIngredient = new Ingredient(19116, 'marshmallow', 425);

    expect(newIngredient).to.be.an.instanceof(Ingredient);
  });

  it('instantiate a new ingredient', () => {
    const newIngredient = new Ingredient(19116, 'marshmallow', 425);
    expect(newIngredient.id).to.equal(19116);
    expect(newIngredient.name).to.equal('marshmallow');
    expect(newIngredient.estimatedCost).to.equal(425);
  });
});
