import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';

function Recipe() {
  const { id } = useParams();

  return (
    <div className='main-recipe'>
      <RecipeDetails recipeId={ id }/>
    </div>
  );
}

export default Recipe;