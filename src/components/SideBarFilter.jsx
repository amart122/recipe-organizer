import React, { useContext, useRef } from 'react';
import '../assets/css/SideBarFilter.css';
import { RecipeContext } from '../modules/RecipesContext.jsx';
import DropdownFilterOptions from './DropdownFilterOptions';

function SideBarFilter({ ingredients }) {
  const { currentFilter, filterRecipes, sortRecipes } = useContext(RecipeContext);
  const prevFilter = useRef(currentFilter);

  const handleFilterChange = (e, group) => {
    let _filter;
    
    switch(group) {
      case 'text':
        _filter = { ...currentFilter, text: e.target.value };
        break;
      case 'mealTypes':
        _filter = { ...currentFilter, mealTypes: [e.target.value] };
        break;
      case 'preptime':
        _filter = { ...currentFilter, preptime: e.target.value };
        break;
      case 'ingredients':
        const checkedIngredients = [...e.target.parentNode.parentNode.querySelectorAll('input:checked')].map(checkbox => checkbox.id);
        _filter = { ...currentFilter, ingredients: checkedIngredients };
        break;
      default:
        _filter = currentFilter
    }

    prevFilter.current = _filter;
    filterRecipes(_filter);
  }

  const handleSortChange = (e) => {
    prevFilter.current = { ...currentFilter, sortBy: e.target.value };
    sortRecipes(e.target.value);
  }

  return (
    <div id="SideBarFilter">
      <span>{prevFilter.current.value}</span>
      <div>
        <h4>Search</h4>
        <input type="search" id="search" name="search" onChange={e => handleFilterChange(e, "text")} />
        
        <h4>Categories</h4>
        <DropdownFilterOptions
          option={{
            title: "Meal Type",
            options: [
              {id: "allMealTypes", name: "All", value: "all"},
              {id: "breakfast", name: "Breakfast", value: "breakfast"},
              {id: "lunch", name: "Lunch", value: "lunch"},
              {id: "dinner", name: "Dinner", value: "dinner"},
              {id: "dessert", name: "Dessert", value: "dessert"}
            ],
            checked: prevFilter.current.mealTypes || "all",
            group: "mealTypes",
            radio: true
          }}
          handleFilterChange={handleFilterChange}
        />
        <DropdownFilterOptions
          option={{
            title: "Preptime",
            options: [
              {id: "allPreptimes", name: "All", value: "all"},
              {id: "lessthan30", name: "Less than 30 minutes", value: "lessthan30"},
              {id: "30to60", name: "30 to 60 minutes", value: "30to60"},
              {id: "morethan60", name: "More than 60 minutes", value: "morethan60"}
            ],
            checked: prevFilter.current.preptime || "all",
            group: "preptime",
            radio: true
          }}
          handleFilterChange={handleFilterChange}
        />
        <DropdownFilterOptions
          option={{
            title: "Ingredients",
            options: ingredients.map(ingredient => ({ id: ingredient.id, name: ingredient.name })),
            radio: false,
            checked: prevFilter.current.ingredients || [],
            group: "ingredients"
          }}
          handleFilterChange={handleFilterChange}
        />

        <hr />

        <DropdownFilterOptions
          option={{
            title: "Sort By",
            options: [
              {id: "ascName", name: "Name ↓", value: "+name"},
              {id: "descName", name: "Name ↑", value: "-name"},
              {id: "ascPreptime", name: "Prep Time ↓", value: "+preptime"},
              {id: "descPreptime", name: "Prep Time ↑", value: "-preptime"},
              {id: "ascIngredientCount", name: "Ingredient no. ↓", value: "+ingredient"},
              {id: "descIngredientCount", name: "Ingredient no. ↑", value: "-ingredient"},
            ],
            checked: prevFilter.current.sortBy || "",
            group: "sortBy",
            radio: true
          }}
          handleFilterChange={handleSortChange}
        />

      </div>
    </div>
  );
}

export default SideBarFilter;