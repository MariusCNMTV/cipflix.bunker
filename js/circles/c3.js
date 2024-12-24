document.addEventListener("DOMContentLoaded", () => {
    const width = 1000; // Canvas width
    const height = 1000; // Canvas height
    const outerRadius = 335; // Outer radius of the circle
    const innerRadius = outerRadius - 3; // Inner radius of the circle
    const segmentColor = "rgb(104, 255, 240)"; // Color for the segments
    const capLength = 20; // Length of the cap lines
    const capOffset = 10; // Offset to bring caps closer to the center
    const capColor = "rgb(104, 255, 240)"; // Color for the caps
    const gapAngle = 0.17; // Gap between segments (in radians)
  
    // Segment sizes in degrees (modifiable)
    const segmentSizes = [
      130, // Large segment (degrees)
      100, // Large segment (degrees)
      30,  // Small segment (degrees)
      30,  // Small segment (degrees)
      30,  // Small segment (degrees)
      30,  // Small segment (degrees),
    ];
  
    // Convert degrees to radians for calculations
    const segmentSizesRadians = segmentSizes.map((deg) => (deg * Math.PI) / 180);
  
    // Create the SVG canvas
    const svg = d3
      .select("#c3")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    // Draw each segment
    let currentAngle = 0; // Start angle
    segmentSizesRadians.forEach((segmentAngle, index) => {
      const startAngle = currentAngle + gapAngle / 2;
      const endAngle = startAngle + segmentAngle - gapAngle;
  
      // Arc generator for the segment
      const arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);
  
      // Append the arc to the SVG
      svg
        .append("path")
        .attr("d", arc)
        .attr("fill", segmentColor);
  
      // Add caps to the ends of the 100-degree segment
      if (index === 1) { // Second segment (100 degrees)
        // Start cap
        const startCapX1 = (outerRadius - capOffset) * Math.cos(startAngle);
        const startCapY1 = (outerRadius - capOffset) * Math.sin(startAngle);
        const startCapX2 = (outerRadius + capLength - capOffset) * Math.cos(startAngle);
        const startCapY2 = (outerRadius + capLength - capOffset) * Math.sin(startAngle);
  
        svg
          .append("line")
          .attr("x1", startCapX1)
          .attr("y1", startCapY1)
          .attr("x2", startCapX2)
          .attr("y2", startCapY2)
          .attr("stroke", capColor)
          .attr("stroke-width", 3);
  
        // End cap
        const endCapX1 = (outerRadius - capOffset) * Math.cos(endAngle);
        const endCapY1 = (outerRadius - capOffset) * Math.sin(endAngle);
        const endCapX2 = (outerRadius + capLength - capOffset) * Math.cos(endAngle);
        const endCapY2 = (outerRadius + capLength - capOffset) * Math.sin(endAngle);
  
        svg
          .append("line")
          .attr("x1", endCapX1)
          .attr("y1", endCapY1)
          .attr("x2", endCapX2)
          .attr("y2", endCapY2)
          .attr("stroke", capColor)
          .attr("stroke-width", 3);
      }
  
      // Add a cap to the end of the 130-degree segment
      if (index === 0) { // First segment (130 degrees)
        const capAngle = endAngle - Math.PI / 2; // Rotate by 90 degrees to align the cap
  
        const endCapX1 = (outerRadius - capOffset) * Math.cos(capAngle);
        const endCapY1 = (outerRadius - capOffset) * Math.sin(capAngle);
        const endCapX2 = (outerRadius + capLength - capOffset) * Math.cos(capAngle);
        const endCapY2 = (outerRadius + capLength - capOffset) * Math.sin(capAngle);
  
        svg
          .append("line")
          .attr("x1", endCapX1)
          .attr("y1", endCapY1)
          .attr("x2", endCapX2)
          .attr("y2", endCapY2)
          .attr("stroke", capColor)
          .attr("stroke-width", 3);
      }
  
      // Move to the next segment
      currentAngle = endAngle + gapAngle / 2;
    });
  });
  