const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

//function to serve coin image/ static files 

// function serveStaticFile(res, path, contentType, responseCode) {
//   if(!responseCode) responseCode = 200;

//   // __dirname will resolve to the directory the executing script resides in.
//   // So if your script resides in /home/sites/app.js, __dirname will resolve
//   // to /home/sites.

//   console.log(__dirname + path);

//   fs.readFile(__dirname + path, function(err, data) {
//       if(err) {
//           res.writeHead(500, { 'Content-Type' : 'text/plain' });
//           res.end('500 - Internal Error');
//       } 
//       else {
//           res.writeHead( responseCode, { 'Content-Type' : contentType });
//           res.end(data);
//       }
//   });
// }

//end static file server

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
  //these elseifs can be removed
  else if (page == '/otherpage') {
    readWrite('otherpage.html', 'text/html')
    
  }
  else if (page == '/otherotherpage') {
    readWrite('otherotherpage.html', 'text/html')
    
  }
  // above elseifs can be removed
  //below is serving images of the coin
  else if (page == '/img/cent-head.png') {
    fs.readFile('img/cent-head.png', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  // else if (page == '/img/cent-tail.png') {
  //   fs.readFile('/img/cent-tail.png', function(err, data) {
  //     res.write(data);
  //     res.end();
  //   });
  // }


  //this connects to our fetch in main.js, thus the below is the coin flip object that is returned to main.js, and from there is put into the #flipResponse in our index.html DOM
  
  else if (page == '/api') {
    //coin toss
    // const coin = document.getElementById("coin");
    // coin.style.animation = "none";
    //coin toss
 
    let flipResult = Math.random() <= .5 ? 'Heads' : 'Tails' 

      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        flip: flipResult
      }
      //coin toss
      // if (flipResult === 'Heads') {
      //    fs.readFile('img/cent-head.png', function(err, data) {
      //       res.write(data);
      //       res.end();
      //        });
      // }
      // else if (flipResult === 'Tails') {
      //     fs.readFile('img/cent-head.png', function(err, data) {
      //     res.write(data);
      //     res.end();
      //     });
      // }
      //coin toss
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
