if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("dark mode");

    var R = 224;
    var G = 224;
    var B = 224;
} else {
    var R = 24;
    var G = 24;
    var B = 24;
}

var drawing = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(8);
    colorMode(RGB);
}

function mouseDragged() {
    stroke(R, G, B);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}