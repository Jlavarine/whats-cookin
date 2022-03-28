const data = require('../data/ingredients');
import Ingredient from './Ingredient';

class Recipe {
    constructor (id, image, ingredients, instructions, name, tags) {
        this.id = id;
        this.image = image;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.name = name;
        this.tags = tags;
        this.allIngredients = this.instantiateIngredients()
    };
    instantiateIngredients() {
        return data.ingredientsData.map(ingredient => {
            return new Ingredient(ingredient.id, ingredient.name, ingredient.estimatedCostInCents)
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

};

export default Recipe;