var express = require('express');
var app = express(),
	port = 3000,
	netOutputFolder = '/public';
app.use('/', express.static(__dirname + netOutputFolder)); 
app.listen(port, function() { console.log('App is running through - ', port); });