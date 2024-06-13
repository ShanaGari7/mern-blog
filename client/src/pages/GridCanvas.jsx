import React, { useState, useRef, useEffect } from "react";

function GridCanvas() {
  const canvasRef = useRef(null);
  const [gridRows, setGridRows] = useState(10);
  const [gridCols, setGridCols] = useState(10);
  const [drawColor, setDrawColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [eraseMode, setEraseMode] = useState(false);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    drawGrid();
  }, [gridRows, gridCols, bgColor]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cellSize = 20;
    const offset = 20; // Offset for numbering
    canvas.width = gridCols * cellSize + offset;
    canvas.height = gridRows * cellSize + offset;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 0.5;

    // Draw the grid lines
    for (let x = 0; x <= canvas.width; x += cellSize) {
      ctx.moveTo(x + offset, offset);
      ctx.lineTo(x + offset, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += cellSize) {
      ctx.moveTo(offset, y + offset);
      ctx.lineTo(canvas.width, y + offset);
    }

    ctx.stroke();

    // Draw row and column numbers
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let col = 0; col < gridCols; col++) {
      const x = offset + col * cellSize + cellSize / 2;
      ctx.fillText(col + 1, x, offset / 2);
    }

    for (let row = 0; row < gridRows; row++) {
      const y = offset + row * cellSize + cellSize / 2;
      ctx.fillText(row + 1, offset / 2, y);
    }
  };

  const fillCell = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 20;
    const y = e.clientY - rect.top - 20;

    if (x < 0 || y < 0) return;

    const col = Math.floor(x / 20);
    const row = Math.floor(y / 20);

    if (col >= gridCols || row >= gridRows) return;

    ctx.fillStyle = eraseMode ? bgColor : drawColor;
    ctx.fillRect(col * 20 + 21, row * 20 + 21, 18, 18); // Fill only the inside of the cell
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    fillCell(e);
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      fillCell(e);
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div>
      <h1>Grid Canvas</h1>
      <div>
        <label>
          Rows:
          <input
            type="number"
            value={gridRows}
            onChange={(e) => setGridRows(Number(e.target.value))}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={gridCols}
            onChange={(e) => setGridCols(Number(e.target.value))}
          />
        </label>
        <label>
          Draw Color:
          <input
            type="color"
            value={drawColor}
            onChange={(e) => setDrawColor(e.target.value)}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <button onClick={() => setEraseMode(!eraseMode)}>
          {eraseMode ? "Erase" : "Draw"}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        style={{
          border: "1px solid #000",
          cursor: eraseMode ? "crosshair" : "pointer",
        }}
      ></canvas>
    </div>
  );
}

export default GridCanvas;
