export const syncLocalStorage = async (idToken) => {
  const localIngredients = JSON.parse(localStorage.getItem('ingredients'));
  const apiIngredients = await getIngredients(idToken);
  const localRecipes = JSON.parse(localStorage.getItem('recipes'));
  const apiRecipes = await getRecipes(idToken);

  if([localIngredients, apiIngredients, localRecipes, apiRecipes].includes(null)) {
    return false
  }

  try {
    if(localIngredients.length > apiIngredients.length) {
      const newIngredients = localIngredients.filter(ingredient => !apiIngredients.some(apiIngredient => apiIngredient.id === ingredient.id));
      await addIngredients(idToken, newIngredients);
    } else if (localIngredients.length < apiIngredients.length) {
      const newIngredients = apiIngredients.filter(ingredient => !localIngredients.some(localIngredient => localIngredient.id === ingredient.id));
      localStorage.setItem('ingredients', JSON.stringify([...localIngredients, ...newIngredients]));
    }

    if(localRecipes.length > apiRecipes.length) {
      const newRecipes = localRecipes.filter(recipe => !apiRecipes.some(apiRecipe => apiRecipe.id === recipe.id));
      await addRecipes(idToken, newRecipes);
    } else if(localRecipes.length < apiRecipes.length) {
      const newRecipes = apiRecipes.filter(recipe => !localRecipes.some(localRecipe => localRecipe.id === recipe.id));
      localStorage.setItem('recipes', JSON.stringify([...localRecipes, ...newRecipes]));
    }

    return true
  } catch (error) {
    console.error(error);
    return false
  }
}

const addRecipes = async (idToken, recipes) => {
  console.log(recipes);
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