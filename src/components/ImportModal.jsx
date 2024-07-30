import React, { useState, useContext } from 'react';
import { importRecipe } from '../modules/RecipeImport';
import { useNavigate } from 'react-router-dom';
import FullpageSpinner from './FullpageSpinner';
import Toast from './Toast';
import { ModalContext } from '../modules/ModalContext';
import { RecipeContext } from '../modules/RecipesContext';

function ImportModal() {
  const [url, setUrl] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [toast, setToast] = useState({ message: '', show: false });
  const { setModal } = useContext(ModalContext);
  const { addRecipe, reloadFilters } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSpinner(true)
    importRecipe(url)
      .then( ({ recipe }) => {
        setModal({ showModal: false, currentModal: null });
        addRecipe(recipe);
        reloadFilters();
        navigate('/recipe/' + recipe.id);
      })
      .catch( (error) => {
        setToast({ message: error.message, show: true, type: "error" });
      })
      .finally(() => {
        setShowSpinner(false)
      })
  };

  return (
    <div id="import-modal">
      <h1>Import Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} autoComplete='off'/>
        <button type="submit">Submit</button>
      </form>
      {showSpinner && <FullpageSpinner/>}
      <Toast message={toast.message} show={toast.show} setToast={setToast} type={toast.type}/>
    </div>
  );
}

export default ImportModal;