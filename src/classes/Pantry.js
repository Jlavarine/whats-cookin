class Pantry {
    constructor (pantry) {
        this.pantry = pantry; //array of objects
        this.sharedIngredients = []
    }
    determineIfUserCanCook(recipeIngredients) {
        // recipeIngredients = [
        //     // {id: 1, quantity: {amount: 1}},
        //     // {id: 2, quantity: {amount: 1}},
        //     // {id: 3, quantity: {amount: 1}}
        // ]
        // this.pantry = [
        //     {ingredient: 1, amount: 0},
        //     {ingredient: 2, amount: 1},
        //     {ingredient: 3, amount: 1}
        // ]

       if (!recipeIngredients.length) {
           return false
       }
    

        let enoughAmounts = [];
        this.pantry.forEach(item => {
            recipeIngredients.forEach(ingredient => {
                ingredient.id === item.ingredient ? this.sharedIngredients.push(item) : ''
                ingredient.quantity.amount <= item.amount ? enoughAmounts.push(true) :
                    enoughAmounts.push(false)
            })
        });

        if (recipeIngredients.length > this.sharedIngredients.length || enoughAmounts.includes(false)){
            return false
        } else if (recipeIngredients.length === this.sharedIngredients.length && !enoughAmounts.includes(false)){
            return true
        }
    }
}

export default Pantry;