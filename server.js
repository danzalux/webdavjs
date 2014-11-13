// Config
var conf = {
	port:	9000,
	trace:	true
};

// --------------------------------
var http  = require('http');
var url   = require('url');
var main  = require('./mainController');

main.configure(conf);

http.createServer(function(req, res) {
	log('');	// new line
	log(req.method + ' ' + req.url);
	log('=== headers beg ===');
	log(req.headers);
	// log('=== headers end ===');

	// Dummy response
	var response = {
		status:		500,	// 500 - Server error
		headers:	{},
		body:		''
	};

	// Routes
	switch(req.url){
		case '/favicon.ico':
			// favicon yet not present. 
			// Also, let Chrome, not more ask about it after "404"
			response.status = 404;
			response.headers = {'Content-Type': 'text/plain'};
			//console.log(req.method, req.url);
			break;

		default:
			// requested some other as favicon, then proceed request

			// mainController
			response = main.getRes(req);
			break;
	}

	// Output
	res.writeHead(response.status, response.headers);
	res.end(response.body);

}).listen(conf.port);
console.log('Server running at port: ' + conf.port);



// Logger
function log(text){
	if(conf.trace){
		console.log(text);
	}
}


// ----