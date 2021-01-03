function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

window.onload = function () {
  const body = document.querySelector('body');
body.style.backgroundImage = `linear-gradient(to right, ${randomColor()}, ${randomColor()})`;
};
