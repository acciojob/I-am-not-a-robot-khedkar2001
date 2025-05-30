const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById('image-container');
const h3 = document.getElementById('h');
const para = document.getElementById('para');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');

let selectedImages = [];
let imageElements = [];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function setupImages() {
  container.innerHTML = '';
  para.innerText = '';
  selectedImages = [];
  imageElements = [];

  const images = [...imageClasses];
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[duplicateIndex];
  images.push(duplicateImage);

  shuffle(images);

  images.forEach((imgClass, index) => {
    const img = document.createElement('img');
    img.classList.add(imgClass);
    img.setAttribute('data-img-class', imgClass);
    img.addEventListener('click', () => handleImageClick(img));
    container.appendChild(img);
    imageElements.push(img);
  });

  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) return;

  if (selectedImages.length === 2) return;

  img.classList.add('selected');
  selectedImages.push(img);

  resetBtn.style.display = 'inline-block';

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  para.innerText = '';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';

  const [first, second] = selectedImages;
  const firstClass = first.getAttribute('data-img-class');
  const secondClass = second.getAttribute('data-img-class');

  if (firstClass === secondClass) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = setupImages;
