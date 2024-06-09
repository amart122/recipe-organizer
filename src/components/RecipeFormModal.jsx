import React from 'react';
import RecipeForm from './RecipeForm';

function RecipeFormModal({ recipe }) {
  return (
    <div id="new-recipe-modal">
      <h3>{recipe ? 'Edit: ' + recipe.name : 'New Recipe' }</h3>
      <RecipeForm recipe={recipe} />
    </div>
  );
}

export default RecipeFormModal;