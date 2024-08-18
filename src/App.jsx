import { useState } from 'react'
import './App.css'

function App() {
  const [matrix, setMatrix] = useState([[null]]);

  const addRow = () => {
    setMatrix(prevMatrix => {
      const newSize = prevMatrix.length + 1;
      const newRow = new Array(newSize).fill(null);

      return [...prevMatrix.map(row => [...row, null]), newRow];
    });
  };

  const addColumn = () => {
    setMatrix(prevMatrix => {
      const newSize = prevMatrix.length + 1;
      const newColumn = new Array(newSize).fill(null);

      return [...prevMatrix.map(row => [...row, null]), newColumn];
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
    <div className='App'>
      <div className="controlls">
        <button onClick={addRow}> Add Row</button>
        <button onClick={addColumn}> Add Column</button>
        <span> Matrix Size : {matrix.length} X {matrix[0].length}</span>
      </div>
      <div className='matrix'>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((cell, colIndex) => (
              <div key={colIndex} className='cell'>
                {cell}
                <div className='cell-options'>
                  <button onClick={() => deleteCell(rowIndex, colIndex)}> Delete</button>
                  <button onClick={() => toggleFill(rowIndex, colIndex)}>
                    {cell ? 'Empty' : "Fill"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
