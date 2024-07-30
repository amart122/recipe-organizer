import { addImportedRecipe, tranformImportedRecipe } from '../modules/LocalStorageUtils';
import { updateSynced } from '../modules/ApiUtils';

export const importRecipe = async (url) => {
  const { recipe, error } = await fetchRecipe(url);

  if(error) {
    return Promise.reject(error)
  }

  return new Promise((resolve, reject) => {
    const [ newRecipe, newIngredients ] = tranformImportedRecipe(recipe);
    const { importError } = addImportedRecipe(newRecipe, newIngredients);

    if(importError) {
      reject(importError)
    }

    updateSynced();
    resolve({ recipe: newRecipe })
  })
}

const fetchRecipe = async (url) => {
  return new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/import-recipe?url=${url}`)
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