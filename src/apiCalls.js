// Your fetch requests will live here!

const fetchDatasets = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`${dataset} fetch failed`))
}

const fetchData = Promise.all([fetchDatasets('users'), fetchDatasets('ingredients'), fetchDatasets('recipes')])



export default fetchData
