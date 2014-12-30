// var http  = require('http');
var url   = require('url');
//var fs	  = require('fs');


// Empty res
var res = {
	status:		500,	// 500 - Server error
	headers:	{},
	body:		'500 - Server error'
};

var conf = {};

var setConf = function(new_conf){
	conf = new_conf;
};


var trStat = 'mainController.js:';

var getRes = function(req, conf) {
	//var urlParsed = url.parse(req.url);
	//log(--- urlParsed.path);

	res.status = 207;
	res.headers = {
		'Vary': 'Brief,Prefer',
		'DAV': '1, 3, extended-mkcol, 2',
		'Keep-Alive': 'timeout=2, max=99',
		'Connection': 'Keep-Alive',
		'Transfer-Encoding': 'chunked',
		'Content-Type': 'application/xml; charset=utf-8'
	};

	var depth = req.headers['depth'];
	log('--- req.depth = ' + depth);

	switch (req.method) { // determine Method
		case 'PROPFIND':
			switch (depth) {
				case '0':
					res.body = getDepth_0();
					break;

				case '1':
					res.body = getDepth_1();
					break;

			default: // More depth? Really?
				break;
			} // getDepth
			break;

		case 'OPTIONS':
			setOptions();
			break;

		default:
			// Other Methods
			res.status	= 403;
			res.body	= req.method + ' - 403 Method not supported';
			log('--- '+ req.method + ' - 403 Method not supported');
			break;
	}

	function setOptions () {
		res.status = 200;
		res.headers = {
			'Allow' : 'OPTIONS, GET, HEAD, DELETE, PROPFIND, PUT, PROPPATCH, COPY, MOVE, REPORT, LOCK, UNLOCK',
			'DAV' 	: '1, 3, extended-mkcol, 2',
			'MS-Author-Via' : 'DAV',
			'Accept-Ranges' : 'bytes',
			'Content-Length': 0,
			'Keep-Alive' : 'timeout=2, max=100',
			'Connection' : 'Keep-Alive',
			'Content-Type': 'text/html'
		};
		res.body = '';
	}

	function getDepth_0 () {
		//ToDo: correct XML for output
		var outString = [
			'<?xml version="1.0" encoding="utf-8"?>' ,
			'<d:multistatus xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns">' ,
			'<d:res>' ,
				'<d:href>/</d:href>' ,
				'<d:propstat>' ,
					'<d:prop>' ,
						'<d:getlastmodified>Thu, 11 Dec 2014 02:13:13 GMT</d:getlastmodified>' ,
						'<d:resourcetype>' ,
							'<d:collection/>' ,
						'</d:resourcetype>' ,
						'<d:quota-used-bytes>1679114919936</d:quota-used-bytes>' ,
						'<d:quota-available-bytes>288820920320</d:quota-available-bytes>' ,
					'</d:prop>' ,
					'<d:status>HTTP/1.1 200 OK</d:status>' ,
				'</d:propstat>' ,
			'</d:res>' ,
			'</d:multistatus>'
		].join('');
		return outString;
	} // getDepth_0 ()

	function getDepth_1 () {
		var outString = [
			'<?xml version="1.0" encoding="utf-8"?>' ,
			'<d:multistatus xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns">' ,
			'<d:res>' ,
				'<d:href>/</d:href>' ,
				'<d:propstat>' ,
					'<d:prop>' ,
						'<d:getlastmodified>Thu, 11 Dec 2014 02:13:13 GMT</d:getlastmodified>' ,
						'<d:resourcetype><d:collection/></d:resourcetype>' ,
						'<d:quota-used-bytes>1679115022336</d:quota-used-bytes>' ,
						'<d:quota-available-bytes>288820817920</d:quota-available-bytes>' ,
					'</d:prop>' ,
					'<d:status>HTTP/1.1 200 OK</d:status>' ,
				'</d:propstat>' ,
			'</d:res>' ,
			'<d:res>' ,
				'<d:href>/tst2/</d:href>' ,
				'<d:propstat>' ,
					'<d:prop>' ,
						'<d:getlastmodified>Thu, 11 Dec 2014 02:13:13 GMT</d:getlastmodified>' ,
						'<d:resourcetype><d:collection/></d:resourcetype>' ,
						'<d:quota-used-bytes>1679115022336</d:quota-used-bytes>' ,
						'<d:quota-available-bytes>288820817920</d:quota-available-bytes>' ,
					'</d:prop>' ,
					'<d:status>HTTP/1.1 200 OK</d:status>' ,
				'</d:propstat>' ,
			'</d:res>' ,
			'<d:res>' ,
				'<d:href>/tstfolder/</d:href>' ,
				'<d:propstat>' ,
					'<d:prop>' ,
						'<d:getlastmodified>Thu, 11 Dec 2014 02:08:33 GMT</d:getlastmodified>' ,
						'<d:resourcetype><d:collection/></d:resourcetype>' ,
						'<d:quota-used-bytes>1679115022336</d:quota-used-bytes>' ,
						'<d:quota-available-bytes>288820817920</d:quota-available-bytes>' ,
					'</d:prop>' ,
					'<d:status>HTTP/1.1 200 OK</d:status>' ,
				'</d:propstat>' ,
			'</d:res>' ,
			'</d:multistatus>'
		].join('');
		return outString;
	} // getDepth_1 ()

	return res;
};// getRes


// Logger
function log(text){
	if(conf.trace){
		if(conf.traceStatus != trStat){
			conf.traceStatus = trStat; // set actual state
			console.log('=====> ' + conf.traceStatus + ' <=====');
		};
		console.log(text);
	}
}

/*
exports = {
	configure:	setConf,
	getRes: 	
};
*/
exports.configure = setConf;
exports.getRes = getRes;	//return WebDav result


/*
OPTIONS /
=== headers beg ===
{ connection: 'Keep-Alive',
	'user-agent': 'Microsoft-WebDAV-MiniRedir/6.1.7601',
	translate: 'f',
	host: 'localhost:9000' }
PROPFIND /
=== headers beg ===
{ connection: 'Keep-Alive',
	'user-agent': 'Microsoft-WebDAV-MiniRedir/6.1.7601',
	depth: '0',
	translate: 'f',
	'content-length': '0',
	host: 'localhost:9000' }
PROPFIND /
=== headers beg ===
{ connection: 'Keep-Alive',
	'user-agent': 'Microsoft-WebDAV-MiniRedir/6.1.7601',
	depth: '0',
	translate: 'f',
	'content-length': '0',
	host: 'localhost:9000' }
*/