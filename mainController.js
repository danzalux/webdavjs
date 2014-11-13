// var http  = require('http');
var url   = require('url');
var fs	  = require('fs');

var getRes = function(req, res) {

    var urlParsed = url.parse(req.url);

    res.writeHead(207, {'Content-Type': 'text/plain'});

    //ToDo: correct XML for output
    res.write(
        fs.readFileSync("example.xml")
    );


    console.log('=== headers beg ===');
    console.log(req.headers);
    // console.log('=== headers end ===');

    // console.log(urlParsed.path);

    return res;
};


exports.getRes = getRes; //return WebDav result

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
