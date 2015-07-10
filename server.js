var http = require('http');
var request = require('request');
var nodeStatic = require('node-static');
var PORT = 8080;
var SMHI_URL = 'http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/1/geopoint';
var file = new nodeStatic.Server('./public', { cache: 3600 });

var requestListener = function (req, res) {
    console.log(req.url);
    if (req.url.indexOf('lat/')==-1) {
        file.serve(req, res);
    }
    request(SMHI_URL+req.url, function (error, response, body) {
        if (!error) {
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json' });
            if (response.statusCode == 200) {
                res.end(body);
            } else {
                res.end('{error:' + response.statusCode + '}');
            }
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end('{error:' + error + '}');
        }
    })
};

var server = http.createServer(requestListener);
server.listen(PORT);
console.log('listening on port ' + PORT);


