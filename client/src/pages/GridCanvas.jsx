import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { ref, uploadString } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { storage } from "../firebase";
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

  const savePattern = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const user = getAuth().currentUser;
    if (!user) {
      alert("You must be logged in to save patterns.");
      return;
    }
    const userId = user.uid;
    const storageRef = ref(storage, `patterns/${userId}/${Date.now()}.png`);
    await uploadString(storageRef, dataURL, "data_url");
    setAlert("Pattern saved successfully to Firebase Storage");
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
            className="border rounded px-2 py-1 text-blue-500"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Columns:</span>
          <input
            type="number"
            value={gridCols}
            onChange={(e) => setGridCols(Number(e.target.value))}
            className="border rounded px-2 py-1 text-blue-500"
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
          color="blue"
          pill
          outline
        >
          {eraseMode ? "Erase" : "Draw"}
        </Button>
        <Button onClick={downloadCanvas} color="green" pill>
          Download
        </Button>
        <Button onClick={savePattern} color="purple" pill>
          Save Pattern
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
