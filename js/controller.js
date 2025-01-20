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
    // Remove the current background if it exists
    if (currentBackground) {
      currentBackground.remove();
    }

    const afterElement = document.createElement("div");
    afterElement.style.position = "absolute";
    afterElement.style.top = "0";
    afterElement.style.left = "0";
    afterElement.style.right = "0";
    afterElement.style.bottom = "0";
    afterElement.style.background = "radial-gradient(circle, rgba(252, 104, 6, 0.7) 5%, rgba(0, 0, 0, 0) 55%)";
    afterElement.style.maskImage = "radial-gradient(circle, transparent 0%, black 25%)";
    afterElement.style.opacity = "0";
    afterElement.style.transition = "background 2s ease-in-out, mask-image 2s ease-in-out, opacity 2s ease-in-out";
  
    container.appendChild(afterElement);
    currentBackground = afterElement;
    setTimeout(() => {
      afterElement.style.opacity = "1";
    }, 60);
  }
}

function addBlueBackgroundToContainer() {
  const container = document.querySelector(".container");
  if (container) {
    // Remove the current background if it exists
    if (currentBackground) {
      currentBackground.remove();
    }

    const afterElement = document.createElement("div");
    afterElement.style.position = "absolute";
    afterElement.style.top = "0";
    afterElement.style.left = "0";
    afterElement.style.right = "0";
    afterElement.style.bottom = "0";
    afterElement.style.background = "radial-gradient(circle, rgba(0, 255, 225, 0.25) 0%, rgba(0, 0, 0, 0) 70%)";
    afterElement.style.opacity = "0";
    afterElement.style.transition = "background 2s ease-in-out, mask-image 2s ease-in-out, opacity 2s ease-in-out";

    container.appendChild(afterElement);
    currentBackground = afterElement;
    setTimeout(() => {
      afterElement.style.opacity = "1";
    }, 60);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startMorphingAnimation();
});
