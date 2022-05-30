const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

  const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }
// Whatever


  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    readWrite('index.html', 'text/html')
    
  }
  else if (page == '/otherpage') {
    readWrite('otherpage.html', 'text/html')
    
  }
  else if (page == '/otherotherpage') {
    readWrite('otherotherpage.html', 'text/html')
    
  }

  //this connects to our fetch in main.js, thus the below is the coin flip object that is returned to main.js, and from there is put into the #flipResponse in our index.html DOM
  
  else if (page == '/api') {
 
    let flipResult = Math.random() <= .5 ? 'Heads' : 'Tails' 

      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        flip: flipResult
      }
      res.end(JSON.stringify(objToJson));
    
    }else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    readWrite('js/main.js', 'text/javascript')
    
  }else{
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
});

server.listen(8000);
