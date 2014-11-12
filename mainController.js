// var http  = require('http');
var url   = require('url');
var fs	  = require('fs');

var getRes = function(req, res) {

    var urlParsed = url.parse(req.url);

    res.writeHead(207, {'Content-Type': 'text/plain'});

    //ToDo: correct XML for output
    res.write('<?xml version="1.0" ?><D:multistatus xmlns:D="DAV:"><D:response><D:href>http://www.contoso.com/public/container/</D:href><D:propstat><D:prop xmlns:R="http://www.contoso.com/schema/"><R:author>Rob Caron</R:author><R:editor>Jessup Meng</R:editor><D:creationdate>1999-11-01T17:42:21-06:30</D:creationdate><D:displayname>Example Collection</D:displayname><D:resourcetype><D:collection></D:resourcetype><D:supportedlock><D:lockentry><D:lockscope><D:shared/></D:lockscope><D:locktype><D:write/></D:locktype></D:lockentry></D:supportedlock></D:prop><D:status>HTTP/1.1 200 OK</D:status></D:propstat></D:response></D:multistatus>'

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
