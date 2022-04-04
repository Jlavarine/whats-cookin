// Your fetch requests will live here!

let userData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json())

let ingredientData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json())

let recipeData = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json())

const fetchData = Promise.all([userData, ingredientData, recipeData])





export default fetchData