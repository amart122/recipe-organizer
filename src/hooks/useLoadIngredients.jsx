import { useEffect, useState } from "react";

export default function useLoadIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const _ingredients = JSON.parse(localStorage.getItem('ingredients')) ?? [];
    _ingredients.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    setIngredients(_ingredients);
  }, []);

  return [ingredients, setIngredients];
}