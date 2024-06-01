import React, { useContext } from 'react';
import '../assets/css/ModalContainer.css';
import { ModalContext } from '../modules/ModalContext';
import ImportModal from './ImportModal';
import RecipeFormModal from './RecipeFormModal';

function ModalContainer() {
  const { modal, setModal } = useContext(ModalContext);
  if (modal.showModal === false) return null;

  const closeOnFocusOff = (e) => {
    if (e.target.id === 'modal-container') {
      setModal({showModal: false, currentModal: null});
    }
  }

  return (
    <dialog id="modal-container" onClick={closeOnFocusOff}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={() => setModal({showModal: false, currentModal: null})}></button>
        </header>
        { modal.currentModal === 'import' ? (
          <ImportModal/>
        ) : modal.currentModal === 'new-recipe' ? (
          <RecipeFormModal recipe={null}/>
        ) : modal.currentModal === 'edit-recipe' ? (
          <RecipeFormModal recipe={modal.recipe}/>
        ) : null
        }
      </article>
    </dialog>
  );
}

export default ModalContainer;