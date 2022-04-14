import { recipeRepo } from '../src/scripts.js';
import { user } from '../src/scripts.js';
import { ingredients } from '../src/scripts.js';
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

const dom = {
  alertPromiseFail(){
    window.alert('Sorry, something went wrong!');
    location.reload()
  },

  populateRecipeCards(recipesArray) {
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
  },

  showFavoritesView(){
    this.showHomeView();
    recipeHeader.innerText = 'Favorites';
  },


  showHomeView(){
    recipeHeader.innerText = 'All Recipes'
    this.hide(mainRenderedRecipeArea);
    this.hide(mainRenderedRecipeInstructionsHeader);
    this.hide(mainRenderedRecipeIngredientsHeader);
    this.hide(mainRenderedReceipeInstructions);
    this.hide(mainRenderedReceipeIngredients);
    this.hide(mainRenderedReceipeImage);
    this.hide(addFavoritesButton);
    this.hide(removeFavoritesButton);
    this.hide(addToCookListButton);
    this.show(mainRecipeDisplay);
  },

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  }
}

export default dom
