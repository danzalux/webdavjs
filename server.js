var http  = require('http');
var url   = require('url');
var main  = require('./mainController');

http.createServer(function (req, res) {

  if('/favicon.ico' == req.url){ 
  // favicon yet not present. 
  // Also, let Chrome, not more ask about it after "404"

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end( );
    //console.log(req.method, req.url);

  } else { 
  //requested some other as favicon, then proceed request
    console.log(req.method, req.url);

    res = main.getRes(req, res); //mainController

    res.end();
}

}).listen(9000);
console.log('Server running at port:9000/');

