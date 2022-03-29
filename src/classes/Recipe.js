const data = require('../data/ingredients');
import Ingredient from './Ingredient';

class Recipe {
    constructor (id, image, ingredients, instructions, name, tags) {
        this.id = id;
        this.image = image;
        this.ingredients = ingredients; //id & quantity
        this.instructions = instructions;
        this.name = name;
        this.tags = tags;
        this.allIngredients = this.instantiateIngredients()
        //^intantiations of Ingredient class, has id, name, cost
    };
    instantiateIngredients() {
        return data.ingredientsData.map(ingredient => {
            return new Ingredient(ingredient.id, ingredient.name, ingredient.estimatedCostInCents)
            // line 898 of the ingredients.js only has a cost
        })

    }
    determineIngredientsNeeded() {
        return this.ingredients.reduce((arr, ingredient) => {
                this.allIngredients.forEach(e => {
                    if (e.id === ingredient.id){
                        arr.push(e.name)
                    }
                })
                return arr
        }, [])
    }
    calculateCostofIngredients() {
      return parseFloat(this.ingredients.reduce((num, ingredient) => {
        this.allIngredients.forEach(e => {
          if (e.id === ingredient.id){
            num += (e.estimatedCost * ingredient.quantity.amount) / 100
          }
        })
        console.log(num)
        return num
      },0).toFixed(2))
    };

};

export default Recipe;
