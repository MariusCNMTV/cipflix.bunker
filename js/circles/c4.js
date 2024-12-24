document.addEventListener("DOMContentLoaded", () => {
    const width = 1000; // Canvas width
    const height = 1000; // Canvas height
    const outerRadius = 280; // Outer radius of the circle
    const innerRadius = outerRadius - 3; // Inner radius of the circle
    const segmentColor = "rgb(104, 255, 240)"; // Color for the segments

    // Define the SVG canvas
    const svg = d3
        .select("#c4")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Define the shape: main circle with two indented segments

    // Main circle
    svg
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", outerRadius)
        .attr("fill", "none")
        .attr("stroke", segmentColor)
        .attr("stroke-width", 3);

    // Define the arc for the indentations
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(-Math.PI / 6) // Adjust start angle of indentation
        .endAngle(Math.PI / 6); // Adjust end angle of indentation

    // Add left indentation
    svg
        .append("path")
        .attr("d", arc)
        .attr("fill", segmentColor)
        .attr("transform", `rotate(-90)`);

    // Add right indentation
    svg
        .append("path")
        .attr("d", arc)
        .attr("fill", segmentColor)
        .attr("transform", `rotate(90)`);
});
