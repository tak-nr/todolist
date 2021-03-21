const IMAGE_COUNT = 5;

function createRandomNumber() {
  const number = Math.random();
  return parseInt(number * IMAGE_COUNT) + 1;
}

function loadImage() {
  const imageNumber = createRandomNumber();
  const img = new Image();
  img.src = `images/${imageNumber}.jpg`;
  img.className = "backgroundImage";
  const body = document.querySelector("body");

  body.appendChild(img);
}

loadImage();
