import { addImportedRecipe, tranformImportedRecipe } from '../modules/LocalStorageUtils';

export const importRecipe = async (url) => {
  const { recipe } = await fetchRecipe(url);

  return new Promise((resolve, reject) => {
    const [ newRecipe, newIngredients ] = tranformImportedRecipe(recipe);
    const { error } = addImportedRecipe(newRecipe, newIngredients);

    if(error) {
      reject(error)
    }

    resolve({ importedId: newRecipe.id })
  })
}

const fetchRecipe = async (url) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/api/import-recipe?url=${url}`)
      .then(response => {
        if(!response.ok) {
          reject(response.json())
        } else { 
          resolve(response.json())
        }
      })
      .catch(error => {
        reject(error)
      })
  });
}