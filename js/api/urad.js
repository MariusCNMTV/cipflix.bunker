fetch('http://data.uradmonitor.com/api/v1/devices', {
  method: 'GET',
  headers: {
      'X-User-id': '10519',
      'X-User-hash': 'd6f8c2e695799fbe9605e6f65dd854b0'
  }
})
.then(response => {
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json(); // Or response.text() depending on the API response format
})
.then(data => {
  console.log(data); // Process the response data here
})
.catch(error => {
  console.error('Error:', error);
});
