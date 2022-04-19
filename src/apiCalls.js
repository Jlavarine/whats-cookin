// Your fetch requests will live here!



const fetchDatasets = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

let fetchData = Promise.all([fetchDatasets('users'), fetchDatasets('ingredients'), fetchDatasets('recipes')])

const postDataset = (userId, id, amount) => {

   fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "ingredientID": id,
      "ingredientModification": amount
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => console.log('post response', response))

  fetchDatasets('users')
  fetchData = Promise.all([fetchDatasets('users')])
}


export { fetchData , postDataset }
