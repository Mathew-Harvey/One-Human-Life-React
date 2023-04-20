import React, { useState, useEffect } from 'react';
import './App.css';

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function App() {
  const [ageInYears, setAgeInYears] = useState(0);
  const [cells, setCells] = useState([]);
  const numRows = 108;
  const numCols = 47;

  const handleAgeChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setAgeInYears(value);
    }
  };

  const calculateCells = () => {
    const ageInWeeks = ageInYears * 47;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight - 150; // subtracting the height of the header and form
    const cellWidth = windowWidth / numCols;
    const cellHeight = windowHeight / numRows;
    const newCells = make2DArray(numCols, numRows);
  
    for (let j = 0; j < numRows; j++) {
      for (let i = 0; i < numCols; i++) {
        const index = j * numCols + i;
        if (index < ageInWeeks) {
          if (index < 5 * 47) {
            // First 5 years of life are pink
            newCells[i][j] = { r: 255, g: 192, b: 203 };
          } else if (index  >= 5 * 47 && index < 12 *47) {
            // Between 6 and 12 years old are orange
            newCells[i][j] = { r: 255, g: 165, b: 0 };
          } else if (index  >= 12 * 47 && index < 17 *47) {
            // Between 12 and 17 years old are dark orange
            newCells[i][j] = { r: 139, g: 64, b: 0 };
          } else {
            // After 12 years old are red
            newCells[i][j] = { r: 255, g: 0, b: 0 };
          }
        } else {
          newCells[i][j] = { r: 255, g: 255, b: 255 };
        }
      }
    }
  
    setCells(newCells);
  };
  
  useEffect(() => {
    calculateCells();
  }, [ageInYears]);

  useEffect(() => {
    window.addEventListener("resize", calculateCells); // re-calculate cells on window resize
    return () => window.removeEventListener("resize", calculateCells);
  }, []);

  const setCellSize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight - 200; // subtracting the height of the header and form
    const cellWidth = Math.floor(windowWidth / numCols);
    const cellHeight = Math.floor(windowHeight / numRows);
    const cellSize = Math.min(cellWidth, cellHeight);
    return cellSize;
  };

  const cellSize = setCellSize();

  const gridTemplateRows = `repeat(${numRows / 10}, ${cellSize * 10}px)`;
  const gridTemplateColumns = `repeat(${numCols / 4}, ${cellSize * 4}px)`;

  const gridStyle = {
    display: 'grid',
    gridTemplateRows,
    gridTemplateColumns,
    gridAutoFlow: 'column',
  };

   // Set the desired cell size here

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    margin: '0px 3px 5px 0px', // Adjust margins to your preference
  };


  return (
    <div className="container">
      <h1 className="title">One Human Life In Weeks</h1>
      <div className="form">
        <label htmlFor="age-input" className="label">
          Enter your age in years:
        </label>
        <input
          id="age-input"
          type="number"
          min="0"
          value={ageInYears}
          onChange={handleAgeChange}
          className="input"
        />
        <button onClick={calculateCells}>Submit</button>
      </div>
      <div className="axis-label">weeks</div>
      <div className="grid-container">
        <div className="axis-labelSide">years</div>
        <div
          className="grid"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${numRows}, ${cellSize}px)`,
            gridTemplateColumns: `repeat(13, ${cellSize}px)`,
            gridAutoFlow: 'column',
          }}
        >
          {cells.slice(0, numCols).map((col, i) => (
            <React.Fragment key={i}>
              {col.slice(0, numRows).map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    backgroundColor: `rgb(${cell.r}, ${cell.g}, ${cell.b})`,
                    width: `${setCellSize(i)}px`,
                    height: `${cellSize}px`,
                    marginLeft: i % 4 === 3 ? '5px' : '0', // Add 3px margin to the left of every 4th column
                    marginTop: j % 11 === 10 ? '5px' : '0', // Add 5px margin to the top of every 10th row
                  }}
                  className="cell"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
  
                }
  export default App
