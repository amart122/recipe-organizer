import React from 'react';
import RecipeForm from './RecipeForm';

function RecipeFormModal({ recipe }) {
  return (
    <div id="new-recipe-modal">
      <h3>New Recipe</h3>
      <RecipeForm recipe={recipe} />
    </div>
  );
}

export default RecipeFormModal;