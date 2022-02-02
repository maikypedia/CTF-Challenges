var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require('body-parser')
var params = require("./params/params");
const password = require("password");

var setUpPassword = require("./setuppassword");
// var routes = require("./routes")

var app = express();
mongoose.connect(params.DATABASECONNECTION ,{useUnifiedTopology:true, useNewUrlParser:true}); // useCreateIndex:true});
setUpPassword();

app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"somerandomshit",
    resale:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use(routes);

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"))


app.listen(app.get("port"), function(){
    console.log("[+] Server started on port " + app.get("port")); 
});