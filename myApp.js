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

// console.log(process.env.MESSAGE_STYLE);
// app.get("/json", (req, res) => {
// 	req.message = "Hello json";
//   if ((process.env.MESSAGE_STYLE === "uppercase")) {
// 	console.log(res.json({message: req.message.toUpperCase()}));
//   } else {
// 	console.log(res.json({message: req.message}));
//   }
//   res.sendFile(__dir + "your-app-url/json");
// });

module.exports = app;
