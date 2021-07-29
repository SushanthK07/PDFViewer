let activeCanvas;
let activeCanvasBoundingRect;
let canvasContext;
let canvasX;
let canvasY;
let lastMouseX;
let lastMouseY;
let mouseX;
let mouseY;
let width;
let height;
let parentCanvas;
let parentDiv;

let clipping = false;
let controller;
let signal;

function findXY(e) {
  if (activeCanvas && canvasContext) {
    mouseX = parseInt(e.clientX - canvasX - activeCanvasBoundingRect.left, 10);
    mouseY = parseInt(e.clientY - canvasY - activeCanvasBoundingRect.top, 10);
    canvasContext.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    canvasContext.beginPath();
    width = mouseX - lastMouseX;
    height = mouseY - lastMouseY;
    canvasContext.rect(lastMouseX, lastMouseY, width, height);
    canvasContext.strokeStyle = "black";
    canvasContext.fillStyle = "rgba(130, 211, 255, 0.5)";
    canvasContext.lineWidth = 1;
    canvasContext.stroke();
    canvasContext.fill();
  }
}

const mouseDownListener = (event) => {
  // console.log("Listening to Mouse Down event");
  const path = event.path || (event.composedPath && event.composedPath());
  // console.log(path);
  const index = path.findIndex((element) => element.className === "page");

  if (index === -1) return;

  const canvas = path[index].children[0].children[0];
  parentCanvas = canvas;

  if (canvas) {
    if (canvas.parentElement.children.length < 2) {
      parentDiv = canvas.parentElement.parentElement;
      activeCanvas = document.createElement("canvas");
      parentDiv.appendChild(activeCanvas);
      activeCanvas.id = "overlay-canvas";
      activeCanvas.style.position = "absolute";
      activeCanvas.style.top = "0";
      activeCanvas.style.left = "0";
      activeCanvas.width = parentDiv.offsetWidth - 15;
      activeCanvas.height = parentDiv.offsetHeight;
      activeCanvas.zIndex = 1000;
    }
    if (activeCanvas) {
      canvasContext = activeCanvas.getContext("2d");
      activeCanvasBoundingRect = activeCanvas.getBoundingClientRect();
      canvasX = activeCanvas.offsetLeft;
      canvasY = activeCanvas.offsetTop;
      lastMouseX = parseInt(
        event.clientX - canvasX - activeCanvasBoundingRect.left,
        10
      );
      lastMouseY = parseInt(
        event.clientY - canvasY - activeCanvasBoundingRect.top,
        10
      );
      activeCanvas.addEventListener("mousemove", (e) => findXY(e));
      console.log("Clipping started");
    } else activeCanvas = undefined;
  }
};

const mouseUpListener = () => {
  // console.log("Listening to Mouse Up event");
  if (activeCanvas) {
    if (canvasContext.drawImage) {
      const scale = window.devicePixelRatio;

      canvasContext.clearRect(0, 0, activeCanvas.width, activeCanvas.height);

      const c = document.createElement("canvas");
      c.id = "clipping";
      c.style.position = "absolute";
      // parentDiv.appendChild(c);
      c.setAttribute("width", Math.floor(width * scale));
      c.setAttribute("height", Math.floor(height * scale));

      c.style.width = Math.floor(width * scale) + "px";
      c.style.height = Math.floor(height * scale) + "px";

      const cc = c.getContext("2d");

      cc.drawImage(
        parentCanvas,
        lastMouseX * scale,
        lastMouseY * scale,
        width * scale,
        height * scale,
        800,
        0,
        width,
        height
      );

      const hidden_data = c
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      console.log({ clip: c, blob: hidden_data });

      canvasContext.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    }
    activeCanvas.removeEventListener("mousemove", () => findXY(activeCanvas));
    parentDiv.removeChild(activeCanvas);
    console.log("Clipping ended");
  }
  activeCanvas = undefined;
  activeCanvasBoundingRect = undefined;
};

function initClipping() {
  const iframeDocument = frames["pdf-js-iframe"].document;
  const targetElement = iframeDocument.getElementById("viewer");

  targetElement.addEventListener("mousedown", mouseDownListener, {signal});
  targetElement.addEventListener("mouseup", mouseUpListener, {signal});
}

function handleClipping() {
    clipping = !clipping;

    if (clipping) {
        initAbortController();
        initClipping(signal);
        console.log("Clipping Mode: ON");
    } else {
        controller.abort();
        console.log("Clipping Mode: OFF");
    }
}

function initAbortController() {
    controller = new window.AbortController();
    signal = controller.signal;    
}

setTimeout(() => {
  const iframeDocument = frames["pdf-js-iframe"].document;
  const clipBtnElement = iframeDocument.getElementById("needl-clip-btn");
  clipBtnElement.addEventListener('click', handleClipping);
}, 1000);
