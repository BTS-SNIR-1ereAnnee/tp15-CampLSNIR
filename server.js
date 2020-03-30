
const express = require('express')
const app = express()
const fs = require("fs")
const path = require("path");



app.get('/', function (req, res) {
	res.type('text/html; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/template.html') )

})

app.get('/style.css', function (req, res) {
	res.type('text/css; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/style.css') )
})

app.get('/images/*', function (req, res) {

	let file = req.url.replace('/images/', '')

	res.type('text/css; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/images/' + file) )
  	
})

app.get('*', function (req, res) {
	res.redirect('/')
})


app.listen(3333)