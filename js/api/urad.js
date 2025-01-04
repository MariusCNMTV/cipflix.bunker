fetch('http://data.uradmonitor.com/api/v1/devices', {
  method: 'GET',
  headers: {
    'X-User-id': '10519',
    'X-User-hash': 'd6f8c2e695799fbe9605e6f65dd854b0'
  }
})
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const deviceInside = data.find(device => device.id === "82000470"); // Inside (CO2)
    const deviceOutside = data.find(device => device.id === "1100016F"); // Outside (Temperature)

    if (deviceInside) {
      // CO2
      const avgCO2Inside = deviceInside.avg_co2;
      document.querySelector('.ccontainer .number').textContent = `${avgCO2Inside}`;

      // Temperature (inside)
      const avgTemperatureInside = parseFloat(deviceInside.avg_temperature).toFixed(1);
      document.querySelector('.circle-container-right span[style*="--angle: -26deg;"]').textContent = `${avgTemperatureInside} 'C`;

      // CH2O
      document.querySelector('.rrectangles .grid-info-group:nth-of-type(1) .value')
        .textContent = `${deviceInside.avg_ch2o} ppm`;

      // Noise
      document.querySelector('.rrectangles .grid-info-group:nth-of-type(2) .value')
        .textContent = `${deviceInside.avg_noise} db`;

      // Humidity
      document.querySelector('.rrectangles .grid-info-group:nth-of-type(3) .value')
        .textContent = `${deviceInside.avg_humidity}%`;

      // Pressure
      document.querySelector('.rrectangles .grid-info-group:nth-of-type(4) .value')
        .textContent = `${(deviceInside.avg_pressure / 100).toFixed(2)} hPa`;

      // VOC
      document.querySelector('.lrectangles .grid-info-group:nth-of-type(1) .value')
        .textContent = `${deviceInside.avg_voc}`;

      // PM10
      document.querySelector('.lrectangles .grid-info-group:nth-of-type(2) .value')
        .textContent = `${deviceInside.avg_pm10} µg/m³`;

      // PM2.5
      document.querySelector('.lrectangles .grid-info-group:nth-of-type(3) .value')
        .textContent = `${deviceInside.avg_pm25} µg/m³`;

      // PM1
      document.querySelector('.lrectangles .grid-info-group:nth-of-type(4) .value')
        .textContent = `${deviceInside.avg_pm1} µg/m³`;
    }

    if (deviceOutside) {
      // Temperature (outside)
      const avgTemperatureOutside = parseFloat(deviceOutside.avg_temperature).toFixed(1);
      document.querySelector('.circle-container-left span[style*="--angle: 16deg;"]').textContent = `${avgTemperatureOutside} 'C`;

      // Radiation
      const avgRadiation = (deviceOutside.avg_cpm * deviceOutside.factor).toFixed(2);
      document.querySelector('.bottom-banner .rad-info h1').textContent = avgRadiation;
    }
  })
  .catch(error => console.error('Error fetching data:', error));
