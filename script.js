const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'

let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE
let currentColor = DEFAULT_COLOR

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
  }
  
  function setCurrentSize(newSize) {
    currentSize = newSize
  }

const grid = document.getElementById("grid");
const sizeSlider= document.getElementById("myRange");
const numbers = document.getElementById("numbers");
const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const eraserBtn = document.getElementById("eraserBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const clearBtn = document.getElementById("clearBtn");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('eraser');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
clearBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange= (e) => changeSize(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function updateSizeValue(value) {
  numbers.innerHTML = `${value} x ${value}`
}
  
function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}
function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}
function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.classList.add('grid-element')
      gridElement.addEventListener('mouseover', changeColor)
      gridElement.addEventListener('mousedown', changeColor)
      grid.appendChild(gridElement)
    }
  }
  
  function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }
  }

  function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
  }
  
  window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }