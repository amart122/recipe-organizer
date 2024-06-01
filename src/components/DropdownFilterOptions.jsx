import React, { useState }
from 'react';
import '../assets/css/DropdownFilterOptions.css';

function DropdownFilterOptions({ option, handleFilterChange }) {
  const [collapsed, setCollapsed] = useState(option.checked.length !== 0 && option.checked != "all");

  return (
    <fieldset className={collapsed ? "collapsed" : "" }>
      <legend onClick={() => setCollapsed(!collapsed)}>
        {option.title}
      </legend>

      <div className="options">
      {option.options.map((opt, index) => (
        <div key={index}>
          {option.radio ? (
            <input 
              type="radio"
              id={opt.id}
              name={option.group}
              value={opt.value}
              onChange={(e) => handleFilterChange(e, option.group)}
              checked={opt.value == option.checked}
            />
          ) : (
            <input type="checkbox"
              id={opt.id}
              name={opt.name}
              onChange={(e) => handleFilterChange(e, option.group)}
              checked={option.checked.includes(opt.id.toString())}
            />
          )}
          <label htmlFor={opt.id}>{opt.name}</label>
        </div>
      ))}
      </div>
    </fieldset>
  );
}

export default DropdownFilterOptions;