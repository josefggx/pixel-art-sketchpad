const container = document.querySelector("#canvas");
// @ts-ignore
container.ondragstart = function () { return false; }

function returnFalse() { return false }

// Function that make the range dynamic
let sliderLabel = document.querySelector("#size-label");
const range = document.querySelector("#size-slider");

// Get the options container element
const btnContainer = document.querySelector("#button-container");

// Get all buttons with class="btn" inside the container
let active = "pen";

// Mode selector listening to buttons
const btns = btnContainer.querySelectorAll('.btn');

const btnsListening = () => {
    btns.forEach(button => {
        button.addEventListener('click', function () {
            btns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            active = button.id;
        });
    });
}

btnsListening();

const sliderLabelLive = () => {
    sliderLabel = document.querySelector("#size-label");
    // @ts-ignore
    const sliderValue = document.querySelector("#size-slider").value;
    sliderLabel.innerHTML = `${sliderValue} x ${sliderValue}`;
}

// @ts-ignore
document.querySelector("#size-slider").onmousemove = () => {
    sliderLabelLive();
}

// @ts-ignore
document.querySelector("#size-slider").onclick = () => {
    sliderLabelLive();
}

// variable to change canvas size dynamically
let canvasSize;

// @ts-ignore
let backgroundActualColor = document.querySelector('#background-color').value;
// @ts-ignore
document.querySelector('#background-color').oninput = () => {
    // @ts-ignore
    backgroundActualColor = document.querySelector('#background-color').value;
    changeBackgroundColor();
}

// Function to create multiple div linked to a listener
// that tell us how many pixels we need: 16x16?
const generatePixels = () => {
    // @ts-ignore
    canvasSize = document.querySelector("#size-slider").value;
    // @ts-ignore
    container.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    // @ts-ignore
    container.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;
    const divNumber = canvasSize * canvasSize;
    for(let i = 0; i < divNumber; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.backgroundColor = backgroundActualColor;
        container.appendChild(pixel);
    }
    return;
}

generatePixels();

const changeBackgroundColor = () => {
    document.querySelectorAll(".pixel").forEach(e => {
        // @ts-ignore
        if(!e.classList.contains("painted")) {
            // @ts-ignore
            e.style.backgroundColor = backgroundActualColor;
        }
    })
}

// @ts-ignore
let actualColor = document.querySelector("#pen-color").value;

// @ts-ignore
document.querySelector("#pen-color").oninput = () => {
    // @ts-ignore
    actualColor = document.querySelector("#pen-color").value;
    active = "pen";
    btns.forEach(btn => btn.classList.remove('active'));
    document.querySelector("#pen").classList.add('active');
}

// This function take the divs and apply a the grid
const penColor = (e) => {
    // @ts-ignore
    actualColor = document.querySelector("#pen-color").value;
    e.style.backgroundColor = `${actualColor}`;
    e.classList.add("painted");
    return;
}

const eraser = (e) => {
    e.style.backgroundColor = backgroundActualColor;
    e.classList.remove("painted");
}

const rainbowColorArray = ["#74F93F", "#FF0090", "#73FAE9", "#FF1E00", "#EB40EC", "#73F978", "#001EFF", "#8825F8", "#A7FB41", "#FF9100", "#FFFB00", "#449CFA"];

const randomColorGenerator = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

let randomColor;

const rainbowPen = (e) => {
    randomColor = randomColorGenerator(rainbowColorArray);
    // document.querySelector("#pen-color").value = randomColor;
    e.style.backgroundColor = `${randomColor}`;
    e.classList.add("painted");
}

// EyeDropper
let eyedroppedColor = "#ffffff";
const eyedropper = (e) => {
    eyedroppedColor = rgbConvertor(e.style.backgroundColor);
    // @ts-ignore
    document.querySelector('#pen-color').value = eyedroppedColor;
}

// RGB to Hex
const rgbConvertor = (rgb) => {
    // @ts-ignore
    return '#' + rgb.slice(4, -1).split(',').map(x => (+x).toString(16).padStart(2, 0)).join('');
}

// Delete previous grid function grid
const deleteGrid = () => {
    container.innerHTML = '';
}

// Clear previous grid function grid
const clearGrid = () => {
    document.querySelectorAll(".painted").forEach(e => {
        // @ts-ignore
        e.style.backgroundColor = `${backgroundActualColor}`;
        e.classList.remove("painted");
    })
}

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    clearGrid();
    gridLinesBtn.classList.add("active");
    paintPixels();
    active = "pen";
    btns.forEach(btn => btn.classList.remove('active'));
    document.querySelector("#pen").classList.add('active');
})


const gridLinesBtn = document.querySelector('#grid-lines');

gridLinesBtn.addEventListener('click', () => {
    gridLinesBtn.classList.toggle("active");
    document.querySelectorAll(".pixel").forEach(e => {
        if(gridLinesBtn.classList.contains("active")) {
            // @ts-ignore
            e.style.border = `1px solid rgba(0, 0, 0, 0.05)`;
            gridLinesBtn.innerHTML = "Grid Lines: On";
        } else {
            // @ts-ignore
            e.style.border = "0px";
            gridLinesBtn.innerHTML = "Grid Lines: Off";
        }
    });
})

// Function to light or shade colors, put negative values in percent to shade.
function LightenDarkenColor(color, percent) {
    const f = color.split(","), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = parseInt(f[0].slice(4)), G = parseInt(f[1]), B = parseInt(f[2]);
    return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
}

// TEST
console.log(LightenDarkenColor("3F6D2A", -40));

// This will help us to determine if mouse is down or out
let mouseIsDown = false;

// Function to paint on canvas
const paintPixels = () => {
    document.querySelectorAll(".pixel").forEach(e => {
        window.addEventListener("mousedown", () => {
            mouseIsDown = true;
        });
        e.addEventListener("mousedown", () => {
            mouseIsDown = true;
            if(active === "pen") {
                penColor(e);
            }
            if(active === "eraser") {
                eraser(e);
            }
            if(active === "rainbow") {
                rainbowPen(e)
            }
            if(active === "eyedropper") {
                eyedropper(e);
            }
            if(active === "lightening") {
                // @ts-ignore
                let oldColor = e.style.backgroundColor;
                let newColor = LightenDarkenColor(oldColor, 0.06)
                // @ts-ignore
                e.style.backgroundColor = `${newColor}`;
            }
            if(active === "shading") {
                // @ts-ignore
                let oldColor = e.style.backgroundColor;
                let newColor = LightenDarkenColor(oldColor, -0.06)
                // @ts-ignore
                e.style.backgroundColor = `${newColor}`;
            }
        });
        window.addEventListener('mouseup', function () {
            mouseIsDown = false;
            if(active === "eyedropper") {
                active = "pen";
                btns.forEach(btn => btn.classList.remove('active'));
                document.querySelector("#pen").classList.add('active');
            }
        });
        e.addEventListener('mouseover', function () {
            if(mouseIsDown) {
                // Here you will do validations around
                // the different modes of the app
                if(active === "pen") {
                    penColor(e);
                }
                if(active === "eraser") {
                    eraser(e);
                }
                if(active === "rainbow") {
                    rainbowPen(e)
                }
                if(active === "eyedropper") {
                    eyedropper(e);
                }
                if(active === "lightening") {
                    // @ts-ignore
                    let oldColor = e.style.backgroundColor;
                    let newColor = LightenDarkenColor(oldColor, 0.06);
                    // @ts-ignore
                    e.style.backgroundColor = `${newColor}`;
                }
                if(active === "shading") {
                    // @ts-ignore
                    let oldColor = e.style.backgroundColor;
                    let newColor = LightenDarkenColor(oldColor, -0.06);
                    // @ts-ignore
                    e.style.backgroundColor = `${newColor}`;
                }
            }
        })
    });
}


paintPixels();


// Reseting the canvas and calling functions again
// @ts-ignore
document.querySelector("#size-slider").onchange = () => {
    sliderLabelLive();
    deleteGrid();
    gridLinesBtn.classList.add("active");
    generatePixels();
    paintPixels();
}

