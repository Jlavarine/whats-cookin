import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
const data = require('./data/recipes')
const usersData = require('./data/users')
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

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
const sidebarRight = document.querySelector('.sidebar__right');
const recipeSearchInput = document.getElementById('searchbar');
const recipeSearchButton = document.querySelector('.top__search-bar-button');
const addFavoritesButton = document.querySelector('.add-favorites-button');
// const favoritesList = document.querySelector('.sidebar__favorite-recipe-titles');
const favoritesListBox = document.querySelector('.sidebar__title-box')




const recipeRepo = new RecipeRepository(data);

let user;

window.addEventListener('load', () => {
  instantiateRecipeRepo();
instantiateUser (usersData.usersData);
});

mainRecipeDisplay.addEventListener('click', (e) => {
    renderRecipeInfo(e)
})
navButtons.addEventListener('click', function(e) {
    redirectNavBar(e);
})
sidebarRight.addEventListener('click', function(e){
    filterRecipeCards(e)
})
recipeSearchButton.addEventListener('click', searchRecipe)


addFavoritesButton.addEventListener('click', addToFavorites)
// function returnRecipe (e) {
//     if (e.target.dataset.tag)
//     console.log(e.target.dataset.tag);
// }

favoritesListBox.addEventListener('dblclick', function(e) {
  
  removeFromFavorites(e)

} )

// function fireButton(event){
//     if (event)
//     console.log(event.target.dataset.button);
// }

function instantiateRecipeRepo (){
    recipeRepo.instantiateRecipes()
    populateRecipeCards(recipeRepo)
}

function addToFavorites () {
  let userFavRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === recipeHeader.innerText)
  user.addRecipeToFavorites(userFavRecipe)
  favoritesListBox.innerHTML += 
  `<div class="sidebar__favorite-recipe-titles"><ul class="sidebar__favorite-recipe-titles" data-name="${userFavRecipe.name}">${userFavRecipe.name}</ul><br></div>`
}

function removeFromFavorites (e) {
  let allFavoriteRecipes = document.querySelectorAll(".sidebar__favorite-recipe-titles");
  let favoriteRecipeName = e.target.dataset.name
  let favoriteRecipe = user.favoriteRecipes.find(recipe => recipe.name === favoriteRecipeName)
  let favoriteRecipeIndex = user.favoriteRecipes.indexOf(favoriteRecipe)
  user.removeRecipeFromFavorites(favoriteRecipe)

  allFavoriteRecipes[favoriteRecipeIndex].remove()
}

function instantiateUser (usersData) {
  let randomUserInfo = usersData[Math.floor(Math.random()*usersData.length)]
  user = new User(randomUserInfo.name, randomUserInfo.id)
}


function populateRecipeCards(recipeRepo) {
    recipeRepo.allRecipes.forEach((recipe, index) => {
        mainRecipeDisplay.innerHTML +=
        `<div class="main__recipe-card" data-recipe="${recipeRepo.allRecipes[index].name}">
        <div class="main__recipe-card-image-box">
        <img class="main__recipe-card-image" data-recipe="${recipeRepo.allRecipes[index].name}" src=${recipeRepo.allRecipes[index].image} alt="${recipeRepo.allRecipes[index].name}">
        </div>
        <p class="main__recipe-card-text" data-recipe="${recipeRepo.allRecipes[index].name}" >${recipeRepo.allRecipes[index].name}</p>
         <div class="main__recipe-card-tags-box" data-recipe="${recipeRepo.allRecipes[index].name}">
           <section class="main__recipe-card-tag" data-recipe="${recipeRepo.allRecipes[index].name}">${recipeRepo.allRecipes[index].tags.join(', ')}</section>
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

  hide(mainRecipeDisplay);
  show(mainRenderedRecipeArea);
  show(mainRenderedRecipeInstructionsHeader);
  show(mainRenderedRecipeIngredientsHeader);
  show(mainRenderedReceipeInstructions);
  show(mainRenderedReceipeIngredients);
  show(mainRenderedReceipeImage);
  show(addFavoritesButton);
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

      function filterRecipeCards (e) {
        let userSelectedTag = e.target.dataset.tag
        let allRecipeCards = document.querySelectorAll('.main__recipe-card')
        allRecipeCards.forEach(card => {
            if (!card.children[2].innerText.includes(userSelectedTag))
            card.remove()
        })
      }

      function searchRecipe () {
        let userSearch = recipeSearchInput.value
        removeAllCards();
        recipeRepo.filterRecipesByName(userSearch)
        populateRecipeCards(recipeRepo)
     
      }


      function redirectNavBar(e) {
        if(e.target.dataset.button === 'all') {
          removeAllCards();
          showHomeView()
          populateRecipeCards(recipeRepo)
        };
      };

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
        show(mainRecipeDisplay);
      }
      // function renderFavorites() {
      //   removeAllCards();
      //   recipeHeader.innerText = 'Favorites';
      //
      // };
