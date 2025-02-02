class Pantry {
    constructor (pantry) {
        this.pantry = pantry; 
        this.sharedIngredients = []
        this.shoppingList = {}
        this.pantryWithNames;
    }
    determineIfUserCanCook(recipeIngredients) {
      if (!recipeIngredients.length) {
           return false
       }
        let enoughAmounts = [];
        this.pantry.forEach(item => {
            recipeIngredients.forEach(ingredient => {
                ingredient.id === item.ingredient ? this.sharedIngredients.push(item) : ''
                if(ingredient.quantity.amount <= item.amount && ingredient.id === item.ingredient) {
                  enoughAmounts.push(true)
                } else if (ingredient.quantity.amount > item.amount && ingredient.id === item.ingredient) {
                  enoughAmounts.push(false)
                    this.shoppingList[item.ingredient] = ingredient.quantity.amount - item.amount
              }
            })
        });
        if (recipeIngredients.length > this.sharedIngredients.length || enoughAmounts.includes(false)){
            return false
        } else if (recipeIngredients.length === this.sharedIngredients.length && !enoughAmounts.includes(false)){
            return true
        }
    }

    determineMissingIngredients(recipeIngredients) {
      const pantryIds = this.pantry.map(item => item.ingredient)
      recipeIngredients.forEach(ingredient => {
        if(!pantryIds.includes(ingredient.id)){
          if(!this.shoppingList[ingredient.id]) {
            this.shoppingList[ingredient.id] = ingredient.quantity.amount
          }
          }
      })
      return this.shoppingList
    }

    addNamesToPantry(recipeIngredients) {
      this.pantryWithNames = this.pantry.reduce((acc,item) => {
        recipeIngredients.forEach(ingredient => {
          if(ingredient.id === item.ingredient) {
            acc.push({name: ingredient.name, id: ingredient.id, amount: item.amount})
          }
        })
        return acc
      },[])
    }

    shuffleShoppingList(recipeIngredients, allIngredients) {
        this.shoppingList = Object.keys(this.shoppingList).map(key => {
        return {
          name: allIngredients.find(ing => ing.id === parseInt(key)).name,
          id: parseInt(key),
          quantity: this.shoppingList[key],
          unit: recipeIngredients.find(ing => ing.id === parseInt(key)).quantity.unit
        }
      })
    }
}
export default Pantry;
