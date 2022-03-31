import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/RecipeRepository';

const navButtons = document.querySelector('.nav');
const mainRecipeDisplay = document.querySelector('.main__recipe-images-box');
const recipeHeader = document.querySelector('.main__recipe-header');
const recipeCards = document.querySelectorAll('main__recipe-card');
const mainRenderedRecipeArea = document.querySelector('.main__rendered-recipe-area');
const mainRenderedRecipeBox = document.querySelector('.main__rendered-recipe-box')
const mainRenderedRecipeIngredientsHeader = document.querySelector('.main__rendered-recipe-ingredients-header');
const mainRenderedRecipeInstructionsHeader = document.querySelector('.main__rendered-recipe-instructions-header');
const mainRenderedReceipeInstructions = document.querySelector('.main__rendered-recipe-instructions');
const mainRenderedReceipeIngredients = document.querySelector('.main__rendered-recipe-ingredients');
const mainRenderedReceipeImage = document.querySelector('.main__rendered-recipe-image');
const recipeRepo = new RecipeRepository();

window.addEventListener('load', instantiateRecipeRepo)
mainRecipeDisplay.addEventListener('click', (e) => {
    returnRecipe(e)
    renderRecipeInfo(e)
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

function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};

function renderRecipeInfo(e) {
  let currentRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === e.target.dataset.recipe)
  let currentIngredients = currentRecipe.determineIngredientsNeeded()
  let currentIngredientAmounts = currentRecipe.ingredients
  console.log(currentIngredients)
  console.log(currentIngredientAmounts)

  hide(mainRecipeDisplay);
  show(mainRenderedRecipeArea);
  show(mainRenderedRecipeInstructionsHeader);
  show(mainRenderedRecipeIngredientsHeader);
  show(mainRenderedReceipeInstructions);
  show(mainRenderedReceipeIngredients);
  show(mainRenderedReceipeImage);
  recipeHeader.innerText = e.target.dataset.recipe
  mainRenderedReceipeImage.src = currentRecipe.image
  mainRenderedRecipeArea.innerHTML = `
        <section class="main__rendered-recipe-cost">recipe cost: $${currentRecipe.calculateCostofIngredients()}
        </section>`
      currentIngredientAmounts.forEach((ingredient, index) => {
        mainRenderedReceipeIngredients.innerHTML +=
        `<div class="main__rendered-recipe-box">
          <section class="main__rendered-recipe-ingredients">${ingredient.quantity.amount} ${ingredient.quantity.unit} ${currentIngredients[index]}
          </section>
        </div>`
        })
        currentRecipe.instructions.forEach(instruction =>{
        mainRenderedReceipeInstructions.innerHTML +=
        `<div class='main__rendered-recipe-instructions'>
          <section class="main__rendered-recipe-instructions">${instruction.number} ${instruction.instruction}</section>
        </div>`
        })
      }
