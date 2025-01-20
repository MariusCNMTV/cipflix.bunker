let currentBackground = null;

window.startMorphingAnimation = function() {
  setTimeout(() => {
    startMorphing = true;
    addOrangeBackgroundToContainer();
  }, 5000);
};

function addOrangeBackgroundToContainer() {
  const container = document.querySelector(".container");
  if (container) {
    if (currentBackground) {
      // Fade out the current background first
      currentBackground.style.opacity = "0";
      setTimeout(() => {
        currentBackground.remove();
        createNewBackground("orange"); // Create the new orange background after the fade-out
      }, 1000); // Wait for the fade-out transition to complete
    } else {
      createNewBackground("orange"); // Directly create the orange background if no previous background exists
    }
  }
}

function addBlueBackgroundToContainer() {
  const container = document.querySelector(".container");
  if (container) {
    if (currentBackground) {
      // Fade out the current background first
      currentBackground.style.opacity = "0";
      setTimeout(() => {
        currentBackground.remove();
        createNewBackground("blue"); // Create the new blue background after the fade-out
      }, 1000); // Wait for the fade-out transition to complete
    } else {
      createNewBackground("blue"); // Directly create the blue background if no previous background exists
    }
  }
}

function createNewBackground(color) {
  const container = document.querySelector(".container");
  const afterElement = document.createElement("div");
  afterElement.style.position = "absolute";
  afterElement.style.top = "0";
  afterElement.style.left = "0";
  afterElement.style.right = "0";
  afterElement.style.bottom = "0";
  
  if (color === "orange") {
    afterElement.style.background = "radial-gradient(circle, rgba(252, 104, 6, 0.7) 5%, transparent 55%)";
    afterElement.style.maskImage = "radial-gradient(circle, transparent 0%, black 25%)";
  } else if (color === "blue") {
    afterElement.style.background = "radial-gradient(circle, rgba(0, 255, 225, 0.25) 0%, transparent 70%)";
  }

  afterElement.style.opacity = "0";
  afterElement.style.transition = "background 1s ease-in-out, mask-image 1s ease-in-out, opacity 1s ease-in-out";

  container.appendChild(afterElement);
  currentBackground = afterElement;
  setTimeout(() => {
    afterElement.style.opacity = "1";
  }, 60);
}

document.addEventListener("DOMContentLoaded", () => {
  startMorphingAnimation();
});
