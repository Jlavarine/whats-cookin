class Pantry {
    constructor (pantry) {
        this.pantry = pantry; //array of objects
    }
    determineIfUserCanCook(recipeIngredients) {
        // recipeIngredients = [
        //     {id: 1, quantity: {amount: 1}},
        //     {id: 2, quantity: {amount: 1}},
        //     {id: 3, quantity: {amount: 1}}
        // ]
        // this.pantry = [
        //     {ingredient: 1, amount: 2},
        //     {ingredient: 2, amount: 2},
        //     {ingredient: 3, amount: 0}
        // ]
        
        let sharedIngredients = [];
        let sharedQuantity = [];
        this.pantry.forEach(item => {
            recipeIngredients.forEach(ingredient => {
               if(ingredient.quantity.amount <= item.amount){
                   sharedQuantity.push(true)
                } else {
                    sharedQuantity.push(false)
                }
            })
        });

        this.pantry.forEach(item => {
            recipeIngredients.forEach(ingredient => {
                if (ingredient.id === item.ingredient) {
                    sharedIngredients.push(item)
                }
            })
        })

        if (recipeIngredients.length > sharedIngredients.length || sharedQuantity.includes(false)){
            return false
        } else if (recipeIngredients.length === sharedIngredients.length && !sharedQuantity.includes(false)){
            return true
        }
    }
}

export default Pantry;