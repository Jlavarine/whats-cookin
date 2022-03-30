import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

const navButtons = document.querySelector('.nav')
const mainRecipeDisplay = document.querySelector('.main__recipe-display-box')
const recipeCards = document.querySelectorAll('main__recipe-card')

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


//add a function to create a recipe card w/ 
/* <div class="main__recipe-card" datas-recipe=`${recipe.name}`>
<img class="main__recipe-card-image" src="https://spoonacular.com/recipeImages/595736-556x370.jpg">
<p class="main__recipe-card-text">Loaded Chocolate Chip Pudding Cookie Cups</p>
 <div class="main__recipe-card-filters">
   <p class="main__recipe-card-tag">Dinner</p>
  <p class="main__recipe-card-price">$$$$</p>
 </div>
</div> */