import React, { useState } from 'react';
import { importRecipe } from '../modules/RecipeImport';
import { useNavigate } from 'react-router-dom';

function ImportModal() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    importRecipe(url)
      .then( ({ importedId }) => {
        navigate('/recipe/' + importedId)
      })
      .catch( (error) => {
        console.error(error)
      })
      .finally(() => {
        // Close spinner
      })
  };

  return (
    <div id="import-modal">
      <h1>Import Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} autoComplete=''/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImportModal;