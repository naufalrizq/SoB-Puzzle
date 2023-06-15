let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = 0;
let yOffset = 0;

const draggableCards = document.querySelectorAll('.draggable-card');
draggableCards.forEach((card) => {
  card.addEventListener('mousedown', dragStart);
  card.addEventListener('mouseup', dragEnd);
  card.addEventListener('mousemove', drag);
});

function dragStart(e) {
  isDragging = true;
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
}

function dragEnd() {
  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    const card = e.target.closest('.draggable-card');
    setTranslate(currentX, currentY, card);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}