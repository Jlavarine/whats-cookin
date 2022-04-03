import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// const data = require('./data/recipes')
// const usersData = require('./data/users')
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

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
const removeFavoritesButton = document.querySelector('.remove-favorites-button')
const addToCookListButton = document.querySelector('.add-recipe-to-cook-button');






let recipeRepo;
let user;
let ingredients;

window.addEventListener('load', () => {
  fetchData();
});

mainRecipeDisplay.addEventListener('click', (e) => {
  if(e.target.dataset.recipe) {
    renderRecipeInfo(e)
  }
})
navButtons.addEventListener('click', function(e) {
    redirectNavBar(e);
})
sidebarRight.addEventListener('click', function(e){
    filterRecipeCards(e)
})
recipeSearchButton.addEventListener('click', searchRecipe)


addFavoritesButton.addEventListener('click', addToFavorites)
removeFavoritesButton.addEventListener('click', removeFromFavorites)
addToCookListButton.addEventListener('click', addToCookList)


function fetchData(){
  let userData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json()).then(data => {
    instantiateUser(data.usersData);
  })
  let ingredientData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json()).then(data => {
    ingredients = data.ingredientsData;
  })

  let recipeData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json()).then(data => {
    recipeRepo = new RecipeRepository(data.recipeData);
    instantiateRecipeRepo();
  })
}




function instantiateRecipeRepo (){
    recipeRepo.instantiateRecipes()
    populateRecipeCards(recipeRepo.allRecipes)
}

function addToFavorites () {
  let userFavRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === recipeHeader.innerText)
  user.addRecipeToFavorites(userFavRecipe)
}

function removeFromFavorites () {
  if (!user.favoriteRecipes.length){
    return
  }
  let userFavRecipe = user.favoriteRecipes.find(recipe => recipe.name === recipeHeader.innerText)
  user.removeRecipeFromFavorites(userFavRecipe)
}

function addToCookList() {
  let recipeToCook = recipeRepo.allRecipes.find(recipe => recipe.name === recipeHeader.innerText)
  user.addRecipeToCookList(recipeToCook)
  console.log(user.recipesToCook)
};

function instantiateUser (usersData) {
  let randomUserInfo = usersData[Math.floor(Math.random()*usersData.length)]
  user = new User(randomUserInfo.name, randomUserInfo.id)
}


function populateRecipeCards(recipesArray) {
    recipesArray.forEach((recipe, index) => {
      let recipeCost = recipe.calculateCostofIngredients(ingredients)
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
  window.scrollTo(0,0)
  let currentRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === e.target.dataset.recipe)

  let currentIngredients = currentRecipe.determineIngredientsNeeded(ingredients)
  let currentIngredientAmounts = currentRecipe.ingredients

  displayRecipeInfoPage ()
  recipeHeader.innerText = e.target.dataset.recipe
  mainRenderedReceipeImage.src = currentRecipe.image
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
        mainRenderedRecipeArea.innerHTML = `
              <section class="main__rendered-recipe-cost">recipe cost: $${currentRecipe.calculateCostofIngredients(ingredients)}
              </section>`

    }

    function displayRecipeInfoPage () {
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
    }

      function filterRecipeCards (e) {
          removeAllCards();
          populateRecipeCards(recipeRepo.filterRecipesByTag(e.target.dataset.tag))
      }

      function searchRecipe () {
        let userSearch = recipeSearchInput.value
        recipeSearchInput.value = '';
        removeAllCards();
        if (recipeHeader.innerText === 'All Recipes'){
          populateRecipeCards(recipeRepo.filterRecipesByName(userSearch))
          return
        }
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByName(userSearch))
          return
        }
        if (recipeHeader.innerText === 'Starters') {
          populateRecipeCards(user.filterFavoriteRecipesByName(userSearch))
          return
        }
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByName(userSearch))
          return
        }
        if (recipeHeader.innerText === 'Favorites') {
          populateRecipeCards(user.filterFavoriteRecipesByName(userSearch))
          return
        }
      }


      function redirectNavBar(e) {
        if(e.target.dataset.button === 'all') {
          removeAllCards();
          showHomeView()
          populateRecipeCards(recipeRepo.allRecipes)
        };
        if(e.target.dataset.button === 'favorites'){
          removeAllCards()
          showFavoritesView()
          populateRecipeCards(user.favoriteRecipes)
        }
      };

      function showFavoritesView(){
        showHomeView();
        recipeHeader.innerText = 'Favorites'
      }

      function removeAllCards() {
        document.querySelectorAll('.main__recipe-card').forEach(card => card.remove())
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
        hide(removeFavoritesButton)
        hide(addToCookListButton)
        show(mainRecipeDisplay);
      }
