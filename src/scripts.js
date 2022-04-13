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
    renderRecipeInfo(e);
  };
});
navButtons.addEventListener('click', function(e) {
    redirectNavBar(e);
});
sidebarRight.addEventListener('click', function(e){
  if(e.target.dataset.tag) {
    filterRecipeCards(e);
  };
});
recipeSearchButton.addEventListener('click', searchRecipe);
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
};

function showFavoritesView(){
  showHomeView();
  recipeHeader.innerText = 'Favorites';
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


function renderRecipeInfo(e) {
  window.scrollTo(0,0);
  mainRenderedReceipeIngredients.innerHTML = '';
  mainRenderedReceipeInstructions.innerHTML = '';
  let currentRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === e.target.dataset.recipe);
  let currentIngredients = currentRecipe.determineIngredientsNeeded(ingredients);
  let currentIngredientAmounts = currentRecipe.ingredients;

  displayRecipeInfoPage();
  recipeHeader.innerText = e.target.dataset.recipe;
  mainRenderedReceipeImage.src = currentRecipe.image;
  mainRenderedReceipeImage.alt = `Image of ${currentRecipe.name} recipe`;
      currentIngredientAmounts.forEach((ingredient, index) => {
        mainRenderedReceipeIngredients.innerHTML +=
        `<div class="main__rendered-recipe-box">
          <section class="main__rendered-recipe-ingredients">${ingredient.quantity.amount} ${ingredient.quantity.unit} ${currentIngredients[index]}
          </section>
        </div>`;
      });
        currentRecipe.instructions.forEach(instruction =>{
        mainRenderedReceipeInstructions.innerHTML +=
        `<div class='main__rendered-recipe-instructions'>
          <section class="main__rendered-recipe-instructions">${instruction.number} ${instruction.instruction}</section>
        </div>`
      });
        mainRenderedRecipeArea.innerHTML = `
              <section class="main__rendered-recipe-cost">recipe cost: $${currentRecipe.calculateCostofIngredients(ingredients)}
              </section>`
    };

      function filterRecipeCards(e) {
        if (e.target.dataset.tag === 'clear') {
          clearFilters()
          return
        }
        let userSelectedTag = e.target.dataset.tag;
        user.userTags.push(userSelectedTag);
        removeAllCards();
        show(filterByBox)
        filterByBox.innerText = `You are filtering by: '${user.userTags}'`
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByTag(user.userTags));
          return;
        };
        populateRecipeCards(recipeRepo.filterRecipesByTag(user.userTags))
      };

      function clearFilters(){
        user.userTags = [];
        filterByBox.innerText = ''
        hide(filterByBox)
        removeAllCards()
        populateRecipeCards(recipeRepo.filterRecipesByTag(user.userTags))
        recipeHeader.innerText = 'All Recipes'
      }

      function searchRecipe () {
        let userSearch = recipeSearchInput.value.toLowerCase();
        show(filterByBox);
        filterByBox.innerText = `You are searching by: '${userSearch}'`
        recipeSearchInput.value = '';
        removeAllCards();
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByName(userSearch));
          return;
        };
          populateRecipeCards(recipeRepo.filterRecipesByName(userSearch));
      };

      function redirectNavBar(e) {
        clearFilters()
        recipeSearchInput.disabled = false;
        recipeSearchButton.disabled = false;
        allFilterButtons.forEach(button => button.disabled = false);
        if(e.target.dataset.button === 'all') {

          removeCardsAndShowHomeView()
          populateRecipeCards(recipeRepo.allRecipes);
        };
        if(e.target.dataset.button === 'favorites'){
          removeAllCards();
          showFavoritesView();
          populateRecipeCards(user.favoriteRecipes);
        };
        if(e.target.dataset.button === 'starters'){
          removeCardsAndShowHomeView();
          recipeHeader.innerText = 'Starters';
          populateRecipeCards(recipeRepo.filterRecipesByTag(['starter']));
        };
        if(e.target.dataset.button === 'mains'){
          removeCardsAndShowHomeView();
          recipeHeader.innerText = 'Mains';
          populateRecipeCards(recipeRepo.filterRecipesByTag(['main course', 'main dish']));
        };
      };

      function removeCardsAndShowHomeView() {
        removeAllCards();
        showHomeView();
      };

      function show(element) {
        element.classList.remove('hidden');
      };

      function hide(element) {
        element.classList.add('hidden');
      };

      function showHomeView(){
        recipeHeader.innerText = 'All Recipes'
        hide(mainRenderedRecipeArea);
        hide(mainRenderedRecipeInstructionsHeader);
        hide(mainRenderedRecipeIngredientsHeader);
        hide(mainRenderedReceipeInstructions);
        hide(mainRenderedReceipeIngredients);
        hide(mainRenderedReceipeImage);
        hide(addFavoritesButton);
        hide(removeFavoritesButton);
        hide(addToCookListButton);
        show(mainRecipeDisplay);
      };

      function displayRecipeInfoPage() {
        allFilterButtons.forEach(button => button.disabled = true)
        recipeSearchInput.disabled = true;
        recipeSearchButton.disabled = true;
        hide(mainRecipeDisplay);
        show(mainRenderedRecipeArea);
        show(mainRenderedRecipeInstructionsHeader);
        show(mainRenderedRecipeIngredientsHeader);
        show(mainRenderedReceipeInstructions);
        show(mainRenderedReceipeIngredients);
        show(mainRenderedReceipeImage);
        show(addFavoritesButton);
        show(removeFavoritesButton);
        show(addToCookListButton);
        hide(filterByBox)
      };

      function removeAllCards() {
        document.querySelectorAll('.main__recipe-card').forEach(card => card.remove());
      };

      export default { recipeRepo, user, ingredients }
