import React, { useState } from 'react';

function ImportModal() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(url);
  };

  return (
    <div id="import-modal">
      <h1>Import Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImportModal;