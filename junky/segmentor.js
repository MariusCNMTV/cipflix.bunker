Segmentor = (function (window, document) {
  // @constructor
  function segmentor(svgId, settings) {
    this.svg =
      typeof svgId == "string" ? document.getElementById(svgId) : svgId;
    this.totalSegments = settings.totalSegments || 10;
    this.filledSegments = settings.filledSegments || 0;
    this.offset = settings.offset || 0;
    this.draw();
  }

  // Public Methods

  /**
   * Specify the cartesian coordinates so we can use the elliptical arc command
   * @param {Number} centerX X Polar coordinate
   * @param {Number} centerY Y Polar coordinate
   * @param {Number} radius Radius of the circle
   * @param {Number} angleInDegrees Angle from 0 to 360
   */
  segmentor.polarToCartesian = function (
    centerX,
    centerY,
    radius,
    angleInDegrees
  ) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  /**
   * Creates the value of the d attribute of an svg path to draw the segment
   * @param {Number} x X coordinate of the center of the circle
   * @param {Number} y Y coordinate of the center of the circle
   * @param {Number} startAngle In degrees from 0 to 360, starting point of the arc
   * @param {Number} endAngle In degrees from 0 to 360, end point of the arc
   */
  segmentor.describeArc = function (x, y, radius, startAngle, endAngle) {
    var start = segmentor.polarToCartesian(x, y, radius, endAngle),
      end = segmentor.polarToCartesian(x, y, radius, startAngle),
      arcSweep = endAngle - startAngle <= 180 ? "0" : "1",
      d = [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        arcSweep,
        0,
        end.x,
        end.y,
      ].join(" ");
    return d;
  };

  // Private Methods

  /**
   * Draws the segment
   */
  segmentor.prototype.draw = function () {
    var len =
        this.offset === 0
          ? 360 / this.totalSegments
          : (360 - this.offset * this.totalSegments) / this.totalSegments,
      prevStartAngle = 0,
      prevEndAngle = 0,
      segment = "",
      i;
    if (this.offset === 0 && this.totalSegments === 1) {
      segment = '<circle cx="160" cy="160" r="130"';
      segment += this.filledSegments === 1 ? ' class="filled"/>' : " />";
    } else {
      for (i = 1; i <= this.totalSegments; i++) {
        prevStartAngle = prevEndAngle + this.offset;
        prevEndAngle = len * i + this.offset * i;
        segment += "<path ";
        segment += this.filledSegments >= i ? 'class="filled" ' : "";
        segment += 'd="';
        segment += segmentor.describeArc(
          160,
          160,
          130,
          prevStartAngle,
          prevEndAngle
        );
        segment += '"/>';
      }
    }

    this.svg.innerHTML = segment;
  };

  /**
   * Updates the number of filled vs unfilled segments
   * @param {Number} totalSegments Total number of segments
   * @param {Number} filledSegments Number of filled segments
   * @param {Number} offset Segment padding
   */
  segmentor.prototype.update = function (
    totalSegments,
    filledSegments,
    offset
  ) {
    this.totalSegments = totalSegments;
    this.filledSegments = filledSegments;
    this.offset = offset;
    this.draw();
  };

  return segmentor;
})(window, document);

(function (window, document) {
  var update, inputFilled, inputTotal, inputOffset, circle1;

  function init() {
    inputFilled = document.getElementById("inFill");
    inputTotal = document.getElementById("inTotal");
    inputOffset = document.getElementById("inOffset");

    // Instantiate a segmented circle
    circle1 = new Segmentor("circle", {
      totalSegments: parseInt(inputTotal.value, 10),
      filledSegments: parseInt(inputFilled.value, 10),
      offset: 1,
    });

    window.removeEventListener("load", init);
    inputFilled.addEventListener("input", update, false);
    inputTotal.addEventListener("input", update, false);
    inputOffset.addEventListener("input", update, false);
  }

  update = function () {
    var total = parseInt(inputTotal.value, 10),
      filled = parseInt(inputFilled.value, 10),
      offset = parseInt(inputOffset.value, 10);

    inputFilled.max = total;

    if (filled > total) {
      inputFilled.value = total;
      filled = total;
    }

    circle1.update(total, filled, offset);
  };

  window.addEventListener("load", init, false);
})(window, document);
