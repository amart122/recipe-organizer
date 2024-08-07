import "../assets/css/RecipeDetails.css"
import React, { useContext } from 'react';
import { useLoadRecipe } from '../hooks/useLoadRecipes';
import { deleteRecipe } from '../modules/LocalStorageUtils';
import useLoadIngredients from '../hooks/useLoadIngredients';
import { useNavigate } from "react-router-dom";
import { ModalContext } from '../modules/ModalContext';
import { preptimeFormatCard } from '../helpers/RecipeHelper.js'
import { unitsToDisplay } from '../modules/UnitConverter';
import { deleteRecipeApi } from '../modules/ApiUtils';
import { useAuth } from '../modules/AuthContext';
import { RecipeContext } from '../modules/RecipesContext';
import { updateSynced } from '../modules/ApiUtils';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useLoadRecipe(recipeId);
  const [recipeIngrediets] = useLoadIngredients();
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);
  const { currentUser } = useAuth();
  const { reloadFilters } = useContext(RecipeContext);

  const openConfirmDeletion = () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDeletion) {
      return
    }

    deleteRecipe(recipe.id);

    if (currentUser) {
      currentUser.getIdToken(true).then((idToken) => {
        deleteRecipeApi(idToken, recipe.id)
        .then(() => {
          updateSynced()
          reloadFilters();
          navigate("/home")
        })
      })
    } else {
      updateSynced()
      reloadFilters();
      navigate("/home")
    }

  }

  const openEditModal = () => {
    setModal({
      showModal: true,
      currentModal: 'edit-recipe',
      recipe: recipe
    });
  }

  if (!recipe || !recipe.ingredients) return <h2>Recipe not found</h2>;

  return (
    <article className='recipe'>
      <h1>{ recipe.name }</h1>
      <div className='information'>
        <div className='icon'>
          <div className="clock">{preptimeFormatCard(recipe.preptime)}</div>
        </div>
        <div className='icon'>
          <div className="utensils">{(recipe.servingSize ? recipe.servingSize + " serving" + (parseInt(recipe.servingSize) > 1 ? "s" : "") : "N/A")}</div>
        </div>
        <div className='icon'>
          <div className="list">{recipe.ingredients.length + " items"}</div>
        </div>
      </div>
      <div className='ingredient-list'>
        <h4>Ingredients:</h4>
        {recipe.ingredients.map((ingredient, index) => {
          return (
            <div key={ index }>
              <p>
                { ingredient.quantity } {unitsToDisplay[ingredient.unit] + (ingredient.quantity > 1 ? "s" : "")} - { recipeIngrediets.find( _ingredient => _ingredient.id === ingredient.id).name }
              </p>
            </div>
          );
        })}
      </div>
      <div className='instructions'>
        <h4>Instructions:</h4>
        {recipe.instructions.map((instruction, index) => {
          return (
            <div key={ index }>
              <p>{ index + 1 }. { instruction }</p>
            </div>
          );
        })}
      </div>
      
      <div className={"notes " + (!recipe.notes ? "hidden" : "" )}>
        <h4>Notes:</h4>
        <p>{recipe.notes}</p>
      </div>

      <div className="btn-container">
        <button className="secondary" onClick={ openEditModal } >Edit</button>
        <button className="secondary red" onClick={ openConfirmDeletion } >Delete</button>
      </div>
    </article>
  );
}

export default RecipeDetails;