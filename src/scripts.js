import './styles.css';
import fetchData from './apiCalls';
import './images/turing-logo.png';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
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
// ~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let recipeRepo;
let user;
let ingredients;
// ~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

fetchData.then(data => {
  console.log(data);
  instantiateUser(data[0].usersData);
  ingredients = data[1].ingredientsData;
  recipeRepo = new RecipeRepository(data[2].recipeData)
  instantiateRecipeRepo()
})
window.addEventListener('load', () => {
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
addFavoritesButton.addEventListener('click', addToFavorites);
removeFavoritesButton.addEventListener('click', removeFromFavorites);
addToCookListButton.addEventListener('click', addToCookList);
// ~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  

function instantiateRecipeRepo (){
    recipeRepo.instantiateRecipes();
    populateRecipeCards(recipeRepo.allRecipes);
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
  console.log(user.recipesToCook);
};


function populateRecipeCards(recipesArray) {
    recipesArray.forEach((recipe, index) => {
      let recipeCost = recipe.calculateCostofIngredients(ingredients);
        mainRecipeDisplay.innerHTML +=
        `<div class="main__recipe-card" data-recipe="${recipesArray[index].name}">
        <div class="main__recipe-card-image-box">
        <img class="main__recipe-card-image" data-recipe="${recipesArray[index].name}" src=${recipesArray[index].image} alt="${recipesArray[index].name}">
        </div>
        <p class="main__recipe-card-text" data-recipe="${recipesArray[index].name}" >${recipesArray[index].name}</p>
         <div class="main__recipe-card-tags-box" data-recipe="${recipesArray[index].name}">
           <section class="main__recipe-card-tag" data-recipe="${recipesArray[index].name}">${recipesArray[index].tags.join(', ')}</section>
           </div>
          <p class="main__recipe-card-price" data-recipe="${recipesArray[index].name}">$${recipeCost}</p>
        </div> `;
    });
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
        removeAllCards();
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByTag(e.target.dataset.tag));
          return;
        };
        populateRecipeCards(recipeRepo.filterRecipesByTag(e.target.dataset.tag));
      };

      function searchRecipe () {
        let userSearch = recipeSearchInput.value;
        recipeSearchInput.value = '';
        removeAllCards();
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByName(userSearch));
          return;
        };
          populateRecipeCards(recipeRepo.filterRecipesByName(userSearch));
      };

      function redirectNavBar(e) {
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
          populateRecipeCards(recipeRepo.filterRecipesByTag('starter'));
        };
        if(e.target.dataset.button === 'mains'){
          removeCardsAndShowHomeView();
          recipeHeader.innerText = 'Mains';
          populateRecipeCards(recipeRepo.filterRecipesByTag('main course'));
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
      };

      function removeAllCards() {
        document.querySelectorAll('.main__recipe-card').forEach(card => card.remove());
      };
