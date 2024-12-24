document.addEventListener("DOMContentLoaded", () => {
    const width = 1000; // Canvas width
    const height = 1000; // Canvas height
    const innerOuterRadius = 280; // Outer radius of the inner segments
    const innerInnerRadius = innerOuterRadius - 3; // Inner radius of the inner segments
    const outerOuterRadius = 295; // Outer radius of the larger segments
    const outerInnerRadius = outerOuterRadius - 3; // Inner radius of the larger segments
    const segmentColor = "rgb(104, 255, 240)"; // Color for the segments
    const gapAngle = 0.05; // Gap between segments (in radians)

    // Segment sizes (in degrees)
    const innerSegmentSizes = [133, 133]; // Inner segments
    const outerSegmentSizes = [40, 40]; // Outer segments to fill gaps

    // Convert degrees to radians
    const innerSegmentSizesRadians = innerSegmentSizes.map((deg) => (deg * Math.PI) / 180);
    const outerSegmentSizesRadians = outerSegmentSizes.map((deg) => (deg * Math.PI) / 180);

    // Create the SVG canvas
    const svg = d3
        .select("#c4")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Draw inner segments (large, positioned symmetrically)
    let currentAngle = 0; // Start at angle 0
    innerSegmentSizesRadians.forEach((segmentAngle, index) => {
        const startAngle = index === 0 ? currentAngle : currentAngle + Math.PI; // Opposite sides
        const endAngle = startAngle + segmentAngle;

        const arc = d3
            .arc()
            .innerRadius(innerInnerRadius)
            .outerRadius(innerOuterRadius)
            .startAngle(startAngle)
            .endAngle(endAngle);

        svg.append("path")
            .attr("d", arc)
            .attr("fill", segmentColor);

        // No increment for symmetric placement
    });

    // Draw outer segments to fill spaces between inner segments
    outerSegmentSizesRadians.forEach((segmentAngle, index) => {
        const startAngle = index === 0
            ? innerSegmentSizesRadians[0] + gapAngle
            : innerSegmentSizesRadians[0] + Math.PI + gapAngle;
        const endAngle = startAngle + segmentAngle;

        const arc = d3
            .arc()
            .innerRadius(outerInnerRadius)
            .outerRadius(outerOuterRadius)
            .startAngle(startAngle)
            .endAngle(endAngle);

        svg.append("path")
            .attr("d", arc)
            .attr("fill", segmentColor);
    });
});
