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
  else if (page == '/api') {
    // if('student' in params){
    //   let personName = "unknown"
    //   let personStatus = "unknown"
    //   let personOccupation = "unknown"
    //   if(params['student']== 'flip'){
    //     personName = "Leon"
    //     personStatus = "Boss Man"
    //     personOccupation = "Baller"

    // let flipResult = 'type flip in the input box'
    let flipResult = Math.random() <= .5 ? 'Heads' : 'Tails' 
    // if(params['student']== 'flip') {
    //   flipResult = Math.random() <= .5 ? 'heads' : 'tails' 
    //   }
    
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        name: flipResult
      }
      res.end(JSON.stringify(objToJson));

    }//student if
  //else if
  else if (page == '/css/style.css'){
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
