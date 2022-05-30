// Loading the required modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

// Creating our server
const server = http.createServer((req, res) => {

  // Function that will allow us to create pages based on the parameters we pass to them
  // This allows us to create html, css, and js files using the same function (readWrite)
  const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }

  // Variable allowing us to track changes in the URL
  const page = url.parse(req.url).pathname;

  // Switch statement that allows us to make changes to our page based on actions made by the user in the URL bar
  switch(page) {
    case '/':
      readWrite('index.html', 'text/html')
      break;
    case '/otherpage':
      readWrite('otherpage.html', 'text/html')
      break;
    case '/otherotherpage':
      readWrite('otherotherpage.html', 'text/html')
      break;
    case '/api':
      // Make the random flip and store that result inside an object that tends gets passed to our API (in main.js) using the JSON format
      let flipResult = Math.random() <= .5 ? 'Heads' : 'Tails' 
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
          flip: flipResult
      }
      res.end(JSON.stringify(objToJson))
      break;
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      })
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break;
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
   }
  }).listen(3000)