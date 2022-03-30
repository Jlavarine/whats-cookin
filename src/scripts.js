import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/RecipeRepository';

const navButtons = document.querySelector('.nav');
const mainRecipeDisplay = document.querySelector('.main__recipe-images-box');
const recipeHeader = document.querySelector('.main__recipe-header')
const recipeCards = document.querySelectorAll('main__recipe-card')


window.addEventListener('load', instantiateRecipeRepo)
mainRecipeDisplay.addEventListener('click', (e) => {
    returnRecipe(e)
})
navButtons.addEventListener('click', function(event) {
    fireButton(event);
})


function returnRecipe (e) {
    console.log(e.target.dataset.recipe);
}

function fireButton(event){
    if (event)
    console.log(event.target.dataset.button);
}

function instantiateRecipeRepo (){
    const recipeRepo = new RecipeRepository();
    recipeRepo.instantiateRecipes()
    populateRecipeCards(recipeRepo)
}


function populateRecipeCards(recipeRepo) {

    recipeRepo.allRecipes.forEach((recipe, index) => {
        mainRecipeDisplay.innerHTML +=
        `<div class="main__recipe-card" data-recipe="${recipeRepo.allRecipes[index].name}">
        <div class="main__recipe-card-image-box">
        <img class="main__recipe-card-image" data-recipe="${recipeRepo.allRecipes[index].name}" src=${recipeRepo.allRecipes[index].image} alt="${recipeRepo.allRecipes[index].name}">
        </div>
        <p class="main__recipe-card-text" data-recipe="${recipeRepo.allRecipes[index].name}" >${recipeRepo.allRecipes[index].name}</p>
         <div class="main__recipe-card-filters" data-recipe="${recipeRepo.allRecipes[index].name}">
           <p class="main__recipe-card-tag" data-recipe="${recipeRepo.allRecipes[index].name}">${recipeRepo.allRecipes[index].tags}</p>
           </div>
          <p class="main__recipe-card-price" data-recipe="${recipeRepo.allRecipes[index].name}">$$$$</p>
        </div> `
    })
}



//add a function to create a recipe card w/
/* <div class="main__recipe-card" datas-recipe=`${recipe.name}`>
<img class="main__recipe-card-image" src="https://spoonacular.com/recipeImages/595736-556x370.jpg">
<p class="main__recipe-card-text">Loaded Chocolate Chip Pudding Cookie Cups</p>
 <div class="main__recipe-card-filters">
   <p class="main__recipe-card-tag">Dinner</p>
  <p class="main__recipe-card-price">$$$$</p>
 </div>
</div> */
