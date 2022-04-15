import './styles.css';
import fetchData from './apiCalls';
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
const filterByBox = document.querySelector('.main__filter-paragraph');
const allFilterButtons = document.querySelectorAll('.sidebar__right-filter-button')
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
addFavoritesButton.addEventListener('click', addToFavorites);
removeFavoritesButton.addEventListener('click', removeFromFavorites);
addToCookListButton.addEventListener('click', addToCookList);
// ~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~








function instantiateRecipeRepo (){
    recipeRepo.instantiateRecipes();
    dom.populateRecipeCards(recipeRepo.allRecipes, ingredients);
};

function instantiateUser (usersData) {
  let randomUserInfo = usersData[Math.floor(Math.random()*usersData.length)];
  user = new User(randomUserInfo.name, randomUserInfo.id);
  user.stockPantry(randomUserInfo.pantry)
  console.log('userOnLoad', user);

};


function addToFavorites () {
  let userFavRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === recipeHeader.innerText);
  if(!user.favoriteRecipes.includes(userFavRecipe)){
    user.addRecipeToFavorites(userFavRecipe);
  };
};

function removeFromFavorites () {
  if (!user.favoriteRecipes.length){
    return;
  };
  let userFavRecipe = user.favoriteRecipes.find(recipe => recipe.name === recipeHeader.innerText);
  user.removeRecipeFromFavorites(userFavRecipe);
};

function addToCookList() {
  let recipeToCook = recipeRepo.allRecipes.find(recipe => recipe.name === recipeHeader.innerText);
  user.addRecipeToCookList(recipeToCook);
};

      export { recipeRepo, user, ingredients }
