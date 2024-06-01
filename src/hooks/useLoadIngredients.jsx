import { useEffect, useState } from "react";

export default function useLoadIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const _ingredients = JSON.parse(localStorage.getItem('ingredients')) ?? [];
    setIngredients(_ingredients);
  }, []);

  return [ingredients, setIngredients];
}