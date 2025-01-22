document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.grid-info-group').forEach(group => {
    const currentElement = group.querySelector('.data .row:nth-child(1) .value');
    const maxElement = group.querySelector('.data .row:nth-child(2) .value');
    const minElement = group.querySelector('.data .row:nth-child(3) .value');
    const progressElement = group.querySelector('.progress');
    const progressValueLeft = group.querySelector('.progress-value-left');
    const progressValueRight = group.querySelector('.progress-value-right');

    if (currentElement && maxElement && minElement && progressElement && progressValueLeft && progressValueRight) {
      const current = parseFloat(currentElement.textContent.match(/[\d.]+/)[0]);
      const max = parseFloat(maxElement.textContent.match(/[\d.]+/)[0]);
      const min = parseFloat(minElement.textContent.match(/[\d.]+/)[0]);

      if (!isNaN(current) && !isNaN(max) && !isNaN(min) && max > min) {
        const progress = ((current - min) / (max - min)) * 100;

        progressElement.style.width = `${progress}%`;
        progressValueLeft.textContent = `${progress.toFixed(1)}%`;

        if (progress < 40 || progress > 99) {
          progressValueRight.textContent = ""; 
        }else {
          const complementaryProgress = 100 - progress;
          progressValueRight.textContent = `${complementaryProgress.toFixed(1)}%`;
        }

      } else {
        console.error('Valorile nu sunt valide:', { current, max, min });
      }
    } else {
      console.error('Elemente lipsă în grupul curent:', group);
    }
  });
});
