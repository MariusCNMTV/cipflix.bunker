// https://run.mocky.io/v3/c708d69f-2533-49d5-af75-77731a8899c5

fetch('https://my-json-server.typicode.com/SuperMarius409/restapi/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
