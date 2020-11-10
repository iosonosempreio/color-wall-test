let myColor, size=2;
const socket = io();
socket.on("connect", newConnection);
socket.on("color", (color) => {
  console.log(color);
  myColor = color;
});
socket.on("mouseBroadcast", otherMouse);

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
}

function draw() {
  // put drawing code here
  // background("lavender");
  if (myColor&&mouseIsPressed) {
    push();
    fill(myColor);
    noStroke()
    ellipse(mouseX, mouseY, size);
    pop();
    if (size<30) size++;
  } else {
    size=2
  }
}

function newConnection() {
  console.log("your id:", socket.id);
}

function mouseDragged() {
  handleInteraction();
  return false
}
function touchMoved() {
  handleInteraction();
  return false
}

function handleInteraction() {
  let message = {
    id: socket.id,
    color: myColor,
    size,
    x: mouseX,
    y: mouseY,
  };
  socket.emit("mouse", message);
}
function otherMouse(data) {
  console.log("other mouse data", data);
  push();
  fill(data.color);
  noStroke()
  ellipse(data.x, data.y, data.size);
  pop();
}
