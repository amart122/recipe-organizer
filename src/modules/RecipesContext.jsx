import React, { createContext, useState } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('recipes')) || [])
  const [filteredRecipes, setFilteredRecipes] = useState(JSON.parse(localStorage.getItem('recipes')) || [])
  const [currentFilter, setCurrentFilter] = useState({});

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const removeRecipe = (recipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
  };

  const filterRecipes = (filter) => {
    setCurrentFilter(filter)
    let _filteredRecipes = recipes;

    if (filter?.text) {
      _filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(filter.text.toLowerCase()));
    }

    if (filter?.mealTypes?.length > 0 && !filter.mealTypes.includes('all')) {
      _filteredRecipes = _filteredRecipes.filter(recipe => filter.mealTypes.includes(recipe.mealType));
    }

    switch(filter?.preptime) {
      case 'lessthan30':
        _filteredRecipes = _filteredRecipes.filter(recipe => !isNaN(parseInt(recipe.preptime)) && recipe.preptime < 30);
        break;
      case '30to60':
        _filteredRecipes = _filteredRecipes.filter(recipe => !isNaN(parseInt(recipe.preptime)) && recipe.preptime >= 30 && recipe.preptime <= 60);
        break;
      case 'morethan60':
        _filteredRecipes = _filteredRecipes.filter(recipe => !isNaN(parseInt(recipe.preptime)) && recipe.preptime > 60);
        break;
      default:
        break;
    }

    if (filter?.ingredients?.length > 0) {
      _filteredRecipes = _filteredRecipes.filter( (recipe) => {
        return recipe.ingredients.some(recipeIngredient => filter.ingredients.includes(recipeIngredient.id.toString()));
      });
    }

    setFilteredRecipes([..._filteredRecipes]);

    return [..._filteredRecipes];
  };

  const sortRecipes = (sort) => {
    let _sortedRecipes = [...filteredRecipes];
    const _ascending = sort.substr(0,1) === '+';
    const _sort = sort.substr(1);

    if(_sortedRecipes.length === 0) return;

    if(_sort === "name") {
      _sortedRecipes = filteredRecipes.sort((a, b) => a[_sort].toLowerCase().localeCompare(b[_sort].toLowerCase()));
    } else if(_sort === "ingredient") {
      _sortedRecipes = filteredRecipes.sort((a, b) => parseInt(a["ingredients"].length) - parseInt(b["ingredients"].length));
    } else {
      _sortedRecipes = filteredRecipes.sort((a, b) => parseInt(a[_sort]) - parseInt(b[_sort]));
    }

    if(!_ascending) {
      _sortedRecipes = [..._sortedRecipes.reverse()];
    }

    setFilteredRecipes([..._sortedRecipes]);
    return [..._sortedRecipes]
  }

  return (
    <RecipeContext.Provider value={{ recipes, filteredRecipes, sortRecipes, addRecipe, removeRecipe, filterRecipes, currentFilter }}>
      {children}
    </RecipeContext.Provider>
  );
};