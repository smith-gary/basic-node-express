const dotenv = require('dotenv');
dotenv.config();
var express = require("express");
var app = express();

console.log("Hello World");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
})

app.get('/now', (req, res, next) => {
	req.time = new Date().toString();
	next();
}, (req, res) => {
	console.log(res.json({time: req.time}));
	
})

app.get('/:word/echo', (req, res, next) => {
	word = req.params.word
	next();
},(req, res) => {
	console.log(res.json({echo: word}));
});

// console.log(process.env.MESSAGE_STYLE);
// app.get("/json", (req, res) => {
// 	let response =  "Hello json";
// 	res.json({message: response});
//   if (process.env.MESSAGE_STYLE === 'uppercase') {
// 	 response = response.toUpperCase();
//   } 
  
//   res.sendFile(__dir + "http://localhost:3000");
  
// });

module.exports = app;
