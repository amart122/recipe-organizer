import React, { useContext } from 'react';
import { useLoadRecipe } from '../hooks/useLoadRecipes';
import { deleteRecipe } from '../modules/LocalStorageUtils';
import useLoadIngredients from '../hooks/useLoadIngredients';
import { useNavigate } from "react-router-dom";
import { ModalContext } from '../modules/ModalContext';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useLoadRecipe(recipeId);
  const [recipeIngrediets] = useLoadIngredients();
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);

  const openConfirmDeletion = () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDeletion) {
      deleteRecipe(recipe.id);
      navigate("/")
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
      <h2>{ recipe.name }</h2>
      <div className='ingredient-list'>
        <h3>Ingredients:</h3>
        {recipe.ingredients.map((ingredient, index) => {
          return (
            <div key={ index }>
              <p>{ recipeIngrediets.find( _ingredient => _ingredient.id === ingredient.id).name } - { ingredient.quantity }</p>
            </div>
          );
        })}
      </div>
      <div className='instructions'>
        <h3>Instructions:</h3>
        {recipe.instructions.map((instruction, index) => {
          return (
            <div key={ index }>
              <p>{ index + 1 }. { instruction }</p>
            </div>
          );
        })}
      </div>
      <button onClick={ openEditModal } >Edit</button>
      <button onClick={ openConfirmDeletion } >Delete</button>
    </article>
  );
}

export default RecipeDetails;