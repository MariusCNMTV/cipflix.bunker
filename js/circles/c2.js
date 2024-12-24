document.addEventListener("DOMContentLoaded", () => {
    const width = 1000; // Canvas width
    const height = 1000; // Canvas height
    const outerRadius = 140; // Outer radius of the circle
    const innerRadius = outerRadius - 16; // Inner radius of the circle
    const numSegments = 24; // Number of segments
    const segmentAngle = (2 * Math.PI) / numSegments; // Angle for each segment
    const gapAngle = 0.1; // Gap between segments
    const tiltAngle = 0.14; // Tilt angle for the parallelogram effect
    const segmentColor = "rgb(104, 255, 240)"; // Cyan color for segments

    const glowStrength = 1.2; // Glow strength (range: 0.1 to 2.0, higher is stronger)

    // Append SVG for Circle 2
    const svg = d3
      .select("#c2")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Add a glow filter
    const defs = svg.append("defs");
    const filter = defs
      .append("filter")
      .attr("id", "glow")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("x", -outerRadius * 2)
      .attr("y", -outerRadius * 2)
      .attr("width", outerRadius * 4)
      .attr("height", outerRadius * 4);

    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", glowStrength * 3) // Glow spread, scaled by strength
      .attr("result", "coloredBlur");

    filter
      .append("feFlood")
      .attr("flood-color", "rgb(104, 255, 240)") // Glow color
      .attr("flood-opacity", glowStrength * 0.6) // Glow opacity, scaled by strength
      .attr("result", "glowColor");

    filter
      .append("feComposite")
      .attr("in", "glowColor")
      .attr("in2", "coloredBlur")
      .attr("operator", "in")
      .attr("result", "glow");

    filter
      .append("feMerge")
      .selectAll("feMergeNode")
      .data(["glow", "SourceGraphic"]) // Merge glow and original graphic
      .enter()
      .append("feMergeNode")
      .attr("in", (d) => d);

    // Create tilted parallelogram segments
    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * segmentAngle + gapAngle / 2;
      const endAngle = (i + 1) * segmentAngle - gapAngle / 2;

      // Calculate points for the parallelogram
      const x1 = Math.cos(startAngle) * innerRadius;
      const y1 = Math.sin(startAngle) * innerRadius;
      const x2 = Math.cos(startAngle + tiltAngle) * outerRadius;
      const y2 = Math.sin(startAngle + tiltAngle) * outerRadius;
      const x3 = Math.cos(endAngle + tiltAngle) * outerRadius;
      const y3 = Math.sin(endAngle + tiltAngle) * outerRadius;
      const x4 = Math.cos(endAngle) * innerRadius;
      const y4 = Math.sin(endAngle) * innerRadius;

      // Create a polygon for the parallelogram
      svg
        .append("polygon")
        .attr("points", `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`)
        .attr("fill", segmentColor)
        .attr("filter", "url(#glow)"); // Apply the glow filter
    }
  });