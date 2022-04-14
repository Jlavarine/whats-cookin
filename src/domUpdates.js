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

  resetRecipeDisplayInfo() {
    window.scrollTo(0,0);
    mainRenderedReceipeIngredients.innerHTML = '';
    mainRenderedReceipeInstructions.innerHTML = '';
  },

  renderRecipeInfo(e) {
    let currentRecipe = recipeRepo.allRecipes.find(recipe => recipe.name === e.target.dataset.recipe);
    let currentIngredients = currentRecipe.determineIngredientsNeeded(ingredients);
    let currentIngredientAmounts = currentRecipe.ingredients;
    this.displayRecipeInfoPage();
    recipeHeader.innerText = e.target.dataset.recipe;
    this.createRecipeHTML(currentRecipe, currentIngredients, currentIngredientAmounts)
  },

  createRecipeHTML(currentRecipe, currentIngredients, currentIngredientAmounts) {
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
  },

  removeAllCards() {
    document.querySelectorAll('.main__recipe-card').forEach(card => card.remove());
  },

  clearFilters(){
    user.userTags = []
    filterByBox.innerText = ''
    this.hide(filterByBox)
    this.removeAllCards()
    this.populateRecipeCards(recipeRepo.filterRecipesByTag(user.userTags))
    recipeHeader.innerText = 'All Recipes'
  },

  filterRecipeCards(e) {
    if (e.target.dataset.tag === 'clear') {
      this.clearFilters()
      return
    }
    let userSelectedTag = e.target.dataset.tag;
    user.userTags.push(userSelectedTag);
    this.removeAllCards();
    this.show(filterByBox)
    filterByBox.innerText = `You are filtering by: '${user.userTags}'`
    if (recipeHeader.innerText === 'Favorites') {
      this.populateRecipeCards(user.filterFavoriteRecipesByTag(user.userTags));
      return;
    };
    this.populateRecipeCards(recipeRepo.filterRecipesByTag(user.userTags))
  },

  searchRecipe () {
    let userSearch = recipeSearchInput.value.toLowerCase();
    this.show(filterByBox);
    filterByBox.innerText = `You are searching by: '${userSearch}'`
    recipeSearchInput.value = '';
    this.removeAllCards();
    if (recipeHeader.innerText === 'Favorites') {
      this.populateRecipeCards(user.filterFavoriteRecipesByName(userSearch));
      return;
    };
      this.populateRecipeCards(recipeRepo.filterRecipesByName(userSearch));
  },

  redirectNavBar(e) {
    this.clearFilters()
    recipeSearchInput.disabled = false;
    recipeSearchButton.disabled = false;
    allFilterButtons.forEach(button => button.disabled = false);
    if(e.target.dataset.button === 'all') {
      this.clearFilters()
      this.removeCardsAndShowHomeView()
      this.populateRecipeCards(recipeRepo.allRecipes);
    };
    if(e.target.dataset.button === 'favorites'){
      this.removeAllCards();
      this.showFavoritesView();
      this.populateRecipeCards(user.favoriteRecipes);
    };
    if(e.target.dataset.button === 'starters'){
      this.removeCardsAndShowHomeView();
      recipeHeader.innerText = 'Starters';
      this.populateRecipeCards(recipeRepo.filterRecipesByTag(['starter']));
    };
    if(e.target.dataset.button === 'mains'){
      this.removeCardsAndShowHomeView();
      recipeHeader.innerText = 'Mains';
      this.populateRecipeCards(recipeRepo.filterRecipesByTag(['main course', 'main dish']));
    };
  },

  removeCardsAndShowHomeView() {
    this.removeAllCards();
    this.showHomeView();
  },

  displayRecipeInfoPage() {
    allFilterButtons.forEach(button => button.disabled = true)
    recipeSearchInput.disabled = true;
    recipeSearchButton.disabled = true;
    this.hide(mainRecipeDisplay);
    this.show(mainRenderedRecipeArea);
    this.show(mainRenderedRecipeInstructionsHeader);
    this.show(mainRenderedRecipeIngredientsHeader);
    this.show(mainRenderedReceipeInstructions);
    this.show(mainRenderedReceipeIngredients);
    this.show(mainRenderedReceipeImage);
    this.show(addFavoritesButton);
    this.show(removeFavoritesButton);
    this.show(addToCookListButton);
    this.hide(filterByBox)
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
