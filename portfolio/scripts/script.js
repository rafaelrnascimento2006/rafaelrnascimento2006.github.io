function randomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const rgbArray = [red, green, blue];
  const color = `rgb(${rgbArray})`;
  return color;
}

window.onload = function () {
  const body = document.querySelector('body');
body.style.backgroundImage = `linear-gradient(to right, ${randomColor()}, ${randomColor()})`;
};
