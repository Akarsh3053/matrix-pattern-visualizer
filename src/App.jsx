import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFillDrip, faStar } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [matrix, setMatrix] = useState([[null]]);

  const addRowAndColumn = () => {
    setMatrix(prevMatrix => {
      const newSize = prevMatrix.length + 1;
      const newRow = new Array(newSize).fill(null);
      return [...prevMatrix.map(row => [...row, null]), newRow];
    });
  };

  const deleteCell = (rowIndex, colIndex) => {
    setMatrix(prevMatrix => {
      const newSize = prevMatrix.length - 1;
      if (newSize < 1) return [[null]];

      return prevMatrix
        .filter((_, i) => i !== rowIndex)
        .map(row => row.filter((_, i) => i !== colIndex))
        .slice(0, newSize)
        .map(row => row.slice(0, newSize));
    });
  };

  const toggleFill = (rowIndex, colIndex) => {
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix.map(row => [...row]);
      newMatrix[rowIndex][colIndex] = newMatrix[rowIndex][colIndex] ? null : '*';
      return newMatrix;
    });
  };

  return (
    <div className="App">
      <button className="add-button" onClick={addRowAndColumn}>Increase Grid Size</button>
      <div className="matrix-size">
        Matrix Size: {matrix.length} x {matrix[0].length}
      </div>
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell">
                {cell ? <FontAwesomeIcon icon={faStar} /> : null}
                <div className="cell-controls">
                  <button onClick={() => deleteCell(rowIndex, colIndex)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button onClick={() => toggleFill(rowIndex, colIndex)}>
                    <FontAwesomeIcon icon={faFillDrip} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;