import React, { useContext } from 'react';
import RecipeListItem from './RecipeListItem';
import '../assets/css/RecipesContainer.css';
import { RecipeContext } from '../modules/RecipesContext';

function RecipesContainer() {
  const { filteredRecipes } = useContext(RecipeContext);

  return (
    <div id="recipes-container" className='container-fluid'>
      <h1>Recipes</h1>

      <div id="recipe-list" className="grid-display" >
        {filteredRecipes.length === 0 && <p>No recipes yet!</p>}
        {filteredRecipes.length !== 0 && filteredRecipes.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipesContainer;