document.addEventListener("DOMContentLoaded", () => {
    const width = 1000, height = 1000;
    const innerOuterRadius = 280, outerInnerRadius = 295;
    const lineLengthExtension = 2.2, lineLengthReduction = 2.2;
    const segmentColor = "#265152", lineColor = "#265152";
    const gapAngle = 0.05, inclinationAngle = 0.06;
    const startAngleOffset1 = 1.517, startAngleOffset2 = 1.567, endAngleFactor = 0.357;

    const innerSegmentSizes = [133, 133];
    const outerSegmentSizes = [41, 41];

    const innerSegmentSizesRadians = innerSegmentSizes.map(deg => (deg * Math.PI) / 180);
    const outerSegmentSizesRadians = outerSegmentSizes.map(deg => (deg * Math.PI) / 180);

    const svg = d3.select("#c4")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const polarToCartesian = (radius, angle) => ({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
    });

    innerSegmentSizesRadians.forEach((segmentAngle, index) => {
        const startAngle = index === 0 ? 0 : Math.PI;
        const endAngle = startAngle + segmentAngle;

        const arc = d3.arc()
            .innerRadius(innerOuterRadius - 3)
            .outerRadius(innerOuterRadius)
            .startAngle(startAngle)
            .endAngle(endAngle);

        svg.append("path").attr("d", arc).attr("fill", segmentColor);
    });

    outerSegmentSizesRadians.forEach((segmentAngle, index) => {
        const startAngle = index === 0
            ? innerSegmentSizesRadians[0] + gapAngle
            : innerSegmentSizesRadians[0] + Math.PI + gapAngle;
        const endAngle = startAngle + segmentAngle;

        const arc = d3.arc()
            .innerRadius(outerInnerRadius)
            .outerRadius(outerInnerRadius + 3)
            .startAngle(startAngle)
            .endAngle(endAngle);

        svg.append("path").attr("d", arc).attr("fill", segmentColor);
    });

    innerSegmentSizesRadians.forEach((segmentAngle, index) => {
        const startAngle = index === 0
            ? innerSegmentSizesRadians[0] + gapAngle + startAngleOffset1
            : innerSegmentSizesRadians[0] + Math.PI + startAngleOffset2;
        const endAngle = startAngle + segmentAngle * endAngleFactor;

        const pointsToConnect = [
            { angle: startAngle },
            { angle: endAngle },
        ];

        pointsToConnect.forEach(({ angle }, pointIndex) => {
            const innerPoint = polarToCartesian(innerOuterRadius - lineLengthReduction, angle);
            const inclinedOuterAngle = angle + (pointIndex === 0 ? inclinationAngle : -inclinationAngle);
            const extendedOuterPoint = polarToCartesian(outerInnerRadius + lineLengthExtension, inclinedOuterAngle);

            svg.append("line")
                .attr("x1", innerPoint.x)
                .attr("y1", innerPoint.y)
                .attr("x2", extendedOuterPoint.x)
                .attr("y2", extendedOuterPoint.y)
                .attr("stroke", lineColor)
                .attr("stroke-width", 3);
        });
    });
});
