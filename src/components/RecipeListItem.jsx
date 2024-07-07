import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/RecipeListItem.css';
import { preptimeFormatCard } from '../helpers/RecipeHelper.js'

function RecipeListItem({ recipe }) {
  return (
    <article key={recipe.id} className="recipe-list-item">
      <Link to={`/recipe/${recipe.id}`} className='list-item-content'>
        <header>{recipe.name}</header>
        <div className='item-icons'>
          <div className='icon' data-tooltip={preptimeFormatCard(recipe.preptime)}>
            <div className="clock">{preptimeFormatCard(recipe.preptime)}</div>
          </div>
          <div className='icon' data-tooltip={(recipe.servingSize ? recipe.servingSize : "N/A") + " serving" + (parseInt(recipe.servingSize) > 1 ? "s" : "")}>
            <div className="utensils">{(recipe.servingSize ? recipe.servingSize : "N/A")}</div>
          </div>
          <div className='icon' data-tooltip={recipe.ingredients.length + " items"}>
            <div className="list">{recipe.ingredients.length}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default RecipeListItem;