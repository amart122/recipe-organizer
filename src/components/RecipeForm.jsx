import "../assets/css/RecipeForm.css";
import React, { useState, useContext } from 'react';
import { addNewRecipe, addNewIngredient, updateRecipe } from '../modules/LocalStorageUtils';
import useLoadIngredients from '../hooks/useLoadIngredients';
import NewIngredientInput from './NewIngredientInput';
import Toast from "./Toast";
import { ModalContext } from '../modules/ModalContext';
import { RecipeContext } from '../modules/RecipesContext';
import { unitsToDisplay } from '../modules/UnitConverter';
import { useNavigate } from 'react-router-dom';

function RecipeForm({ recipe }) {
  const [ingredients, setIngredients] = useLoadIngredients();
  const [name, setName] = useState(recipe ? recipe.name : '');
  const [recipeIngrediets, setRecipeIngrediets] = useState(recipe?.ingredients ? recipe.ingredients : []);
  const [description, setDescription] = useState(recipe?.description ? recipe.description : '');
  const [instructions, setInstructions] = useState(recipe?.instructions ? recipe.instructions : [])
  const [preptime, setPreptime] = useState(recipe?.preptime ? recipe.preptime : '');
  const [servingSize, setServingSize] = useState(recipe?.servingSize ? recipe.servingSize : '');
  const [mealType, setMealType] = useState(recipe?.mealType ? recipe.mealType : '');
  const [notes, setNotes] = useState(recipe?.notes ? recipe.notes : '');
  const [newIngredientSelect, setNewIngredientSelect] = useState(false);
  const [toast, setToast] = useState({ message: '', show: false, type: '' });
  const { setModal } = useContext(ModalContext);
  const { addRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, recipe } = addNewRecipe({ name, recipeIngrediets, description, preptime, servingSize, notes, mealType, instructions });
    if (errors) {
      return setToast({
        message: errors,
        show: true,
        type: 'error'
      })
    }

    addRecipe(recipe);
    setName('');
    setDescription('');
    setPreptime('');
    setServingSize('');
    setNotes('');
    setRecipeIngrediets([]);
    setMealType('')
    setInstructions([]);
    setModal({ showModal: false, currentModal: null });
    navigate(`/recipe/${recipe.id}`);
  };
  
  const handleSelectChange = (e) => {
    if (e.target.value === '0') {
      setNewIngredientSelect(true);
    } else {
      const _newIngredient = parseFloat(e.target.value);
      if (_newIngredient === -1) return;
      if(recipeIngrediets.find(ingredient => ingredient.id === _newIngredient)) {
        return setToast({
          message: 'Ingredient already added',
          show: true,
          type: 'error'
        })
      }

      const ingredient = ingredients.find(ingredient => ingredient.id === parseInt(_newIngredient));
      setRecipeIngrediets([...recipeIngrediets, {
        id: ingredient.id,
        quantity: null,
        unit: null,
      }]);
    }
  }

  const handleNewIngredientClick = (newIngredient) => {
    const _newIngredient = addNewIngredient(newIngredient);
    if (_newIngredient.errors) {
      return setToast({
        message: _newIngredient.errors,
        show: true,
        type: 'error'
      })
    }

    setIngredients([...ingredients, _newIngredient]);
    setNewIngredientSelect(false)
  }

  const handleIngredientUpdate = (ingredientId, { updateType, value }) => {
    const _ingredientList = [...recipeIngrediets];
    const _ingredient = _ingredientList.find(_ingredient => _ingredient.id === ingredientId);

    switch (updateType) {
      case 'quantity':
        _ingredient.quantity = value;
        break;
      case 'unit':
        _ingredient.unit = value;
        break;
      default:
        break;
    }
    setRecipeIngrediets(_ingredientList);
  }

  const confirmNewStep = () => {
    const newStepInput = document.getElementById('new-step')
    if (!newStepInput.value) return;

    setInstructions([...instructions, newStepInput.value]);
    newStepInput.value = '';
  }

  const handleRecipeUpdate = () => {
    const { errors } = updateRecipe({ 
      id: recipe.id,
      name: name,
      recipeIngrediets: recipeIngrediets,
      description: description,
      preptime: preptime,
      servingSize: servingSize,
      notes: notes,
      mealType: mealType,
      instructions: instructions
    });
    
    if (errors) {
      return setToast({
        message: errors,
        show: true,
        type: 'error'
      })
    }

    setName('');
    setDescription('');
    setPreptime('');
    setServingSize('');
    setNotes('');
    setRecipeIngrediets([]);
    setInstructions([]);
    setMealType('')
    setModal({ showModal: false, currentModal: null })
  }

  const handleDeleteIngredient = (e) => {
    const ingredientId = parseInt(e.target.getAttribute('data-ingredient-id'));
    const _recipeIngrediets = recipeIngrediets.filter(ingredient => ingredient.id !== ingredientId);
    setRecipeIngrediets(_recipeIngrediets);
  }

  const handeDeleteInstruction = (e) => {
    const index = parseInt(e.target.getAttribute('data-index'));
    const _instructions = instructions.filter((_, i) => i !== index);
    setInstructions(_instructions);
  }

  return (
    <form onSubmit={handleSubmit} id="new-recipe-form">

      {/* Name */}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={({target}) => setName(target.value)} />
      </div>

      {/* Ingredients */}
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <select id="ingredient-select" name="ingredient-select" value={-1} onChange={handleSelectChange} >
          <option disabled="disabled" value={-1}></option>
          <option value={0} >Add new ingredient</option>
          {ingredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
          ))}
        </select>
        
        {newIngredientSelect && <NewIngredientInput handleNewIngredientClick={handleNewIngredientClick} hideInput={() => setNewIngredientSelect(false)}/>}
        
        <ul className="ingredient-list">
          <li className="grid">
            <span>Ingredient</span>
            <span>Quantity</span>
            <span>Unit</span>
          </li>
          <br />
          {recipeIngrediets.map(ingredient => (
            <li key={ingredient.id} className='grid'>
              <span>{ingredients.find(_ingredient => _ingredient.id === ingredient.id)?.name}</span>
              <div>
                <input type="number" id="quantity" name="quantity" value={ingredient.quantity ? ingredient.quantity : 0} onChange={({target}) => handleIngredientUpdate(ingredient.id, { updateType: 'quantity', value: target.value})} />
              </div>
              <div>
                <select name="unit" id="unit" value={ingredient.unit ? ingredient.unit : ''} onChange={({target}) => handleIngredientUpdate(ingredient.id, { updateType: 'unit', value: target.value})}>
                  {Object.entries(unitsToDisplay).map(unit => (
                    <option key={unit[0]} value={unit[0]}>{unit[1]}</option> 
                  ))}
                </select>
              </div>
              <button type="button" className='secondary delete-ingredient' data-ingredient-id={ingredient.id} onClick={handleDeleteIngredient}>x</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={description} onChange={({target}) => setDescription(target.value)} />
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h4>Instructions</h4>
        <fieldset role="group">
          <textarea id="new-step" name="new-step"/>
          <button type="button" onClick={confirmNewStep}>Add Step</button>
        </fieldset>
        <ol className="instruction-list">
          {instructions.map((instruction, index) => (
            <li key={index} className='grid'>
              <p>{index+1}. {instruction} </p>
              <button type="button" className='secondary delete-instruction' data-index={index} onClick={handeDeleteInstruction}>x</button>
            </li>
          ))}
        </ol>
      </div>

      {/* Prep Time */}
      <div>
        <label htmlFor="preptime">Prep Time (in minutes):</label>
        <input type="text" id="preptime" name="preptime" value={preptime} onChange={({target}) => setPreptime(target.value)} />
      </div>

      {/* Serving Size */}
      <div>
        <label htmlFor="serving-size">Serving Size (no. of people):</label>
        <input type="text" id="serving-size" name="serving-size" value={servingSize} onChange={({target}) => setServingSize(target.value)} />
      </div>

      {/* Meal Type */}
      <div>
        <label htmlFor="mealType">Meal Type:</label>
        <select id="mealType" name="mealType" value={mealType || -1} onChange={({target}) => setMealType(target.value)} >
          <option disabled="disabled" value={-1}></option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" value={notes} onChange={({target}) => setNotes(target.value)} />
      </div>

      <br />

      {/* Buttons */}
      <div>
        {recipe && <button type="button" onClick={handleRecipeUpdate}>Update Recipe</button>}
        {!recipe && <button type="submit">Add Recipe</button>}
      </div>

      <Toast {...toast} setShow={setToast} />
    </form>
  );
}

export default RecipeForm;