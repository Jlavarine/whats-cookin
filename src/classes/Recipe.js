import Ingredient from './Ingredient';

class Recipe {
    constructor (id, image, ingredients, instructions, name, tags) {
        this.id = id;
        this.image = image;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.name = name;
        this.tags = tags;
        this.allIngredients;
    };

    instantiateIngredients(ingredientData) {
        this.allIngredients = ingredientData.map(ingredient => {
            return new Ingredient(ingredient.id, ingredient.name, ingredient.estimatedCostInCents);
        });
    };

    determineIngredientsNeeded(ingredientData) {
      this.instantiateIngredients(ingredientData);
        return this.ingredients.reduce((arr, ingredient) => {
                this.allIngredients.forEach(e => {
                    if (e.id === ingredient.id){
                        arr.push(e.name);
                    };
                });
                return arr;
        }, []);
    };

    calculateCostofIngredients(ingredientData) {
      this.instantiateIngredients(ingredientData);
      return parseFloat(this.ingredients.reduce((num, ingredient) => {
        this.allIngredients.forEach(e => {
          if (e.id === ingredient.id){
            num += (e.estimatedCost * ingredient.quantity.amount) / 100;
          };
        });
        return num;
      },0).toFixed(2));
    };

    findInstructions() {
      return this.instructions
    };
};

export default Recipe;
