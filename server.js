// Config
var conf = {
  port: 9000,
  trace:  true,
  traceStatus: ''
};

// --------------------------------
var http  = require('http');
var url   = require('url');
var main  = require('./mainController');

main.configure(conf);


var trStat = 'server.js:';

http.createServer(function(req, res) {

  console.log('');  // new line
  log('--- req.method+req.url: ' + req.method + ' ' + req.url);
  log('--- req.headers begin:');
  log(req.headers);
  //log('--- req.body begin:');
  //log(req.socket.parser);

  // Dummy res
  var resWorkObj = {
    status:   500,  // 500 - Server error
    headers:  {},
    body:   '500 - Server error'
  };

  // Routes
  switch(req.url){
    case '/favicon.ico':
      // favicon yet not present. 
      // Also, let Chrome, not more ask about it after "404"
      resWorkObj.status = 404;
      resWorkObj.headers = {'Content-Type': 'text/plain'};
      //console.log(req.method, req.url);
      break;

    default:
      // requested some other as favicon, then proceed request

      // mainController
      resWorkObj = main.getRes(req);
        //log('--- log(RESPONSE) :');
        //log(resWorkObj);

      break;
  }

  // Output
  res.writeHead(resWorkObj.status, resWorkObj.headers);
  res.end(resWorkObj.body);
  log('--- log(RES) :');
  log(res);

}).listen(conf.port);
console.log('Server running at port: ' + conf.port);



// Logger
function log(text){
  if(conf.trace){
    if(conf.traceStatus != trStat){
      conf.traceStatus = trStat;
      console.log('=====> ' + conf.traceStatus + ' <=====');
    }
    console.log(text);
  }
}


// ----