var R = 162;
var G = 250;
var B = 163;
var drawing = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(8);
    colorMode(RGB);
}

function mouseDragged() {
    stroke(R, G, B);
    line(pmouseX, pmouseY, mouseX, mouseY);
    if (!drawing) {
        document.getElementById("action-bar").style.transform = "translate(0,0)";
        document.getElementById("page-canvas").classList.add("dotted");
        document.getElementById("fadeout").style.opacity = 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function changeColor() {
    R = Math.floor(Math.random() * 255);
    G = Math.floor(Math.random() * 255);
    B = Math.floor(Math.random() * 255);
    document.getElementById("color-circle").style.backgroundColor = `rgb(${R},${G},${B})`;
}