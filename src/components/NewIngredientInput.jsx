import React, { useState } from 'react';

function NewIngredientInput({ handleNewIngredientClick }) {
  const [name, setName] = useState('');

  return (
    <div>
      <label htmlFor="NewIngredient">New Ingredient:</label>
      <input name='NewIngredient' value={name} onChange={(e) => setName(e.target.value)} type="text" />
      <button type="button" onClick={() => handleNewIngredientClick(name) }>Add Ingredient</button>
    </div>
  );
}

export default NewIngredientInput;