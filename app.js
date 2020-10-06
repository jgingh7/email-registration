var express = require('express')
var mysql = require('mysql')
var app = express()
var bodyParser = require("body-parser")

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	database : 'joinUs'
})


app.get("/", function(req, res){
	let q = "SELECT COUNT(*) AS user_count FROM users"
	
	connection.query(q, function(err, results) { 
		if (err) throw err
		let count = results[0].user_count
		res.render("home", {data: count})
	})	
})


app.get("/joke", function(req, res) {
		let joke = "What do you call a dog that does magic tricks? A labracadabrador."
		res.send(joke)
		})

app.get("/random_num", function(req, res) {
	let num = Math.floor(Math.random() * 10) + 1
	res.send("Your lucky number is " + num)
})


app.post("/register", function(req, res) {
	var person = {email: req.body.email}
	var q = 'INSERT INTO users SET ?'
	
	connection.query(q, person, function(err, results) {
		if (err) throw err
		res.redirect("/")
	})
})


app.listen(8080, function () {
  console.log('App listening on port 8080!')
})