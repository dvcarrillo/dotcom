function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(8);
    colorMode(RGB);
}

function mouseDragged() {
    stroke(162, 250, 163);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}