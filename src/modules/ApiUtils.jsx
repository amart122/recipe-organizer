export const syncLocalStorage = async (idToken) => {
  const localSync = localStorage.getItem('lastSynced');
  const apiSynced = await getSynced(idToken);

  if(localSync && new Date(apiSynced).valueOf() === new Date(localSync).valueOf()) {
    return true
  }

  const localIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];
  const apiIngredients = await getIngredients(idToken);
  const localRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const apiRecipes = await getRecipes(idToken);

  if([apiIngredients, apiRecipes].includes(null)) {
    return false
  }

  try {
    // Ingredients are always synced regardless of the last sync date
    if(localIngredients.length > apiIngredients.length) {
      const newIngredients = localIngredients.filter(ingredient => !apiIngredients.some(apiIngredient => apiIngredient.id === ingredient.id));
      await addIngredients(idToken, newIngredients);
    } else if (localIngredients.length < apiIngredients.length) {
      const newIngredients = apiIngredients.filter(ingredient => !localIngredients.some(localIngredient => localIngredient.id === ingredient.id));
      localStorage.setItem('ingredients', JSON.stringify([...localIngredients, ...newIngredients]));
    }

    // Recipes are only synced if the last sync date is newer than the last synced date
    if(new Date(localSync) > new Date(apiSynced)) {
      const newApiRecipes = localRecipes.filter(recipe => !apiRecipes.some(apiRecipe => apiRecipe.id === recipe.id));
      if(newApiRecipes.length) {
        await addRecipes(idToken, newApiRecipes);
      }
      updateSynced(idToken);
    } else {
      const newLocalRecipes = apiRecipes.filter(recipe => !localRecipes.some(localRecipe => localRecipe.id === recipe.id));
      if(newLocalRecipes.length) {
        localStorage.setItem('recipes', JSON.stringify([...localRecipes, ...newLocalRecipes]));
      }

      const recipesToDelete = localRecipes.filter(recipe => !apiRecipes.some(apiRecipe => apiRecipe.id === recipe.id));
      if(recipesToDelete.length) {
        localStorage.setItem('recipes', JSON.stringify(localRecipes.filter(recipe => !recipesToDelete.some(deleteRecipe => deleteRecipe.id === recipe.id))))
      }

      localStorage.setItem('lastSynced', new Date(apiSynced));
    }

    return true
  } catch (error) {
    console.error(error);
    return false
  }
}

export const updateSynced = (idToken=null) => {
  const newSynced = new Date();
  localStorage.setItem('lastSynced', newSynced);

  fetch(`${import.meta.env.VITE_API_URL}/api/user/sync`, {
    method: 'PATCH',
    headers: {
      'Authorization': `${idToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lastSynced: newSynced })
  });
}

export const deleteRecipeApi = async (idToken, recipeId) => {
  return fetch(`${import.meta.env.VITE_API_URL}/api/storage/recipes/${recipeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${idToken}`
    }
  }).then(() => updateSynced(idToken))
}

const getSynced = async (idToken) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/user/sync`, {
      headers: {
        'Authorization': `${idToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      return data.lastSynced;
    })
    .catch(error => {
      return null;
    });
}

const addRecipes = async (idToken, recipes) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/storage/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    },
    body: JSON.stringify(recipes)
  });

  return response.json();
}

const addIngredients = async (idToken, ingredients) => {
  console.log(ingredients);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/storage/ingredients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${idToken}`
    },
    body: JSON.stringify(ingredients.map(ingredient => {
      return {
        name: ingredient.name,
        local_id: ingredient.id
      }
    }))
  });

  return response.json();
}

const getIngredients = async (idToken) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/storage/ingredients`, {
      headers: {
        'Authorization': `${idToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

const getRecipes = async (idToken) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/storage/recipes`, {
      headers: {
        'Authorization': `${idToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return null;
    });
}