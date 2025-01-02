document.addEventListener("DOMContentLoaded", () => {
  const width = 1000; // Canvas width
  const height = 1000; // Canvas height
  const outerRadius = 276; // Outer radius of the circle
  const innerRadius = outerRadius - 6; // Inner radius of the circle
  const segmentColor = "#265152"; // Color for the segments
  const progressColor = "#46A1A3"; // Color for the progress bar
  const cornerRadius = 1; // Corner radius for rounding
  const animationDuration = 1000; // Duration of the animation in ms

  // Segment configuration (start angle, end angle in degrees, and capAt for animation direction)
  const segments = [
      { start: 71, end: 88, capAt: "end" },  // Segment 1
      { start: 92, end: 109, capAt: "start" }, // Segment 2
      { start: 251, end: 268, capAt: "end" },  // Segment 3
      { start: 272, end: 289, capAt: "start" }, // Segment 4
  ];

  // Store progress for each segment (initially 0%)
  const progressValues = [0, 0, 0, 0];

  // Convert degrees to radians for D3
  const toRadians = (deg) => (deg * Math.PI) / 180;

  // Create the SVG canvas
  const svg = d3
      .select("#c18")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Draw each segment
  segments.forEach(({ start, end }, index) => {
      const startAngle = toRadians(start);
      const endAngle = toRadians(end);

      // Arc generator for the segment
      const arc = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(startAngle)
          .endAngle(endAngle)
          .cornerRadius(cornerRadius);

      // Append the segment arc to the SVG
      svg.append("path")
          .attr("d", arc)
          .attr("fill", segmentColor)
          .attr("class", `segment-${index}`);
  });

  // Function to draw the progress bar
  const drawProgressBar = (segmentIndex, progress) => {
      const { start, end, capAt } = segments[segmentIndex];
      const totalAngle = end - start; // Total angular range of the segment
      let progressAngle;

      // Map progress to angular range based on `capAt`
      if (capAt === "start") {
          progressAngle = start + (totalAngle * progress) / 100;
      } else {
          progressAngle = end - (totalAngle * progress) / 100;
      }

      const startAngle = capAt === "start" ? toRadians(start) : toRadians(progressAngle);
      const endAngle = capAt === "start" ? toRadians(progressAngle) : toRadians(end);

      // Arc generator for the progress bar
      const progressArc = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(startAngle)
          .endAngle(endAngle)
          .cornerRadius(cornerRadius);

      // Remove any existing progress arc for this segment
      svg.selectAll(`.progress-segment-${segmentIndex}`).remove();

      // Append the progress bar arc
      svg
          .append("path")
          .attr("d", progressArc)
          .attr("class", `progress-segment-${segmentIndex}`)
          .attr("fill", progressColor);
  };

  // Function to animate the progress bar for a specific segment
  const animateProgress = (segmentIndex) => {
      // Generate a random target progress value (0–100%)
      const targetProgress = Math.random() * 100;

      // Animate the progress change
      d3.transition()
          .duration(animationDuration)
          .ease(d3.easeSinInOut)
          .tween(`progress-${segmentIndex}`, () => {
              const interpolate = d3.interpolate(
                  progressValues[segmentIndex],
                  targetProgress
              );
              return (t) => {
                  progressValues[segmentIndex] = interpolate(t);
                  drawProgressBar(segmentIndex, progressValues[segmentIndex]);
              };
          })
          .on("end", () => {
              // Continue the animation with a delay
              setTimeout(() => animateProgress(segmentIndex), Math.random() * 1000);
          });
  };

  // Start animations for all progress bars independently
  segments.forEach((_, index) => {
      animateProgress(index);
  });
});
