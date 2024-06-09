import React, { useState } from 'react';
import '../assets/css/NewIngredientInput.css';

function NewIngredientInput({ handleNewIngredientClick, hideInput }) {
  const [name, setName] = useState('');

  return (
    <div className='new-ingredient-container'>
      <label htmlFor="NewIngredient">New Ingredient:</label>
      <input name='NewIngredient' value={name} onChange={(e) => setName(e.target.value)} type="text" />
      <button type="button" onClick={() => handleNewIngredientClick(name) }>Add Ingredient</button>
      <button className='secondary' type="button" onClick={hideInput}>Cancel</button>
    </div>
  );
}

export default NewIngredientInput;