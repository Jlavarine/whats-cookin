# What's Cookin
What's Cookin is an application that allows a user to search for recipes, favorite recipes, and filter recipes. Each recipe contains the information needed to cook the meals including cost, ingredients needed, and cooking directions.

## Built With
  * JavaScript
  * CSS
  * HTML
  * Webpack

## Getting Started:

### Where to Start:

1. Start by going [here](https://github.com/Jlavarine/whats-cookin). From here you will want to click on the green rectangular button titled 'Code'. This should open a drop down menu where you should see a link. To the left of the link there should be an icon with two over lapping squares. You can click the icon to copy the link. For convince you can copy here, git@github.com:Jlavarine/whats-cookin.git.
2. You will want to clone down the repo to you terminal using `git clone git@github.com:Jlavarine/whats-cookin.git`.
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
4. Run npm start in the terminal to see the HTML page. You will need to copy and paste the local server from the terminal and paste it into your browser. The local server should be simialiar to, "http://localhost:8080/". `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This is because this application uses webpack.
5. Do not run `npm audit fix --force`. This will update to the latest version of packages. You need to be using `webpack-dev-server@3.11.2` which is not the latest version.
6. You will need to clone down a sent repo to use as a local server. The site will not use local data but data from a deployed API. You can clone down the repo here https://github.com/turingschool-examples/whats-cookin-api. Follow the instructions in it's ReadMe to clone it down and run from your local.

### Using the Application:
*  On page load you will see a display containing multiple cards with pictures and data related to their recipe. You can click on any of these recipes. Doing this will hide the displayed cards and show you the cooking instructions and ingredients for the recipe you clicked on. This is the Recipe Info Page.
*  On the Recipe Info Page you will have new options. "Add To Favorites, Remove From Favorites, Add Recipe to Cook List, Missing Ingredients/Cook this Recipe". You can click any of these to utilize their functions.
    * Clicking "Add To Favorites" will move the recipe being displayed to the "Favorites" page.
    * If the recipe has been moved to the "Favorites" page you can click "Remove From Favorites", to delete the recipe from the "Favorites" page.
    ![Adding Recipe to Favorites](https://media1.giphy.com/media/iG9g7e0cmLr0CmHLfC/giphy.gif?cid=790b76115ad24309551fc0b48ef954c5552e52ed01042bbb&rid=giphy.gif&ct=g)
    * The third option is "Add Recipe to Cook List". You can then click the "Cook List" button near the top of the page to view recipes added.
    * If all ingredients needed to cook the recipe are contained in the users pantry the button will say Cook this Meal. Clicking will then remove the required ingredients from the users Panty. If the needed ingredients are not in the user pantry the button will instead read "Missing Ingredients". The missing ingredients will be listed below the required ingredients on the recipe card.
    * The Recipe Info page will also contain the ingredients, there amounts, and the instructions for preparing the current selected recipe.
* Below the title of the page "What's Cookin" users can select the options on the navigation bar. "All" will display all recipes. "Starters", will display all recipes that contain the "starter" tag. Similarly if the "Mains" tag is clicked on it will display any recipe that contains the "main course". The "Favorites" button will display any recipes that were favorited using the method mentioned previously. The "Pantry" button will display all the users ingredients along with their quanitities. From this page the user will also be able to add additional ingredients Finally the "Cook List" button will display any recipes added to the list.
* On the far right of the page will be a column with the header "Filter". You can click on any of the below words to filter the recipes based on their tags. You can see the tags on the recipe cards.
* Users can also search the current recipes displayed on their screen utilizing the search box at the top right of the screen.

## Contributors:
 * Artan Myrtolli [GitHub](https://github.com/artanmyrtolli)
 * Jacob Lavarine [GitHub](https://github.com/Jlavarine)
 * Shane Warning [GitHub](https://github.com/shanekwarning)

## Challenges:
  * The original project contained a data file that had all of the information needed stored locally. We deleted the file and used webpack and fetch requests to pull the data from an external source. This required us to learn how API requests function and to refactor our scripts to accommodate the changes.

## Future Additions:
 * Allow user to add ingredient by name.
 * Add button to allow user to remove recipe from cook list.
 * User to add their own recipes to cook.
 * Allow users to store the ingredients they have at home on their profile.
 * To view their To Cook Recipes.
 * Draggle option for user to favorite recipes.

## Testing:

Tests have been built into the files. You can test them by running "npm test" in your terminal.
