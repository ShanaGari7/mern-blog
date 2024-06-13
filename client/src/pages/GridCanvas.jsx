import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { Button, Alert } from "flowbite-react";

function GridCanvas() {
  const canvasRef = useRef(null);
  const [gridRows, setGridRows] = useState(10);
  const [gridCols, setGridCols] = useState(10);
  const [drawColor, setDrawColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [eraseMode, setEraseMode] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    drawGrid();
  }, [gridRows, gridCols, bgColor]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cellSize = 20;
    const offset = 20;
    canvas.width = gridCols * cellSize + offset;
    canvas.height = gridRows * cellSize + offset;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= canvas.width; x += cellSize) {
      ctx.moveTo(x + offset, offset);
      ctx.lineTo(x + offset, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += cellSize) {
      ctx.moveTo(offset, y + offset);
      ctx.lineTo(canvas.width, y + offset);
    }

    ctx.stroke();

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
    ctx.fillRect(col * 20 + 21, row * 20 + 21, 18, 18);
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

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "grid-pattern.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">Grid Canvas</h1>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <span>Rows:</span>
          <input
            type="number"
            value={gridRows}
            onChange={(e) => setGridRows(Number(e.target.value))}
            className="border rounded px-2 py-1 text-zinc-500"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Columns:</span>
          <input
            type="number"
            value={gridCols}
            onChange={(e) => setGridCols(Number(e.target.value))}
            className="border rounded px-2 py-1 text-zinc-500"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Draw Color:</span>
          <input
            type="color"
            value={drawColor}
            onChange={(e) => setDrawColor(e.target.value)}
            className="border rounded"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Background Color:</span>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="border rounded"
          />
        </label>
        <Button
          onClick={() => setEraseMode(!eraseMode)}
          className="text-gray-700 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-400 hover:to-lime-200 focus:ring-2 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-200 font-medium rounded-lg text-sm text-center me-2 mb-2"
        >
          {eraseMode ? "Erase" : "Draw"}
        </Button>
        <Button onClick={downloadCanvas} className="text-gray-700 bg-gradient-to-r from-cyan-200 to-purple-600 hover:bg-gradient-to-l hover:from-purple-400 hover:to-cyan-600 focus:ring-2 focus:outline-none focus:ring-lime-200 dark:focus:ring-cyan-200 font-medium rounded-lg text-sm text-center me-2 mb-2" pill>
          Download
        </Button>
      </div>
      {alert && (
        <Alert color="success" onDismiss={() => setAlert(null)}>
          {alert}
        </Alert>
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        className="border border-black cursor-pointer"
        style={{ cursor: eraseMode ? "crosshair" : "pointer" }}
      ></canvas>
    </div>
  );
}

export default GridCanvas;
