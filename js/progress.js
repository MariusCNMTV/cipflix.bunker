document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const progressElement = bar.querySelector('.progress');
      const leftValueElement = bar.querySelector('.progress-value-left');
      const rightValueElement = bar.querySelector('.progress-value-right');
  
      // Ensure elements exist
      if (progressElement && leftValueElement && rightValueElement) {
        // Get the left progress percentage from the text content
        const leftValue = parseFloat(leftValueElement.textContent.replace('%', ''));
  
        // Validate the leftValue
        if (!isNaN(leftValue) && leftValue >= 0 && leftValue <= 100) {
          // Calculate the complementary percentage for the right value
          const rightValue = 100 - leftValue;
  
          // Hide right value if left value is under 40%
          if (leftValue < 40) {
            rightValueElement.textContent = ""; // Clear text content
          } else {
            rightValueElement.textContent = `${rightValue.toFixed(1)}%`;
          }
  
          // Set the progress width dynamically
          progressElement.style.width = `${leftValue}%`;
  
          // Log values to verify
          console.log('Left Value:', leftValue);
          console.log('Calculated Right Value:', rightValue);
        } else {
          console.error('Invalid leftValue:', leftValue);
        }
      } else {
        console.error('Missing required elements in progress-bar:', bar);
      }
    });
  });
  