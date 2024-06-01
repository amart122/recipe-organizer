import { useEffect, useState } from "react";

export default function useLoadRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(recipes);
    setFilteredRecipes(recipes);
  }, []);

  return [recipes, setRecipes, filteredRecipes, setFilteredRecipes];
}

export const useLoadRecipe = (id) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes.find(recipe => recipe.id === parseInt(id));
    setRecipe(recipe);
  }, [id]);

  return recipe;
}