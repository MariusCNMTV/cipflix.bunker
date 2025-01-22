// https://data.uradmonitor.com/api/v1/devices
//'X-User-id': '10519',
//'X-User-hash': 'd6f8c2e695799fbe9605e6f65dd854b0',

function formatValue(value) {
  return value > 1000 ? `${(value / 1000).toFixed(1)}k` : value;
}

function fetchAndUpdateData() {
  fetch('https://api.jsonbin.io/v3/b/678f5e33ad19ca34f8f1df74', {
    method: 'GET',
    headers: {
      'X-Master-Key': '$2a$10$Ugjkey.zuf8Y7c1BvbVid..xHJF8lYorHUBp2jwvxEWBIuBjyw.m2'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      data = data.record;

      const deviceInside = data.find(device => device.id === "82000470"); // Inside (CO2)
      const deviceOutside = data.find(device => device.id === "1100016F"); // Outside (Temperature)

      if (deviceInside) {
        const lastCO2Inside = deviceInside.last_co2 || 0;
        if (lastCO2Inside > 999 && !startMorphing) {
          addOrangeBackgroundToContainer();
        } else if (lastCO2Inside <= 999 && startMorphing) {
          addBlueBackgroundToContainer();
        }
        const lastTemperatureInside = formatValue(parseFloat(deviceInside.last_temperature).toFixed(1));
        const lastCH2O = formatValue(deviceInside.last_ch2o) ;
        const lastNoise = Math.round(deviceInside.last_noise);
        const lastHumidity = formatValue(parseFloat(deviceInside.last_humidity).toFixed(1));
        const lastPressure = formatValue((deviceInside.last_pressure / 100).toFixed(2));
        const lastVOC = formatValue(deviceInside.last_voc);
        const lastPM10 = formatValue(deviceInside.last_pm10);
        const lastPM25 = formatValue(deviceInside.last_pm25);
        const lastPM1 = formatValue(deviceInside.last_pm1);

        document.querySelector('.ccontainer .number').textContent = lastCO2Inside;
        document.querySelector('.circle-container-right span[style*="--angle: -26deg;"]').textContent = lastTemperatureInside + " 'C";
        document.querySelector('.rrectangles .grid-info-group:nth-of-type(1) .value').textContent = lastCH2O + " ppm";
        document.querySelector('.rrectangles .grid-info-group:nth-of-type(2) .value').textContent = lastNoise + " db";
        document.querySelector('.rrectangles .grid-info-group:nth-of-type(3) .value').textContent = lastHumidity + "%";
        document.querySelector('.rrectangles .grid-info-group:nth-of-type(4) .value').textContent = lastPressure + " hPa";
        document.querySelector('.lrectangles .grid-info-group:nth-of-type(1) .value').textContent = lastVOC;
        document.querySelector('.lrectangles .grid-info-group:nth-of-type(2) .value').textContent = lastPM10 + " µg/m³";
        document.querySelector('.lrectangles .grid-info-group:nth-of-type(3) .value').textContent = lastPM25 + " µg/m³";
        document.querySelector('.lrectangles .grid-info-group:nth-of-type(4) .value').textContent = lastPM1 + " µg/m³";
      }

      if (deviceOutside) {
        const lastTemperatureOutside = formatValue(parseFloat(deviceOutside.last_temperature).toFixed(1));
        const lastRadiation = formatValue((deviceOutside.last_cpm * deviceOutside.factor).toFixed(2));

        document.querySelector('.circle-container-left span[style*="--angle: 16deg;"]').textContent = lastTemperatureOutside + " 'C";
        document.querySelector('.bottom-banner .rad-info h1').textContent = lastRadiation;
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

setInterval(fetchAndUpdateData, 5000);

fetchAndUpdateData();
