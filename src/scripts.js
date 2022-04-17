import './styles.css';
import { fetchData } from './apiCalls';
import { postDataset } from './apiCalls';
import './images/turing-logo.png';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
import dom from '../src/domUpdates.js'
// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const navButtons = document.querySelector('.nav');
const mainRecipeDisplay = document.querySelector('.main__recipe-images-box');
const recipeHeader = document.querySelector('.main__recipe-header');
const mainRenderedRecipeArea = document.querySelector('.main__rendered-recipe-area');
const mainRenderedRecipeIngredientsHeader = document.querySelector('.main__rendered-recipe-ingredients-header');
const mainRenderedRecipeInstructionsHeader = document.querySelector('.main__rendered-recipe-instructions-header');
const mainRenderedReceipeInstructions = document.querySelector('.main__rendered-recipe-instructions');
const mainRenderedReceipeIngredients = document.querySelector('.main__rendered-recipe-ingredients');
const mainRenderedReceipeImage = document.querySelector('.main__rendered-recipe-image');
const sidebarRight = document.querySelector('.sidebar__right');
const recipeSearchInput = document.getElementById('searchbar');
const recipeSearchButton = document.querySelector('.top__search-bar-button');
const addFavoritesButton = document.querySelector('.add-favorites-button');
const removeFavoritesButton = document.querySelector('.remove-favorites-button');
const addToCookListButton = document.querySelector('.add-recipe-to-cook-button');
const cookButton = document.querySelector('.cook-button')
const filterByBox = document.querySelector('.main__filter-paragraph');
const allFilterButtons = document.querySelectorAll('.sidebar__right-filter-button')
const userInputIngredientID = document.querySelector('.user__pantry-ingrededient-id')
const userInputIngredientAmount = document.querySelector('.user__pantry-ingrededient-amount')
const userSubmitFormButton = document.querySelector('.user__pantry-submit-button')
// ~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let recipeRepo;
let user;
let ingredients;
// ~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', () => {

  fetchData.then(data => {
    instantiateUser(data[0]);
    ingredients = data[1];
    recipeRepo = new RecipeRepository(data[2])
    instantiateRecipeRepo()
  })
  // .catch(error => dom.alertPromiseFail())

});
mainRecipeDisplay.addEventListener('click', (e) => {
  if(e.target.dataset.recipe) {
    dom.resetRecipeDisplayInfo()
    dom.renderRecipeInfo(e);
  };
});
navButtons.addEventListener('click', function(e) {
  if(e.target.dataset.button)
    dom.redirectNavBar(e);
});
sidebarRight.addEventListener('click', function(e){
  if(e.target.dataset.tag) {
    dom.filterRecipeCards(e);
  };
});
recipeSearchButton.addEventListener('click', function(){
  dom.searchRecipe()
});
recipeSearchInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('.top__search-bar-button').click();
  };
});
addFavoritesButton.addEventListener('click', addToUserList);
removeFavoritesButton.addEventListener('click', removeFromUserList);
addToCookListButton.addEventListener('click', function(e) {
  addToUserList(e)
});
cookButton.addEventListener('click', function(){
  dom.cookThisRecipe();
});
userSubmitFormButton.addEventListener('click', initiatePost)
// ~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function instantiateRecipeRepo (){
    recipeRepo.instantiateRecipes();
    dom.populateRecipeCards(recipeRepo.allRecipes, ingredients);
};

function instantiateUser (usersData) {
  let randomUserInfo = usersData[Math.floor(Math.random()*usersData.length)];
  user = new User(randomUserInfo.name, randomUserInfo.id);
  user.stockPantry(randomUserInfo.pantry)
};


function addToUserList (e) {
  if(e.target.dataset.button === 'add-favorite') {
    var listArray = user.favoriteRecipes
  }
  if(e.target.dataset.button === 'add-cook-list') {
    var listArray = user.recipesToCook
  }
  let userFavRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === recipeHeader.innerText);
  if(!user.favoriteRecipes.includes(userFavRecipe)){
    user.addRecipeToList(userFavRecipe, listArray);
  };
};

function removeFromUserList () {
  let userFavRecipe = user.favoriteRecipes.find(recipe => recipe.name === recipeHeader.innerText);
  user.removeRecipeFromList(userFavRecipe, user.favoriteRecipes);
};

function initiatePost () {
  if (!userInputIngredientAmount.value || !userInputIngredientID.value){
    return
    //User feedback for error handling
  }

  if (!recipeRepo.allRecipes[0].allIngredients.find(item => item.id === parseInt(userInputIngredientID.value))) {
    return
     //User feedback for error handling to check ID INGREDIENT DOES NOT EXIST
  }

  postDataset(user.id, parseInt(userInputIngredientID.value), parseInt(userInputIngredientAmount.value))
  let newUserPantry;
  
  fetchData.then(data => {
        newUserPantry = data[0].find(person => person.id === user.id).pantry
  })
  console.log('newUserPantry', newUserPantry)
  
  setTimeout(user.stockPantry(newUserPantry), 5000)

  // setTimeout(dom.createPantryHTML(), 5000)

}

// function testAPI () {
//   fetchData.then(data => {
//     console.log('user after post', data[0].find(person => person.id === user.id))
//   })
// }
      export { recipeRepo, user, ingredients }
