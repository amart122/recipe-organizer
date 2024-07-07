import { unitsToAbbreviation } from './UnitConverter';

export const addNewRecipe = (newRecipe) => {
  const { errors, recipe } = validateAndTranformRecipe(newRecipe);
  if (errors.length) { return { errors } }

  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));

  return { errors, recipe };
}

export const addNewIngredient = (ingredient) => {
  const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
  const ingredientValidation = validateNewIngredient(ingredient);
  if(ingredientValidation.errors) { return ingredientValidation };

  const newIngredient = { id: generateId(), name: ingredient };
  ingredients.push(newIngredient);
  localStorage.setItem('ingredients', JSON.stringify(ingredients));

  return newIngredient;
}

export const deleteRecipe = (recipeId) => {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const newRecipes = recipes.filter(recipe => recipe.id !== recipeId);
  localStorage.setItem('recipes', JSON.stringify(newRecipes));
}

export const updateRecipe = (updatedRecipe) => {
  const { errors, recipe } = validateAndTranformRecipe(updatedRecipe);
  if (errors.length) { return errors }

  const allRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const newRecipes = allRecipes.filter(_recipe => _recipe.id !== recipe.id);
  newRecipes.push(recipe)
  
  localStorage.setItem('recipes', JSON.stringify(newRecipes));
  return '';
}

export const tranformImportedRecipe = (recipe) => {
  const allIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];
  const newIngredients = []
  // Create a map of ingredients by name
  const ingredientsByName = {}
  allIngredients.forEach( (ingredient) => ingredientsByName[ingredient.name] = ingredient.id );

  // Update ingredients
  recipe.ingredients = recipe.ingredients.map( (ingredient) => {
    // Replace any existing ingredient with local ingredient ID
    if(ingredientsByName[ingredient.name]) {
      ingredient.id = ingredientsByName[ingredient.name];
    } else {
      newIngredients.push(ingredient)
    }

    // Modify ingredients unit to match abbreviation
    if(unitsToAbbreviation[ingredient.unit.toLowerCase()]) {
      ingredient.unit = unitsToAbbreviation[ingredient.unit.toLowerCase()];
    }

    return ingredient
  })

  // Remove empty instruction lines
  recipe.instructions = recipe.instructions.filter(instruction => instruction.length > 0)
  
  return [recipe, newIngredients];
}

export const addImportedRecipe = (recipe, ingredients) => {
  try {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const allIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const newIngredients = allIngredients.concat(ingredients);
    
    if(recipes.find(_recipe => _recipe.name === recipe.name)) {
      throw new Error('Recipe already exists.');
    }
      
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    localStorage.setItem('ingredients', JSON.stringify(newIngredients));

    return { error: "" };
  } catch (error) {
    return { error };
  }
}

const validateAndTranformRecipe = (recipe) => {
  if (!recipe.name || recipe.recipeIngrediets.length === 0 || !recipe.description) {
    return { errors: 'Name, ingredients, and description are required.' };
  }
  const ingredientValidation = validateRecipeIngredients(recipe.recipeIngrediets);
  if(ingredientValidation.errors) { return ingredientValidation };


  if(recipe.servingSize.match(/\d+/g).length) {
    const recipeServingSize = recipe.servingSize.match(/\d+/g)[0];
  } else {
    const recipeServingSize = "N/A";
  }

  const _newRecipe = {
    id: recipe.id || generateId(),
    name: recipe.name,
    ingredients: recipe.recipeIngrediets,
    description: recipe.description,
    preptime: recipe.preptime,
    servingSize: recipe.servingSize,
    mealType: recipe.mealType,
    notes: recipe.notes,
    instructions: recipe.instructions,
  }

  return { errors: '', recipe: _newRecipe };
}

const validateRecipeIngredients = (ingredients) => {
  let validation = { errors: '' };
  ingredients.forEach(ingredient => {
    const error = '';
    if(!ingredient.id) validation = { errors: 'Ingredient does not exist.' };
    if(ingredient.quantity === null) validation = { errors: 'Quantity is required.' };
    if(0 > parseFloat(ingredient.quantity) ) validation = { errors: 'Quantity needs to be more than 0.' };
    if(ingredient.unit === null) validation = { errors: 'Unit is required.' };

    if(error) return;
  });

  return validation;
}

const validateNewIngredient = (ingredient) => {
  if (!ingredient) {
    return { errors: 'Name is required.' };
  }
  return { errors: '' };
}

const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
}